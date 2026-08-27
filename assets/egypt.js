(() => {
  const config = window.timelineConfig;
  if (!config || !config.egypt) return;

  const { periods, minorReigns, places, landmarks = {}, yearOffset } = config.egypt;
  const board = document.getElementById("timeline-board");
  const rail = document.getElementById("dynasty-rail");
  const overlay = document.getElementById("map-places");
  const caption = document.getElementById("map-caption");
  const hud = {
    root: document.getElementById("era-hud"),
    period: document.getElementById("hud-period"),
    dynasty: document.getElementById("hud-dynasty"),
    ruler: document.getElementById("hud-ruler"),
    year: document.getElementById("hud-year")
  };
  if (!board || !rail) return;

  const showYear = (year) => (year < 0 ? `기원전 ${-year}년` : `${year}년`);
  const toYear = (sortDate) => Number(sortDate.slice(0, 4)) - yearOffset;

  // 타임라인 보드의 세로 좌표는 엔진이 사건 카드에 부여한 top 값에서 읽는다.
  // 연도 -> y 픽셀 변환표를 만들어 왕조 레일과 시대 띠를 같은 축에 맞춘다.
  let scale = null;

  function buildScale() {
    const cards = [...board.querySelectorAll(".event")];
    const points = [];
    for (const card of cards) {
      const id = card.dataset.eventId;
      const event = config.events.find((e) => e.id === id);
      if (!event) continue;
      const top = card.offsetTop;
      points.push({ year: toYear(event.sortDate), y: top });
    }
    if (points.length < 2) return null;
    points.sort((a, b) => a.year - b.year);
    return points;
  }

  function yearToY(year) {
    if (!scale || !scale.length) return 0;
    if (year <= scale[0].year) return scale[0].y;
    if (year >= scale[scale.length - 1].year) return scale[scale.length - 1].y;
    for (let i = 1; i < scale.length; i += 1) {
      const a = scale[i - 1];
      const b = scale[i];
      if (year <= b.year) {
        if (b.year === a.year) return a.y;
        const t = (year - a.year) / (b.year - a.year);
        return a.y + t * (b.y - a.y);
      }
    }
    return scale[scale.length - 1].y;
  }

  function renderRail() {
    cardIndex = null;
    scale = buildScale();
    if (!scale) return;
    rail.replaceChildren();
    rail.style.height = `${board.scrollHeight}px`;

    for (const [id, from, to, name, dynasty, color] of periods) {
      const band = document.createElement("div");
      band.className = "rail-period";
      band.dataset.periodId = id;
      const top = yearToY(from);
      const height = Math.max(28, yearToY(to) - top);
      band.style.top = `${top}px`;
      band.style.height = `${height}px`;
      band.style.setProperty("--band-color", color);
      const text = document.createElement("span");
      text.className = "rail-period-text";
      const strong = document.createElement("strong");
      strong.textContent = name;
      const small = document.createElement("span");
      small.textContent = dynasty;
      text.append(strong, small);
      band.appendChild(text);
      rail.appendChild(band);
    }

    for (const [id, from, to, name] of minorReigns) {
      const tick = document.createElement("div");
      tick.className = "rail-dynasty";
      tick.dataset.dynastyId = id;
      const top = yearToY(from);
      const height = Math.max(16, yearToY(to) - top);
      tick.style.top = `${top}px`;
      tick.style.height = `${height}px`;
      const text = document.createElement("span");
      text.className = "rail-dynasty-text";
      text.textContent = name;
      tick.appendChild(text);
      rail.appendChild(tick);
    }
  }

  // Natural Earth 경계 데이터를 D3 로 그린다. 좌표는 실제 위경도다.
  const MAP_W = 420;
  const MAP_H = 760;
  let projection = null;

  function renderMap() {
    if (!overlay || typeof d3 === "undefined" || typeof topojson === "undefined") return;
    const atlas = window.worldAtlas;
    if (!atlas) return;

    const countries = topojson.feature(atlas, atlas.objects.countries).features;

    // 이 d3 빌드의 fitExtent 는 화면 범위를 반영하지 못해 세계 지도 배율이 나온다.
    // 메르카토르 배율과 중심을 직접 구해 이집트와 주변(레반트·누비아)에 맞춘다.
    const VIEW = { lon0: 28.0, lon1: 37.2, lat0: 20.0, lat1: 35.0 };
    const rad = (v) => (v * Math.PI) / 180;
    const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + rad(lat) / 2));
    const spanX = rad(VIEW.lon1) - rad(VIEW.lon0);
    const spanY = mercY(VIEW.lat1) - mercY(VIEW.lat0);
    const scale = Math.min((MAP_W - 16) / spanX, (MAP_H - 20) / spanY);
    projection = d3.geoMercator()
      .scale(scale)
      .center([(VIEW.lon0 + VIEW.lon1) / 2, (VIEW.lat0 + VIEW.lat1) / 2])
      .translate([MAP_W / 2, MAP_H / 2]);
    const path = d3.geoPath(projection);

    const ns = "http://www.w3.org/2000/svg";
    const land = document.getElementById("map-land");
    if (land) {
      land.replaceChildren();
      for (const feature of countries) {
        const d = path(feature);
        if (!d) continue;
        const node = document.createElementNS(ns, "path");
        node.setAttribute("d", d);
        node.setAttribute("class", "map-country");
        if (feature.properties && feature.properties.name === "Egypt") {
          node.classList.add("is-egypt");
        }
        land.appendChild(node);
      }
      // 나일강은 Natural Earth 실측 하천 데이터를 그대로 그린다.
      // (손으로 찍은 좌표는 실제 물길과 어긋난다)
      const rivers = window.worldRivers;
      if (rivers && rivers.features) {
        for (const feature of rivers.features) {
          const name = (feature.properties && feature.properties.name) || "";
          // 본류와 삼각주 두 지류, 수에즈 운하만 그린다.
          // "Victoria Nile", "Albert Nile" 등 상류 지류는 이집트 밖이라 제외한다.
          const isNile = name === "Nile" || name === "Damietta Branch" || name === "Rosetta Branch";
          const isCanal = name === "Suez Canal";
          if (!isNile && !isCanal) continue;
          const d = path(feature);
          if (!d) continue;
          const river = document.createElementNS(ns, "path");
          river.setAttribute("d", d);
          river.setAttribute("class", isCanal ? "map-canal" : "map-nile");
          land.appendChild(river);
        }
      }
    }

    overlay.replaceChildren();
    for (const [id, [name, lon, lat]] of Object.entries(places)) {
      const xy = projection([lon, lat]);
      if (!xy) continue;
      const [x, y] = xy;
      const kind = landmarks[id] || "site";
      const group = document.createElementNS(ns, "g");
      group.setAttribute("class", `map-place is-${kind}`);
      group.dataset.placeId = id;

      const halo = document.createElementNS(ns, "circle");
      halo.setAttribute("class", "place-halo");
      halo.setAttribute("cx", x);
      halo.setAttribute("cy", y);
      halo.setAttribute("r", 14);
      group.appendChild(halo);

      if (kind === "monument") {
        // 유적은 삼각형(피라미드·신전)으로 구분한다.
        const tri = document.createElementNS(ns, "path");
        tri.setAttribute("class", "place-mark");
        tri.setAttribute("d", `M${x} ${y - 5}L${x + 4.6} ${y + 3}L${x - 4.6} ${y + 3}Z`);
        group.appendChild(tri);
      } else if (kind === "capital") {
        // 수도는 사각형으로 구분한다.
        const sq = document.createElementNS(ns, "rect");
        sq.setAttribute("class", "place-mark");
        sq.setAttribute("x", x - 3.6);
        sq.setAttribute("y", y - 3.6);
        sq.setAttribute("width", 7.2);
        sq.setAttribute("height", 7.2);
        group.appendChild(sq);
      } else {
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("class", "place-mark");
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("r", 3.2);
        group.appendChild(dot);
      }

      const text = document.createElementNS(ns, "text");
      text.setAttribute("class", "place-label");
      // 지도 오른쪽 끝에 가까우면 라벨을 왼쪽으로 붙인다.
      const flip = x > MAP_W * 0.62;
      text.setAttribute("x", flip ? x - 9 : x + 9);
      text.setAttribute("y", y + 4);
      if (flip) text.setAttribute("text-anchor", "end");
      text.textContent = name;
      group.appendChild(text);

      overlay.appendChild(group);
    }

    hideCollidingLabels();
  }

  // 카이로 주변처럼 지점이 몰린 곳은 상시 라벨이 서로 겹친다.
  // 우선순위(수도 > 유적 > 기타)가 낮은 쪽 라벨을 숨긴다.
  function hideCollidingLabels() {
    if (!overlay) return;
    const rank = { capital: 0, monument: 1, site: 2 };
    const nodes = [...overlay.querySelectorAll(".map-place")]
      .filter((g) => g.classList.contains("is-capital") || g.classList.contains("is-monument"))
      .map((g) => {
        const kind = g.classList.contains("is-capital") ? "capital" : "monument";
        // 마커는 원·사각형·삼각형이 섞여 있어 좌표 속성이 제각각이다.
        // 라벨 자체의 좌표를 기준으로 삼는다.
        const label = g.querySelector(".place-label");
        const cx = Number(label.getAttribute("x"));
        const cy = Number(label.getAttribute("y"));
        return { g, kind, cx, cy, text: label };
      })
      .sort((a, b) => rank[a.kind] - rank[b.kind]);

    const placed = [];
    for (const n of nodes) {
      n.text.style.display = "";
      // 라벨 높이만큼(세로 11px)만 겹치면 충돌로 본다. 가로는 글자가 길어 넉넉히.
      const clash = placed.some((q) => Math.abs(q.cx - n.cx) < 60 && Math.abs(q.cy - n.cy) < 11);
      if (clash) n.text.style.display = "none";
      else placed.push(n);
    }
  }

  function periodAt(year) {
    const hit = periods.find(([, from, to]) => year >= from && year < to);
    if (hit) return hit;
    // 첫 시대보다 앞선 연도(상형문자 사용 등)는 첫 시대로 묶는다.
    return year < periods[0][1] ? periods[0] : periods[periods.length - 1];
  }

  function dynastyAt(year) {
    const hit = minorReigns.filter(([, from, to]) => year >= from && year < to);
    return hit.length ? hit[hit.length - 1][3] : "";
  }

  let activePlace = null;

  function setActivePlace(placeId) {
    if (placeId === activePlace) return;
    activePlace = placeId;
    if (!overlay) return;
    for (const node of overlay.querySelectorAll(".map-place")) {
      node.classList.toggle("is-active", node.dataset.placeId === placeId);
    }
    if (caption) {
      const entry = placeId ? places[placeId] : null;
      caption.textContent = entry ? entry[0] : "카드를 보면 그 사건이 일어난 곳을 표시합니다";
    }
  }

  // 화면 중앙에 가장 가까운 카드를 현재 카드로 본다.
  // 문서 좌표 기준으로 "지금 보고 있는 지점"에 가장 가까운 카드를 고른다.
  // getBoundingClientRect 는 스크롤에 따라 값이 변하므로 offsetTop 기반으로 계산해
  // 카드가 화면 밖으로 나가도 항상 하나가 선택되게 한다.
  let cardIndex = null;

  function buildCardIndex() {
    cardIndex = [...board.querySelectorAll(".event")].map((card) => {
      const event = config.events.find((e) => e.id === card.dataset.eventId) || null;
      return { card, event, top: card.offsetTop, height: card.offsetHeight };
    }).filter((entry) => entry.event);
    cardIndex.sort((a, b) => a.top - b.top);
  }

  function currentEvent() {
    if (!cardIndex || !cardIndex.length) buildCardIndex();
    if (!cardIndex.length) return null;
    const boardTop = board.getBoundingClientRect().top + window.scrollY;
    // 화면 위에서 42% 지점을 읽고 있는 위치로 본다.
    const focusY = window.scrollY + window.innerHeight * 0.42 - boardTop;
    let best = cardIndex[0];
    let bestDist = Infinity;
    for (const entry of cardIndex) {
      const center = entry.top + entry.height / 2;
      const dist = Math.abs(center - focusY);
      if (dist < bestDist) {
        bestDist = dist;
        best = entry;
      }
    }
    return best.event;
  }

  let lastRuler = null;

  function updateHud() {
    const event = currentEvent();
    if (!event) return;
    const year = toYear(event.sortDate);
    const [, , , periodName, periodDynasty] = periodAt(year);
    const dynasty = dynastyAt(year) || periodDynasty;

    if (hud.period && hud.period.textContent !== periodName) hud.period.textContent = periodName;
    if (hud.dynasty && hud.dynasty.textContent !== dynasty) hud.dynasty.textContent = dynasty;

    // 재위 카드를 지나면 그 왕을 계속 표시하되, 재위가 끝난 연도를 넘어서면 지운다.
    if (event.kind === "reign") lastRuler = event;
    else if (lastRuler && lastRuler.toYear !== undefined && year > lastRuler.toYear) lastRuler = null;
    const rulerName = lastRuler ? lastRuler.title : "";
    if (hud.ruler && hud.ruler.textContent !== rulerName) hud.ruler.textContent = rulerName;

    const yearText = event.kind === "reign" && event.toYear !== undefined
      ? `${showYear(event.fromYear)} — ${showYear(event.toYear)}`
      : showYear(year);
    if (hud.year && hud.year.textContent !== yearText) hud.year.textContent = yearText;

    for (const band of rail.querySelectorAll(".rail-period")) {
      const entry = periods.find(([id]) => id === band.dataset.periodId);
      band.classList.toggle("is-active", Boolean(entry) && entry[3] === periodName);
    }

    setActivePlace(event.place || null);
    updateHudVisibility();
    followMap();
  }

  // 타임라인을 실제로 보고 있을 때만 라벨을 띄운다.
  // 맨 위(히어로 배너)에서는 가릴 뿐이라 숨긴다.
  // 가로 스크롤 컨테이너(.egypt-chronicle) 안에서는 position:sticky 가
  // 화면이 아니라 그 컨테이너를 기준으로 붙어 세로 위치가 어긋난다.
  // 그 경우에만 지도의 세로 위치를 직접 맞춰 화면을 따라오게 한다.
  function followMap() {
    const pane = document.querySelector(".egypt-map-pane");
    const sticky = document.querySelector(".egypt-map-sticky");
    const chronicle = document.querySelector(".egypt-chronicle");
    if (!pane || !sticky || !chronicle) return;

    if (getComputedStyle(chronicle).overflowX !== "auto") {
      sticky.style.transform = "";
      return;
    }
    // transform 을 걷어낸 원래 위치를 기준으로 매번 새로 계산한다(누적 방지).
    sticky.style.transform = "";
    const paneTop = pane.getBoundingClientRect().top;
    const want = 8 - paneTop;
    const max = Math.max(0, pane.offsetHeight - sticky.offsetHeight - 8);
    const shift = Math.max(0, Math.min(max, want));
    sticky.style.transform = `translateY(${shift}px)`;
  }


  function updateHudVisibility() {
    if (!hud.root) return;
    // 보드가 아니라 첫 사건 카드가 화면 위쪽까지 올라왔을 때를 기준으로 삼는다.
    // 히어로 배너를 보고 있는 동안에는 가리기만 하므로 띄우지 않는다.
    const first = board.querySelector(".event");
    const anchor = first || board;
    const top = anchor.getBoundingClientRect().top;
    const boardBottom = board.getBoundingClientRect().bottom;
    // 첫 카드가 화면 위쪽(높이의 25% 지점)까지 올라온 뒤부터,
    // 타임라인이 끝날 때까지 표시한다.
    const shown = top <= window.innerHeight * 0.25 && boardBottom > 0;
    hud.root.classList.toggle("is-ready", shown);
  }

  // requestAnimationFrame 은 배경 탭이나 렌더링이 없는 환경에서 콜백이 오지 않는다.
  // 스크롤 갱신이 멈추지 않도록 타이머로 제한한다.
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    setTimeout(() => {
      updateHud();
      ticking = false;
    }, 60);
  }

  // scroll 이벤트만으로는 갱신이 끊기는 환경이 있어(iframe·일부 모바일 브라우저)
  // 카드가 화면 중앙 띠를 지날 때마다 IntersectionObserver 로도 갱신한다.
  let cardObserver = null;
  function observeCards() {
    if (typeof IntersectionObserver === "undefined") return;
    if (cardObserver) cardObserver.disconnect();
    cardObserver = new IntersectionObserver(() => updateHud(), {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0
    });
    for (const card of board.querySelectorAll(".event")) cardObserver.observe(card);
  }

  // 카드의 사진 버튼은 기본 엔진에서 사건 상세를 연다.
  // 이집트 페이지에서는 사진 자체를 크게 보여주도록 가로챈다.
  function wirePhotoLightbox() {
    const dialog = document.getElementById("photo-dialog");
    const image = document.getElementById("photo-image");
    const titleEl = document.getElementById("photo-title");
    const captionEl = document.getElementById("photo-caption");
    const closeBtn = document.getElementById("photo-close");
    if (!dialog || !image) return;

    for (const button of board.querySelectorAll(".image-thumb")) {
      if (button.dataset.photoWired) continue;
      button.dataset.photoWired = "1";
      const card = button.closest(".event");
      const event = card && config.events.find((e) => e.id === card.dataset.eventId);
      if (!event || !event.image) continue;
      button.setAttribute("aria-label", `${event.title} 사진 크게 보기`);
      const text = button.querySelector("span");
      if (text) text.textContent = "사진 크게 보기";
      button.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        image.src = event.image;
        image.alt = event.imageAlt || event.title;
        titleEl.textContent = event.imageAlt || event.title;
        captionEl.textContent = event.imageNote || event.imageAlt || "";
        if (typeof dialog.showModal === "function") dialog.showModal();
      }, true);
    }

    if (closeBtn && !closeBtn.dataset.wired) {
      closeBtn.dataset.wired = "1";
      closeBtn.addEventListener("click", () => dialog.close());
    }
    if (!dialog.dataset.wired) {
      dialog.dataset.wired = "1";
      // 사진 바깥을 누르면 닫는다.
      dialog.addEventListener("click", (ev) => {
        if (ev.target === dialog) dialog.close();
      });
    }
  }

  // 확대창에서 끌어서 이동하고 휠·버튼으로 확대·축소한다.
  function enablePanZoom(svg) {
    const base = { x: 0, y: 0, w: MAP_W, h: MAP_H };
    const view = { ...base };
    const MIN_W = MAP_W / 8;        // 최대 8배까지 확대
    const MAX_W = MAP_W * 2.5;      // 원본보다 더 축소해 주변까지 볼 수 있게
    // viewBox 를 좁히면 안의 모든 것이 같은 배율로 커진다.
    // 글자와 마커는 화면상 크기를 유지해야 읽히므로 배율의 역수를 곱해 되돌린다.
    const applyScaleComp = () => {
      const k = view.w / base.w;
      for (const t of svg.querySelectorAll(".place-label")) {
        t.style.fontSize = `${15 * k}px`;
        t.style.strokeWidth = `${3.5 * k}`;
      }
      for (const g of svg.querySelectorAll(".map-place")) {
        const mark = g.querySelector(".place-mark");
        if (mark) mark.style.strokeWidth = `${1 * k}`;
      }
      for (const c of svg.querySelectorAll(".map-country")) {
        c.style.strokeWidth = `${0.5 * k}`;
      }
      for (const n of svg.querySelectorAll(".map-nile")) n.style.strokeWidth = `${2.2 * k}`;
      for (const c of svg.querySelectorAll(".map-canal")) c.style.strokeWidth = `${1.6 * k}`;
    };
    const apply = () => {
      svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
      applyScaleComp();
    };
    const clamp = () => {
      view.w = Math.min(MAX_W, Math.max(MIN_W, view.w));
      view.h = view.w * (base.h / base.w);
      // 축소해서 지도보다 넓어지면 가운데에 두고, 아니면 지도 안으로 가둔다.
      if (view.w >= base.w) {
        view.x = (base.w - view.w) / 2;
      } else {
        view.x = Math.min(base.w - view.w, Math.max(0, view.x));
      }
      if (view.h >= base.h) {
        view.y = (base.h - view.h) / 2;
      } else {
        view.y = Math.min(base.h - view.h, Math.max(0, view.y));
      }
    };
    const zoomAt = (factor, cx, cy) => {
      const nw = view.w * factor;
      const ratio = nw / view.w;
      view.x = cx - (cx - view.x) * ratio;
      view.y = cy - (cy - view.y) * ratio;
      view.w = nw;
      clamp();
      apply();
    };
    const toLocal = (ev) => {
      const r = svg.getBoundingClientRect();
      return {
        x: view.x + ((ev.clientX - r.left) / r.width) * view.w,
        y: view.y + ((ev.clientY - r.top) / r.height) * view.h
      };
    };

    svg.style.touchAction = "none";
    svg.style.cursor = "grab";
    // 끌 때 지도 안의 지명 글자가 선택되지 않도록 막는다.
    svg.style.userSelect = "none";
    svg.style.webkitUserSelect = "none";
    svg.setAttribute("draggable", "false");

    let dragging = false;
    let last = null;
    svg.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      dragging = true;
      last = toLocal(ev);
      svg.style.cursor = "grabbing";
      svg.setPointerCapture(ev.pointerId);
    });
    // 드래그로 인한 선택을 원천 차단
    svg.addEventListener("selectstart", (ev) => ev.preventDefault());
    svg.addEventListener("dragstart", (ev) => ev.preventDefault());
    svg.addEventListener("pointermove", (ev) => {
      if (!dragging || !last) return;
      const now = toLocal(ev);
      view.x -= now.x - last.x;
      view.y -= now.y - last.y;
      clamp();
      apply();
    });
    const stop = (ev) => {
      dragging = false;
      last = null;
      svg.style.cursor = "grab";
      if (ev && ev.pointerId !== undefined && svg.hasPointerCapture && svg.hasPointerCapture(ev.pointerId)) {
        svg.releasePointerCapture(ev.pointerId);
      }
    };
    svg.addEventListener("pointerup", stop);
    svg.addEventListener("pointercancel", stop);
    svg.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      const at = toLocal(ev);
      zoomAt(ev.deltaY > 0 ? 1.18 : 0.85, at.x, at.y);
    }, { passive: false });

    // 확대·축소 버튼
    const zin = document.getElementById("mapzoom-in");
    const zout = document.getElementById("mapzoom-out");
    const zreset = document.getElementById("mapzoom-reset");
    const center = () => ({ x: view.x + view.w / 2, y: view.y + view.h / 2 });
    if (zin) zin.onclick = () => { const c = center(); zoomAt(0.75, c.x, c.y); };
    if (zout) zout.onclick = () => { const c = center(); zoomAt(1.33, c.x, c.y); };
    if (zreset) zreset.onclick = () => { Object.assign(view, base); apply(); };

    apply();
  }

  // 지도를 누르면 크게 본다.
  function wireMapZoom() {
    const frame = document.querySelector(".egypt-map-frame");
    const dialog = document.getElementById("mapzoom-dialog");
    const target = document.getElementById("mapzoom-body");
    const closeBtn = document.getElementById("mapzoom-close");
    if (!frame || !dialog || !target) return;

    if (!frame.dataset.zoomWired) {
      frame.dataset.zoomWired = "1";
      frame.setAttribute("role", "button");
      frame.setAttribute("tabindex", "0");
      frame.setAttribute("aria-label", "지도 크게 보기");
      const open = () => {
        const svg = frame.querySelector("svg");
        if (!svg) return;
        const clone = svg.cloneNode(true);
        target.replaceChildren(clone);
        enablePanZoom(clone);
        if (typeof dialog.showModal === "function") dialog.showModal();
      };
      frame.addEventListener("click", open);
      frame.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(); }
      });
    }
    if (closeBtn && !closeBtn.dataset.wired) {
      closeBtn.dataset.wired = "1";
      closeBtn.addEventListener("click", () => dialog.close());
    }
    if (!dialog.dataset.wired) {
      dialog.dataset.wired = "1";
      dialog.addEventListener("click", (ev) => { if (ev.target === dialog) dialog.close(); });
    }
  }

  function init() {
    renderMap();
    renderRail();
    wirePhotoLightbox();
    observeCards();
    wireMapZoom();
    updateHud();
    updateHudVisibility();
  }

  // 엔진이 카드를 다 그린 뒤에 레일을 만든다.
  if (board.querySelector(".event")) {
    init();
  } else {
    const observer = new MutationObserver(() => {
      if (board.querySelector(".event")) {
        observer.disconnect();
        init();
      }
    });
    observer.observe(board, { childList: true, subtree: true });
  }

  // scroll 이벤트와 IntersectionObserver 가 모두 오지 않는 환경이 있어
  // 스크롤 위치를 짧은 주기로 직접 확인해 갱신한다. 위치가 그대로면 아무 일도 하지 않는다.
  let lastScrollY = -1;
  setInterval(() => {
    if (window.scrollY === lastScrollY) return;
    lastScrollY = window.scrollY;
    updateHud();
    updateHudVisibility();
  }, 120);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    renderMap();
    renderRail();
    observeCards();
    updateHud();
  }, { passive: true });
})();
