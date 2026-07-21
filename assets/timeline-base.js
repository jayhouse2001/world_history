    (async()=>{
    const timelineConfig=window.timelineConfig;
    const historicalData=timelineConfig.historicalDataUrl
      ? await d3.json(timelineConfig.historicalDataUrl).catch(error=>{console.warn("역사 경계 데이터를 불러오지 못해 기본 지도만 표시합니다.",error);return null})
      : null;
    const theaterDefs=timelineConfig.lanes;
    const baseEvents=timelineConfig.events;
    const storageKey=timelineConfig.storageKey;
    const emptyState = {updates:{},deleted:[],added:[]};
    function loadState(){try{return {...emptyState,...JSON.parse(localStorage.getItem(storageKey)||"{}")}}catch{return structuredClone(emptyState)}}
    let userState = loadState();
    const countries = topojson.feature(worldAtlas,worldAtlas.objects.countries).features;
    const board = document.getElementById("timeline-board");
    const laneWidth=theaterDefs.length===1?360:Math.max(1,theaterDefs.length)*288+92;
    document.documentElement.style.setProperty("--lane-count",String(theaterDefs.length));
    document.documentElement.style.setProperty("--board-min-width",`${laneWidth}px`);
    const rules = document.getElementById("time-rules");
    const timelineScroll = document.getElementById("timeline-scroll");
    const stickyTrack = document.getElementById("sticky-theater-track");
    const dialog = document.getElementById("map-dialog");
    const dialogSvg = d3.select("#dialog-map");
    dialogSvg.append("title").attr("id","dialog-map-title");
    dialogSvg.append("desc").attr("id","dialog-map-desc");
    let dialogZoomTransform=d3.zoomIdentity;
    const dialogZoom=d3.zoom().scaleExtent([.35,8]).on("zoom",event=>{dialogZoomTransform=event.transform;dialogSvg.select(".map-viewport").attr("transform",event.transform);keepMarkerSize(dialogSvg,event.transform.k)});
    dialogSvg.call(dialogZoom);

    function pointInTheater(theater,point){const [[west,south],[east,north]]=theater.bounds;const [lon,lat]=point;const inLongitude=west<=east?(lon>=west&&lon<=east):(lon>=west||lon<=east);return inLongitude&&lat>=south&&lat<=north}
    function projectionFor(theater,width,height,event=null){
      const projection=d3.geoMercator(); if(theater.rotate) projection.rotate(theater.rotate);
      const b=theater.bounds;let corners={type:"MultiPoint",coordinates:[[b[0][0],b[0][1]],[b[1][0],b[0][1]],[b[1][0],b[1][1]],[b[0][0],b[1][1]]]};const savedView=(event?.mapView||[]).map(point=>[Number(point[0]),Number(point[1])]).filter(point=>point.every(Number.isFinite));const routePoints=(event?.routes||[]).flatMap(route=>[[Number(route[1]),Number(route[2])],[Number(route[4]),Number(route[5])]]).filter(point=>point.every(Number.isFinite));
      if(savedView.length>=4){corners={type:"MultiPoint",coordinates:savedView}}else if(routePoints.length>=2&&(event?.mapDesign==="war-v1"||routePoints.some(point=>!pointInTheater(theater,point)))){let normalized=routePoints;if(theater.rotate){normalized=routePoints.map(([lon,lat])=>{let value=lon;while(value<100)value+=360;return [value,lat]})}const longitudes=normalized.map(point=>point[0]),latitudes=normalized.map(point=>point[1]),minLon=Math.min(...longitudes),maxLon=Math.max(...longitudes),minLat=Math.min(...latitudes),maxLat=Math.max(...latitudes),lonPad=Math.max(3,(maxLon-minLon)*.22),latPad=Math.max(2,(maxLat-minLat)*.3);corners={type:"MultiPoint",coordinates:[[minLon-lonPad,minLat-latPad],[maxLon+lonPad,minLat-latPad],[maxLon+lonPad,maxLat+latPad],[minLon-lonPad,maxLat+latPad]].map(([lon,lat])=>[lon>180?lon-360:lon,lat])}}
      const padding=Math.max(8,Math.min(width,height)*.08);return projection.fitExtent([[padding,padding],[width-padding,height-padding]],corners);
    }
    function routeFeature(route){return {type:"LineString",coordinates:[[route[1],route[2]],[route[4],route[5]]]}}
    function routeSide(route){return ["allied","axis","soviet","finnish"].includes(route[6])?route[6]:"neutral"}
    function drawHistoricalPartitions(viewport,path,projection,event,width,height,labelRequests){
      if(!historicalData||!event.historicalPartitions?.length)return;
      const layer=viewport.append("g").attr("class","historical-control-layer");
      event.historicalPartitions.forEach((partition,index)=>{
        const feature=historicalData.features?.find(item=>item.properties?.NAME===partition.featureName);if(!feature)return;
        const divider=(partition.divider||[]).map(projection).filter(Boolean);if(divider.length<2)return;
        const defs=viewport.append("defs"),westId=`historical-west-${event.id}-${index}`,eastId=`historical-east-${event.id}-${index}`;
        const west=[[0,0],[divider[0][0],0],...divider,[divider.at(-1)[0],height],[0,height]];
        const east=[[divider[0][0],0],[width,0],[width,height],[divider.at(-1)[0],height],...divider.slice().reverse()];
        defs.append("clipPath").attr("id",westId).attr("clipPathUnits","userSpaceOnUse").append("polygon").attr("points",west.map(point=>point.join(",")).join(" "));
        defs.append("clipPath").attr("id",eastId).attr("clipPathUnits","userSpaceOnUse").append("polygon").attr("points",east.map(point=>point.join(",")).join(" "));
        layer.append("path").datum(feature).attr("class",`historical-control historical-control-${partition.westSide}`).attr("clip-path",`url(#${westId})`).attr("d",path);
        layer.append("path").datum(feature).attr("class",`historical-control historical-control-${partition.eastSide}`).attr("clip-path",`url(#${eastId})`).attr("d",path);
        layer.append("path").datum(feature).attr("class","historical-boundary").attr("d",path);
        layer.append("path").datum({type:"LineString",coordinates:partition.divider}).attr("class","partition-line").attr("d",path);
        (partition.labels||[]).forEach(label=>{const point=projection(label.at);if(point)labelRequests.push({text:label.text,x:point[0],y:point[1],priority:96,className:"control-label"})});
      });
    }
    function keepMarkerSize(map,scale){
      map.selectAll(".start-dot[data-base-r]").attr("r",function(){return Number(this.dataset.baseR)/scale});
      map.selectAll(".end-mark[data-base-transform]").attr("transform",function(){return `${this.dataset.baseTransform} scale(${1/scale})`});
      map.selectAll(".unit-icon[data-base-transform]").attr("transform",function(){return `${this.dataset.baseTransform} scale(${1/scale})`});
    }
    function installWarSymbols(map){
      const defs=map.append("defs");
      const symbols=[
        ["unit-tank",'<path d="M4 15h24l4 4-3 3H5l-3-3z"/><circle cx="8" cy="19" r="2.2"/><circle cx="14" cy="19" r="2.2"/><circle cx="20" cy="19" r="2.2"/><circle cx="26" cy="19" r="2.2"/><path d="M8 10h15l4 5H6zM13 6h9l3 4H11zM18 4h3v2h-3zM23 7h11v2H23z"/>'],
        ["unit-ship",'<path d="M2 15h32l-5 7H8zM9 11h17v4H9zM13 7h9v4h-9zM17 3h2v4h-2zM8 9h5v2H8zM24 9h6v2h-6z"/>'],
        ["unit-bomber",'<path d="M17 2h2l2 8 12 5v3l-12-2-2 6h-2l-2-6-12 2v-3l12-5z"/>'],
        ["unit-landing",'<path d="M3 7h30l-4 15H7zM8 10h20v3H8zM10 15h16v2H10zM10 19h16v2H10zM27 4h5v6h-5z"/>']
      ];
      symbols.forEach(([id,markup])=>{const symbol=defs.append("symbol").attr("id",id).attr("viewBox","0 0 36 24");symbol.html(markup)});
    }
    function addWarIcon(layer,projection,unit,labels){
      const point=projection(unit.at);if(!point)return null;
      const angle=Number(unit.heading)||0,transform=`translate(${point[0]},${point[1]}) rotate(${angle})`;
      const group=layer.append("g").attr("class",`unit-icon unit-icon-${unit.side||"neutral"}`).attr("data-base-transform",transform).attr("transform",transform);
      const width=labels?22:14,height=labels?15:10;
      group.append("use").attr("href",`#unit-${unit.type}`).attr("x",-width/2).attr("y",-height/2).attr("width",width).attr("height",height);
      return {x:point[0],y:point[1],x1:point[0]-12,y1:point[1]-9,x2:point[0]+12,y2:point[1]+9};
    }
    function boxesOverlap(a,b){return !(a.x2<=b.x1||a.x1>=b.x2||a.y2<=b.y1||a.y1>=b.y2)}
    function overlapArea(a,b){if(!boxesOverlap(a,b))return 0;return (Math.min(a.x2,b.x2)-Math.max(a.x1,b.x1))*(Math.min(a.y2,b.y2)-Math.max(a.y1,b.y1))}
    function drawCollisionLabels(layer,requests,width,height,obstacles,reserved=[]){
      const offsets=[[0,0],[8,0],[-8,0],[0,8],[0,-8],[8,8],[-8,8],[8,-8],[-8,-8],[16,0],[-16,0],[0,14],[0,-14],[24,16],[-24,16],[24,-16],[-24,-16]],used=[];
      const uniqueRequests=requests.filter((request,index,all)=>all.findIndex(other=>other.text===request.text)===index);
      uniqueRequests.sort((a,b)=>b.priority-a.priority).forEach(request=>{
        if(request.showLabel===false)return;
        const text=layer.append("text").attr("class",request.className||"place-label").attr("x",request.x).attr("y",request.y).attr("visibility","hidden").text(request.text);
        const bbox=text.node().getBBox();let best=null;
        offsets.forEach(([dx,dy])=>{
          const box={x1:request.x+dx+bbox.x-request.x-2,y1:request.y+dy+bbox.y-request.y-2,x2:request.x+dx+bbox.x-request.x+bbox.width+2,y2:request.y+dy+bbox.y-request.y+bbox.height+2};
          const edgePenalty=box.x1<3||box.y1<3||box.x2>width-3||box.y2>height-3?1e7:0;
          const collisions=[...used,...obstacles,...reserved].reduce((sum,item)=>sum+overlapArea(box,item),0);
          const score=edgePenalty+collisions*1000+Math.hypot(dx,dy);if(!best||score<best.score)best={dx,dy,box,score};
        });
        if(!best){text.remove();return}
        if(Math.hypot(best.dx,best.dy)>10)layer.insert("line","text").attr("class","map-label-connector").attr("x1",request.x).attr("y1",request.y).attr("x2",request.x+best.dx).attr("y2",request.y+best.dy);
        text.attr("x",request.x+best.dx).attr("y",request.y+best.dy).attr("visibility",null);used.push(best.box);
      });
    }
    function drawWarLegend(viewport,event,width){
      const territoryEntries=event.legend?.territories||[];
      const routeEntries=event.legend?.routes||[{side:"axis",label:"추축군 진격"}];
      const unitEntries=event.legend?.units||[["ship","axis","함대"],["landing","axis","상륙정"],["tank","axis","전차"]].map(([type,side,label])=>({type,side,label}));
      const colorEntries=event.legend?.colors||[{side:"axis",label:"주황: 추축군"}];
      const rowCount=territoryEntries.length+routeEntries.length+1+unitEntries.length+colorEntries.length;
      const x=width-190,y=18,w=172,h=34+rowCount*21,legend=viewport.append("g").attr("class","war-map-legend").attr("transform",`translate(${x},${y})`);
      legend.append("rect").attr("class","war-legend-bg").attr("width",w).attr("height",h).attr("rx",6);
      legend.append("text").attr("class","war-legend-title").attr("x",12).attr("y",19).text(event.legend?.title||"표현 범례");
      const row=(cy,label,draw)=>{draw(cy);legend.append("text").attr("class","war-legend-text").attr("x",42).attr("y",cy+3).text(label)};
      let cy=38;
      territoryEntries.forEach(entry=>{row(cy,entry.label,yPos=>legend.append("rect").attr("class",`legend-territory legend-territory-${entry.side}`).attr("x",12).attr("y",yPos-7).attr("width",20).attr("height",13));cy+=21});
      routeEntries.forEach(entry=>{row(cy,entry.label,yPos=>legend.append("line").attr("class",`route route-${entry.side} route-active`).attr("x1",12).attr("x2",32).attr("y1",yPos).attr("y2",yPos));cy+=21});
      const directionSide=routeEntries[0]?.side||"neutral";
      row(cy,"화살표: 진행 방향",yPos=>legend.append("path").attr("class",`legend-arrow legend-arrow-${directionSide}`).attr("d",`M12 ${yPos}h15m0 0-5-4m5 4-5 4`));cy+=21;
      unitEntries.forEach(entry=>{row(cy,entry.label,yPos=>legend.append("use").attr("class",`legend-unit legend-unit-${entry.side}`).attr("href",`#unit-${entry.type}`).attr("x",12).attr("y",yPos-7).attr("width",20).attr("height",14));cy+=21});
      colorEntries.forEach(entry=>{legend.append("circle").attr("class",`legend-side legend-side-${entry.side}`).attr("cx",18).attr("cy",cy).attr("r",5);legend.append("text").attr("class","war-legend-text").attr("x",30).attr("y",cy+3).text(entry.label);cy+=21});
      return {x1:x,y1:y,x2:x+w,y2:y+h};
    }
    function drawMap(svgElement,theater,event,width,height,labels){
      const detailed=event.mapDesign==="war-v1";const map=d3.select(svgElement); map.attr("viewBox",`0 0 ${width} ${height}`).classed("war-map-detailed",detailed); map.selectAll("g,defs").remove();if(detailed)installWarSymbols(map);
      const projection=projectionFor(theater,width,height,event); const path=d3.geoPath(projection);const viewport=map.append("g").attr("class","map-viewport"); const base=viewport.append("g");
      base.append("path").datum(d3.geoGraticule10()).attr("class","graticule").attr("d",path);
      base.selectAll("path.country").data(countries).join("path").attr("class",d=>{const id=String(d.id).padStart(3,"0"),side=event.countrySides?.[id];return side?`country country-side-${side}`:"country"}).attr("d",path);
      const routeLayer=viewport.append("g").attr("class","route-layer"),unitLayer=viewport.append("g").attr("class","unit-layer"),labelRequests=[],obstacles=[];
      drawHistoricalPartitions(viewport,path,projection,event,width,height,labelRequests);
      event.routes.forEach(route=>{
        const side=routeSide(route),routeClass=detailed?`route route-active route-${side}`:"route";
        routeLayer.append("path").datum(routeFeature(route)).attr("class",routeClass).attr("d",path);
        const start=projection([route[1],route[2]]),end=projection([route[4],route[5]]); if(!start||!end)return;
        routeLayer.append("circle").attr("class",`start-dot start-dot-${side}`).attr("data-base-r",labels?5:3).attr("cx",start[0]).attr("cy",start[1]).attr("r",labels?5:3);
        const angle=Math.atan2(end[1]-start[1],end[0]-start[0])*180/Math.PI+90;
        const endTransform=`translate(${end[0]},${end[1]}) rotate(${angle})`;routeLayer.append("path").attr("class",`end-mark end-mark-${side}`).attr("data-base-transform",endTransform).attr("d",labels?"M0,-7 L6,6 L-6,6 Z":"M0,-4 L3.5,3.5 L-3.5,3.5 Z").attr("transform",endTransform);
        if(labels&&detailed){labelRequests.push({text:route[0],x:start[0]+7,y:start[1]-7,priority:76},{text:route[3],x:end[0]+8,y:end[1]+14,priority:78})}
        else if(labels){routeLayer.append("text").attr("class","place-label").attr("x",start[0]+7).attr("y",start[1]-7).text(route[0]);routeLayer.append("text").attr("class","place-label").attr("x",end[0]+8).attr("y",end[1]+15).text(route[3])}
      });
      if(detailed)(event.units||[]).forEach(unit=>{const box=addWarIcon(unitLayer,projection,unit,labels);if(box)obstacles.push(box);if(labels&&unit.showLabel!==false&&box)labelRequests.push({text:unit.label,x:box.x,y:box.y-12,priority:54})});
      if(detailed&&labels){const reserved=[drawWarLegend(viewport,event,width)];const labelLayer=viewport.append("g").attr("class","map-label-layer");drawCollisionLabels(labelLayer,labelRequests,width,height,obstacles,reserved);if(event.mapNote)labelLayer.append("text").attr("class","map-note").attr("x",12).attr("y",height-12).text(event.mapNote)}
    }
    function openMap(theater,event){
      document.getElementById("dialog-date").textContent=event.date;
      document.getElementById("dialog-title").textContent=`${theater.name} · ${event.title}`;
      document.getElementById("dialog-summary").textContent=event.summary;
      dialogSvg.select("title").text(`${theater.name}: ${event.date} ${event.title}`);
      dialogSvg.select("desc").text(event.summary);
      drawMap(dialogSvg.node(),theater,event,960,510,true);dialogZoomTransform=d3.zoomIdentity;dialogSvg.call(dialogZoom.transform,dialogZoomTransform); dialog.showModal();
    }

    const menu=document.getElementById("event-menu");
    const editor=document.getElementById("editor-dialog");
    const editorForm=document.getElementById("editor-form");
    const theaterSelect=document.getElementById("edit-theater");
    theaterDefs.forEach(theater=>{const option=document.createElement("option");option.value=theater.id;option.textContent=theater.name;theaterSelect.appendChild(option)});
    for(const id of ["edit-sort-date","edit-end-date"]){const input=document.getElementById(id);input.min=timelineConfig.minDate||baseEvents[0]?.sortDate||"0001-01-01";input.max=timelineConfig.maxDate||baseEvents.at(-1)?.sortDate||"9999-12-31"}
    let selectedEventId=null;
    let editorMode="edit";
    let currentTimelineMeta=null;
    let pickerMode="start",pickerProjection=null,pickerProjectionEvent=null,pickerPoints={start:null,end:null},pickerZoomTransform=d3.zoomIdentity;
    const hasMapInput=document.getElementById("edit-has-map");
    const mapEditor=document.getElementById("map-editor");
    const routePicker=document.getElementById("route-picker");
    const pickerSvg=d3.select(routePicker);
    const pickerZoom=d3.zoom().scaleExtent([.35,8]).on("zoom",event=>{pickerZoomTransform=event.transform;pickerSvg.select(".map-viewport").attr("transform",event.transform);keepMarkerSize(pickerSvg,event.transform.k)});
    pickerSvg.call(pickerZoom);

    function saveState(){localStorage.setItem(storageKey,JSON.stringify(userState))}
    function allEvents(){
      const deleted=new Set(userState.deleted||[]);
      const defaults=baseEvents.filter(event=>!deleted.has(event.id)).map(event=>({...event,...(userState.updates?.[event.id]||{})}));
      return [...defaults,...(userState.added||[])].sort((a,b)=>a.sortDate.localeCompare(b.sortDate)||a.title.localeCompare(b.title,"ko"));
    }
    function eventById(id){return allEvents().find(event=>event.id===id)}
    function inferEndDate(label,startDate){
      if(!label?.includes("~"))return null;const startYear=Number(startDate.slice(0,4));let match=label.match(/~\s*(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);let year,month,day;
      if(match){year=Number(match[1]);month=Number(match[2]);day=Number(match[3])}else if((match=label.match(/~\s*(\d{1,2})월\s*(\d{1,2})일/))){year=startYear;month=Number(match[1]);day=Number(match[2])}else if((match=label.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})(?:일)?\s*~\s*(\d{1,2})일/))){year=Number(match[1]);month=Number(match[2]);day=Number(match[4])}else{return null}
      const result=`${String(year).padStart(4,"0")}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;return result>startDate?result:null;
    }
    function eventEndDate(event){return Object.hasOwn(event,"endDate")?(event.endDate||null):inferEndDate(event.date,event.sortDate)}
    function reignLength(startDate,endDate){const start=new Date(`${startDate}T00:00:00`),end=new Date(`${endDate}T00:00:00`);let months=(end.getFullYear()-start.getFullYear())*12+end.getMonth()-start.getMonth();if(end.getDate()<start.getDate())months-=1;const years=Math.floor(Math.max(0,months)/12),rest=Math.max(0,months)%12;return [years?`${years}년`:"",rest?`${rest}개월`:""].filter(Boolean).join(" ")||"1개월 미만"}
    function milestoneDates(events){
      const years=timelineConfig.yearMarkers||[];
      return [...new Set([...years,...events.flatMap(event=>[event.sortDate,eventEndDate(event)]).filter(Boolean)])].sort();
    }
    function formatRule(date){const [year,month,day]=date.split("-").map(Number);return {year:String(year),label:month===1&&day===1?"1월":`${month}월 ${day}일`,yearLine:month===1&&day===1}}
    function durationColor(index){const hue=Math.round((index*137.508+18)%360),light=matchMedia("(prefers-color-scheme: dark)").matches?68:39;return `hsl(${hue} 62% ${light}%)`}
    function addDurationLayer(timeline,theaterEvents,slotY,timelineHeight,colorMap){
      const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.classList.add("duration-layer");svg.setAttribute("height",timelineHeight);svg.setAttribute("aria-hidden","true");const defs=document.createElementNS(svg.namespaceURI,"defs");svg.appendChild(defs);
      theaterEvents.filter(event=>eventEndDate(event)).forEach((event,index)=>{const endDate=eventEndDate(event),startY=slotY.get(event.sortDate),endY=slotY.get(endDate);if(startY==null||endY==null||endY<=startY)return;const color=colorMap.get(event.id),x=8+(index%4)*4,markerId=`duration-arrow-${event.id.replace(/[^a-zA-Z0-9_-]/g,"-")}`;
        const marker=document.createElementNS(svg.namespaceURI,"marker");marker.id=markerId;marker.setAttribute("markerWidth","10");marker.setAttribute("markerHeight","10");marker.setAttribute("refX","8");marker.setAttribute("refY","5");marker.setAttribute("orient","auto");marker.setAttribute("markerUnits","userSpaceOnUse");const tip=document.createElementNS(svg.namespaceURI,"path");tip.setAttribute("d","M0,0 L10,5 L0,10 Z");tip.setAttribute("fill",color);marker.appendChild(tip);defs.appendChild(marker);
        const line=document.createElementNS(svg.namespaceURI,"line");line.classList.add("duration-line");line.setAttribute("x1",x);line.setAttribute("x2",x);line.setAttribute("y1",startY+7);line.setAttribute("y2",endY-7);line.setAttribute("stroke",color);line.setAttribute("marker-end",`url(#${markerId})`);svg.appendChild(line);
        const label=document.createElementNS(svg.namespaceURI,"text");label.classList.add("duration-end-label");label.setAttribute("x","28");label.setAttribute("y",endY+4);label.setAttribute("fill",color);label.textContent=`${event.title.length>12?`${event.title.slice(0,12)}…`:event.title} · 끝`;svg.appendChild(label);
      });timeline.appendChild(svg);
    }

    function render(){
      const scrollLeft=timelineScroll.scrollLeft;
      const events=allEvents();
      const milestones=milestoneDates(events);
      const slotGap=timelineConfig.slotGap||252,slotTop=76,collisionGap=timelineConfig.collisionGap||150;
      const slotY=new Map();let cursorY=slotTop;
      milestones.forEach(date=>{slotY.set(date,cursorY);const maxSameDate=Math.max(1,...theaterDefs.map(theater=>events.filter(event=>event.theater===theater.id&&event.sortDate===date).length));cursorY+=slotGap+(maxSameDate-1)*collisionGap});
      const timelineHeight=cursorY+slotTop+170;
      currentTimelineMeta={milestones,slotY};
      const durationEvents=events.filter(event=>eventEndDate(event));const durationColors=new Map(durationEvents.map((event,index)=>[event.id,durationColor(index)]));
      board.style.setProperty("--timeline-height",`${timelineHeight}px`);
      rules.replaceChildren();
      milestones.forEach(date=>{
        const info=formatRule(date);const rule=document.createElement("div");rule.className=`time-rule${info.yearLine?" is-year":""}`;rule.dataset.milestone=date;rule.style.top=`${slotY.get(date)}px`;
        const label=document.createElement("span");label.className="time-label";
        if(info.yearLine){const strong=document.createElement("strong");strong.textContent=info.year;label.appendChild(strong)}
        label.append(info.label);rule.appendChild(label);rules.appendChild(rule);
      });
      board.querySelectorAll(".theater-lane").forEach(node=>node.remove());
      stickyTrack.replaceChildren();
      theaterDefs.forEach(theater=>{
        const theaterEvents=events.filter(event=>event.theater===theater.id);
        const stickyLabel=document.createElement("div");stickyLabel.className="sticky-theater-label";
        const name=document.createElement("strong");name.textContent=theater.name;const count=document.createElement("span");count.textContent=`${theaterEvents.length}개 사건`;stickyLabel.append(name,count);stickyTrack.appendChild(stickyLabel);
        const lane=document.createElement("section");lane.className="theater-lane";lane.setAttribute("aria-labelledby",`${theater.id}-title`);
        const heading=document.createElement("h3");heading.id=`${theater.id}-title`;heading.className="sr-only";heading.textContent=theater.name;
        const timeline=document.createElement("div");timeline.className="timeline";timeline.setAttribute("aria-label",`${theater.name} 사건 추가 영역. 길게 누르거나 우클릭하세요.`);lane.append(heading,timeline);
        addDurationLayer(timeline,theaterEvents,slotY,timelineHeight,durationColors);
        const dateCounts=new Map();
        theaterEvents.forEach(event=>{
          const sameDateIndex=dateCounts.get(event.sortDate)||0;dateCounts.set(event.sortDate,sameDateIndex+1);
          const article=document.createElement("article");article.className=`event${event.kind==="reign"?" is-reign-event":""}${event.kind==="world"?" is-world-event":""}${event.related?" is-related-event":""}`;article.dataset.eventId=event.id;article.style.top=`${slotY.get(event.sortDate)-28+sameDateIndex*collisionGap}px`;
          const card=document.createElement("div");card.className=`event-card${event.routes?.length?"":" no-map"}${event.kind==="reign"?" is-reign":""}`;card.tabIndex=0;card.setAttribute("role","group");card.setAttribute("aria-label",`${event.date} ${event.title}. 길게 누르거나 우클릭하여 편집`);
          const copy=document.createElement("div");const time=document.createElement("time");time.className="event-date";time.textContent=event.kind==="reign"&&eventEndDate(event)?`${event.date} · 총 ${reignLength(event.sortDate,eventEndDate(event))}`:event.date;
          const title=document.createElement("h4");title.className="event-title";title.textContent=event.title;const summary=document.createElement("p");summary.className="event-summary";summary.textContent=event.summary;copy.append(time,title,summary);
          if(event.kind==="reign"){const meta=document.createElement("dl");meta.className="reign-meta";for(const [label,value] of [["혈연",event.relation],["계승",event.succession],["섭정",event.regency]]){if(!value)continue;const row=document.createElement("div"),term=document.createElement("dt"),detail=document.createElement("dd");term.textContent=label;detail.textContent=value;row.append(term,detail);meta.appendChild(row)}copy.appendChild(meta)}card.appendChild(copy);
          if(event.routes?.length){const button=document.createElement("button");button.className="map-thumb";button.type="button";button.setAttribute("aria-label",`${theater.name} ${event.date} ${event.title} 지도 확대`);const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("role","img");svg.setAttribute("aria-label",`${event.title} 이동 경로 축소 지도`);const text=document.createElement("span");text.textContent="지도 확대";button.append(svg,text);button.addEventListener("click",()=>openMap(theater,event));card.appendChild(button);drawMap(svg,theater,event,130,88,false)}
          attachEditGesture(card,event);article.appendChild(card);timeline.appendChild(article);
        });
        attachLaneGesture(timeline,theater);
        board.appendChild(lane);
      });
      timelineScroll.scrollLeft=scrollLeft;
    }

    function attachEditGesture(card,event){
      let timer=null,startX=0,startY=0,longPressed=false;
      const cancel=()=>{clearTimeout(timer);timer=null;card.classList.remove("is-pressed")};
      card.addEventListener("pointerdown",e=>{if(e.button!==0)return;startX=e.clientX;startY=e.clientY;longPressed=false;card.classList.add("is-pressed");timer=setTimeout(()=>{longPressed=true;openMenu(event.id,e.clientX,e.clientY);card.classList.remove("is-pressed")},620)});
      card.addEventListener("pointermove",e=>{if(Math.hypot(e.clientX-startX,e.clientY-startY)>10)cancel()});
      card.addEventListener("pointerup",cancel);card.addEventListener("pointercancel",cancel);card.addEventListener("pointerleave",cancel);
      card.addEventListener("click",e=>{if(longPressed){e.preventDefault();e.stopPropagation();longPressed=false}},true);
      card.addEventListener("contextmenu",e=>{e.preventDefault();cancel();openMenu(event.id,e.clientX,e.clientY)});
      card.addEventListener("keydown",e=>{if(e.key==="ContextMenu"||(e.shiftKey&&e.key==="F10")){e.preventDefault();const box=card.getBoundingClientRect();openMenu(event.id,box.left+24,box.top+24)}});
    }
    function dateAtPosition(timeline,clientY){
      const y=clientY-timeline.getBoundingClientRect().top;const {milestones,slotY}=currentTimelineMeta;
      if(y<=slotY.get(milestones[0]))return milestones[0];if(y>=slotY.get(milestones.at(-1)))return milestones.at(-1);
      for(let index=0;index<milestones.length-1;index++){
        const first=milestones[index],second=milestones[index+1],y1=slotY.get(first),y2=slotY.get(second);if(y<y1||y>y2)continue;
        const t=(y-y1)/(y2-y1),start=new Date(`${first}T00:00:00Z`).getTime(),end=new Date(`${second}T00:00:00Z`).getTime();return new Date(start+(end-start)*t).toISOString().slice(0,10);
      }
      return milestones.at(-1);
    }
    function attachLaneGesture(timeline,theater){
      let timer=null,startX=0,startY=0;
      const cancel=()=>{clearTimeout(timer);timer=null;timeline.classList.remove("is-pressed")};
      timeline.addEventListener("pointerdown",event=>{if(event.button!==0||event.target.closest(".event-card"))return;startX=event.clientX;startY=event.clientY;timeline.classList.add("is-pressed");timer=setTimeout(()=>{const sortDate=dateAtPosition(timeline,startY);cancel();openEditor("add",null,{theater:theater.id,sortDate})},620)});
      timeline.addEventListener("pointermove",event=>{if(timer&&Math.hypot(event.clientX-startX,event.clientY-startY)>10)cancel()});timeline.addEventListener("pointerup",cancel);timeline.addEventListener("pointercancel",cancel);timeline.addEventListener("pointerleave",cancel);
      timeline.addEventListener("contextmenu",event=>{if(event.target.closest(".event-card"))return;event.preventDefault();cancel();openEditor("add",null,{theater:theater.id,sortDate:dateAtPosition(timeline,event.clientY)})});
    }
    function openMenu(eventId,x,y){
      selectedEventId=eventId;menu.classList.add("is-open");menu.style.left="0";menu.style.top="0";
      const box=menu.getBoundingClientRect();menu.style.left=`${Math.max(8,Math.min(x,innerWidth-box.width-8))}px`;menu.style.top=`${Math.max(8,Math.min(y,innerHeight-box.height-8))}px`;menu.querySelector("button").focus();
    }
    function closeMenu(){menu.classList.remove("is-open")}
    function koreanDate(value){const [y,m,d]=value.split("-").map(Number);return `${y}년 ${m}월 ${d}일`}
    function drawPicker(){
      const theater=theaterDefs.find(item=>item.id===theaterSelect.value);const width=520,height=260;const map=d3.select(routePicker);map.attr("viewBox",`0 0 ${width} ${height}`);map.selectAll("*").remove();pickerProjection=projectionFor(theater,width,height,pickerProjectionEvent);const path=d3.geoPath(pickerProjection);
      const viewport=map.append("g").attr("class","map-viewport");viewport.append("g").selectAll("path").data(countries).join("path").attr("class","country").attr("d",path);
      if(pickerPoints.start&&pickerPoints.end)viewport.append("path").datum({type:"LineString",coordinates:[pickerPoints.start,pickerPoints.end]}).attr("class","route").attr("d",path);
      for(const [key,label] of [["start","출발"],["end","도착"]]){const point=pickerPoints[key];if(!point)continue;const xy=pickerProjection(point);if(!xy)continue;if(key==="start"){viewport.append("circle").attr("class","start-dot").attr("data-base-r",6).attr("cx",xy[0]).attr("cy",xy[1]).attr("r",6)}else{const start=pickerPoints.start?pickerProjection(pickerPoints.start):[xy[0],xy[1]-20];const angle=Math.atan2(xy[1]-start[1],xy[0]-start[0])*180/Math.PI+90,endTransform=`translate(${xy[0]},${xy[1]}) rotate(${angle})`;viewport.append("path").attr("class","end-mark").attr("data-base-transform",endTransform).attr("d","M0,-10 L8,8 L-8,8 Z").attr("transform",endTransform)}viewport.append("text").attr("class","place-label").attr("x",xy[0]+10).attr("y",xy[1]-10).text(label)}
      map.call(pickerZoom).call(pickerZoom.transform,pickerZoomTransform);
      updateCoordinateReadout();
    }
    function updateCoordinateReadout(){
      const format=point=>point?`${point[1].toFixed(2)}°, ${point[0].toFixed(2)}°`:"미선택";document.getElementById("coordinate-readout").textContent=`출발 ${format(pickerPoints.start)} · 도착 ${format(pickerPoints.end)}`;
    }
    function currentPickerView(){
      if(!pickerProjection)return null;
      const view=[[0,0],[520,0],[520,260],[0,260]].map(point=>{const coordinate=pickerProjection.invert(pickerZoomTransform.invert(point));return coordinate?.every(Number.isFinite)?coordinate:null});
      return view.every(Boolean)?view:null;
    }
    function setPickerMode(mode){pickerMode=mode;document.getElementById("pick-start").classList.toggle("is-active",mode==="start");document.getElementById("pick-end").classList.toggle("is-active",mode==="end")}
    function openEditor(mode,id,context={}){
      editorMode=mode;selectedEventId=id;const source=id?eventById(id):null;pickerProjectionEvent=source?{routes:source.routes||[],mapView:source.mapView||null}:null;
      document.getElementById("editor-title").textContent=mode==="add"?"사건 추가":"사건 편집";
      const initialSort=context.sortDate||source?.sortDate||timelineConfig.defaultDate||baseEvents[0]?.sortDate;theaterSelect.value=context.theater||source?.theater||theaterDefs[0]?.id;document.getElementById("edit-sort-date").value=initialSort;
      document.getElementById("edit-end-date").value=source?eventEndDate(source)||"":"";
      document.getElementById("edit-date").value=mode==="add"?koreanDate(initialSort):(source?.date||koreanDate(initialSort));document.getElementById("edit-title").value=mode==="add"?"":(source?.title||"");document.getElementById("edit-summary").value=mode==="add"?"":(source?.summary||"");
      const route=source?.routes?.[0];pickerPoints={start:route?[route[1],route[2]]:null,end:route?[route[4],route[5]]:null};pickerZoomTransform=d3.zoomIdentity;document.getElementById("edit-start-name").value=route?.[0]||"";document.getElementById("edit-end-name").value=route?.[3]||"";hasMapInput.checked=Boolean(route);mapEditor.hidden=!hasMapInput.checked;setPickerMode("start");drawPicker();
      editor.showModal();setTimeout(()=>document.getElementById(mode==="add"?"edit-title":"edit-date").focus(),0);
    }
    menu.addEventListener("click",event=>{
      const action=event.target.closest("button")?.dataset.action;if(!action)return;closeMenu();
      if(action==="add"){const source=eventById(selectedEventId);openEditor("add",null,{theater:source?.theater,sortDate:source?.sortDate})}
      if(action==="edit"){openEditor("edit",selectedEventId)}
      if(action==="delete"){
        const target=eventById(selectedEventId);if(!target||!confirm(`‘${target.title}’ 사건을 삭제할까요?`))return;
        if(selectedEventId.startsWith("custom-")){userState.added=(userState.added||[]).filter(item=>item.id!==selectedEventId)}else{userState.deleted=[...new Set([...(userState.deleted||[]),selectedEventId])];delete userState.updates[selectedEventId]}
        saveState();render();
      }
    });
    document.addEventListener("pointerdown",event=>{if(menu.classList.contains("is-open")&&!menu.contains(event.target))closeMenu()},true);
    document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menu.classList.contains("is-open"))closeMenu()});
    hasMapInput.addEventListener("change",()=>{mapEditor.hidden=!hasMapInput.checked;if(hasMapInput.checked)drawPicker()});
    document.getElementById("pick-start").addEventListener("click",()=>setPickerMode("start"));document.getElementById("pick-end").addEventListener("click",()=>setPickerMode("end"));document.getElementById("clear-route").addEventListener("click",()=>{pickerProjectionEvent=null;pickerPoints={start:null,end:null};pickerZoomTransform=d3.zoomIdentity;document.getElementById("edit-start-name").value="";document.getElementById("edit-end-name").value="";setPickerMode("start");drawPicker()});
    document.getElementById("picker-zoom-in").addEventListener("click",()=>pickerSvg.call(pickerZoom.scaleBy,1.45));document.getElementById("picker-zoom-out").addEventListener("click",()=>pickerSvg.call(pickerZoom.scaleBy,1/1.45));
    theaterSelect.addEventListener("change",()=>{pickerProjectionEvent=null;pickerPoints={start:null,end:null};pickerZoomTransform=d3.zoomIdentity;drawPicker()});
    document.getElementById("edit-sort-date").addEventListener("change",event=>{if(editorMode==="add")document.getElementById("edit-date").value=koreanDate(event.target.value)});
    d3.select(routePicker).on("click",event=>{if(!pickerProjection)return;const screenPoint=d3.pointer(event,routePicker),mapPoint=pickerZoomTransform.invert(screenPoint),point=pickerProjection.invert(mapPoint);if(!point)return;pickerPoints[pickerMode]=point;if(pickerMode==="start")setPickerMode("end");drawPicker()});
    editorForm.addEventListener("submit",event=>{
      event.preventDefault();const sortDate=document.getElementById("edit-sort-date").value,endDate=document.getElementById("edit-end-date").value||null;if(endDate&&endDate<=sortDate){alert("종료 날짜는 시작 날짜보다 뒤여야 합니다.");return}if(hasMapInput.checked&&(!pickerPoints.start||!pickerPoints.end)){alert("지도에서 출발점과 도착점을 모두 선택해주세요.");return}const routes=hasMapInput.checked?[[document.getElementById("edit-start-name").value.trim()||"출발점",pickerPoints.start[0],pickerPoints.start[1],document.getElementById("edit-end-name").value.trim()||"도착점",pickerPoints.end[0],pickerPoints.end[1]]]:[];const mapView=hasMapInput.checked?currentPickerView():null;const payload={theater:theaterSelect.value,sortDate,endDate,date:document.getElementById("edit-date").value.trim()||koreanDate(sortDate),title:document.getElementById("edit-title").value.trim(),summary:document.getElementById("edit-summary").value.trim(),routes,mapView};
      if(editorMode==="add"){
        userState.added=[...(userState.added||[]),{id:`custom-${Date.now()}`,...payload}];
      }else if(selectedEventId.startsWith("custom-")){
        userState.added=(userState.added||[]).map(item=>item.id===selectedEventId?{...item,...payload}:item);
      }else{
        userState.updates[selectedEventId]={...(userState.updates[selectedEventId]||{}),...payload};
      }
      saveState();editor.close();render();
    });
    document.getElementById("close-editor").addEventListener("click",()=>editor.close());
    document.getElementById("cancel-edit").addEventListener("click",()=>editor.close());
    editor.addEventListener("click",event=>{if(event.target===editor)editor.close()});
    render();
    timelineScroll.addEventListener("scroll",()=>{stickyTrack.style.transform=`translateX(${-timelineScroll.scrollLeft}px)`},{passive:true});
    document.getElementById("dialog-zoom-in").addEventListener("click",()=>dialogSvg.call(dialogZoom.scaleBy,1.45));document.getElementById("dialog-zoom-out").addEventListener("click",()=>dialogSvg.call(dialogZoom.scaleBy,1/1.45));
    document.getElementById("close-dialog").addEventListener("click",()=>dialog.close());
    dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
    })();
