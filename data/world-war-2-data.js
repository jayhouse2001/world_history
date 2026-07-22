const lanes = [
      {id:"west",name:"유럽 서부",bounds:[[-7,43],[18,58]]},
      {id:"east",name:"유럽 동부",bounds:[[8,34],[50,69]]},
      {id:"africa",name:"북아프리카·지중해",bounds:[[-12,25],[31,46]]},
      {id:"pacific",name:"아시아·태평양",bounds:[[100,-12],[-145,55]],rotate:[-160,0]}
    ];
const events = [
      {
        id:"pacific-china", theater:"pacific", sortDate:"1937-07-07",
        date:"1937년 7월 7일 이후", title:"중일전쟁 확대",
        summary:"루거우차오 사건 뒤 전쟁이 전면화되고 일본군이 중국 해안과 주요 도시로 진격.",
        mapDesign:"war-v1",
        mapNote:"현대 국경 기준 · 국가색은 교전 진영, 진격 방향은 개략 표시",
        mapView:[[112,20],[136,20],[136,42],[112,42]],
        countrySides:{"156":"allied","392":"axis"},
        routes:[
          ["규슈",130.5,32.5,"상하이",121.47,31.23,"axis","naval"],
          ["상하이",121.47,31.23,"난징",118.8,32.06,"axis","land"]
        ],
        units:[
          {type:"ship",side:"axis",at:[124.8,31.7],heading:255,label:"일본 함대",showLabel:false},
          {type:"landing",side:"axis",at:[121.8,31.05],heading:270,label:"상륙부대",showLabel:false},
          {type:"tank",side:"axis",at:[120.15,31.75],heading:245,label:"지상군",showLabel:false}
        ],
        legend:{
          title:"표현 범례",
          territories:[{side:"allied",label:"중국 측 지역"},{side:"axis",label:"일본 측 지역"}],
          showControl:false
        }
      },
      {
        id:"east-poland", theater:"east", sortDate:"1939-09-01",
        date:"1939년 9월 1일·17일", title:"폴란드 침공",
        summary:"독일은 1일 서쪽에서, 소련은 17일 동쪽에서 폴란드로 진격.",
        mapDesign:"war-v1",
        mapNote:"1938년 역사 경계 · 1939년 9월 28일 독·소 분할선(나레프·부크·산강) 개략 · 강: Natural Earth 1:50m",
        mapView:[[10,47],[30,47],[30,56],[10,56]],
        countrySides:{"276":"axis","616":"allied","703":"axis","112":"soviet","643":"soviet","804":"soviet","826":"allied","250":"allied"},
        historicalPartitions:[{
          featureName:"Poland",westSide:"axis",eastSide:"soviet",
          divider:[[24.15,55.25],[23.55,54.15],[22.95,53.55],[23.45,52.15],[23.25,51.15],[22.65,50.35],[22.75,48.55]],
          labels:[{text:"독일 점령 지역",at:[20.25,51.35]},{text:"소련 점령 지역",at:[25.35,51.65]}]
        }],
        routes:[
          ["베를린",13.41,52.52,"바르샤바",21.01,52.23,"axis","land"],
          ["민스크",27.56,53.9,"브레스트",23.69,52.1,"soviet","land"]
        ],
        units:[
          {type:"tank",side:"axis",at:[17.8,52.25],heading:90,label:"독일 기갑",showLabel:false},
          {type:"bomber",side:"axis",at:[19.3,50.7],heading:85,label:"독일 공군",showLabel:false},
          {type:"tank",side:"soviet",at:[25.7,53.15],heading:270,label:"소련 기갑",showLabel:false}
        ],
        legend:{
          title:"표현 범례",
          territories:[{side:"axis",label:"독일 점령 지역"},{side:"soviet",label:"소련 점령 지역"},{side:"allied",label:"연합국(영·프)"}],
          routes:[{side:"axis",label:"독일군 진격"},{side:"soviet",label:"소련군 진격"}],
          units:[{type:"tank",side:"axis",label:"독일 기갑"},{type:"bomber",side:"axis",label:"독일 폭격기"},{type:"tank",side:"soviet",label:"소련 기갑"}],
          colors:[{side:"axis",label:"주황: 독일군"},{side:"soviet",label:"적색: 소련군"}]
        }
      },
      {
        id:"east-winter", theater:"east", sortDate:"1939-11-30",
        date:"1939년 11월 30일~1940년 3월 13일", title:"겨울전쟁",
        summary:"소련이 핀란드를 공격하고 강화 조약으로 카렐리야 일부를 획득.",
        mapDesign:"war-v1",
        mapNote:"현대 국경 기준 · 국가색은 교전 진영, 진격 방향은 개략 표시",
        mapView:[[19,57],[34,57],[34,66.5],[19,66.5]],
        countrySides:{"246":"finnish","643":"soviet"},
        routes:[["레닌그라드",30.32,59.93,"비푸리",28.75,60.71,"soviet","land"]],
        units:[
          {type:"tank",side:"soviet",at:[29.75,60.15],heading:315,label:"소련 기갑",showLabel:false},
          {type:"bomber",side:"soviet",at:[28.9,61.25],heading:325,label:"소련 공군",showLabel:false}
        ],
        legend:{
          title:"표현 범례",
          territories:[{side:"finnish",label:"핀란드 지역"},{side:"soviet",label:"소련 지역"}],
          routes:[{side:"soviet",label:"소련군 진격"}],
          units:[{type:"tank",side:"soviet",label:"소련 기갑"},{type:"bomber",side:"soviet",label:"소련 폭격기"}],
          colors:[{side:"soviet",label:"적색: 소련군"}]
        }
      },
      {id:"africa-italy-egypt",theater:"africa",sortDate:"1940-09-13",date:"1940년 9월 13일",title:"이탈리아군의 이집트 침공",summary:"리비아의 이탈리아군이 이집트로 진격했지만 시디바라니 부근에서 멈춤.",routes:[["토브루크",23.96,32.08,"시디바라니",25.93,31.61]]},
      {id:"west-ardennes",theater:"west",sortDate:"1940-05-10",date:"1940년 5월 10일",title:"아르덴 돌파",summary:"독일군이 저지대 국가를 공격하고 스당을 거쳐 프랑스 북부로 진격.",routes:[["쾰른",6.96,50.94,"스당",4.94,49.7],["스당",4.94,49.7,"파리",2.35,48.86]]},
      {id:"west-dunkirk",theater:"west",sortDate:"1940-05-26",date:"1940년 5월 26일~6월 4일",title:"덩케르크 철수",summary:"포위된 영국·프랑스 연합군 주력이 영국 본토로 철수.",routes:[["덩케르크",2.38,51.03,"도버",1.31,51.13]]},
      {id:"west-france",theater:"west",sortDate:"1940-06-22",date:"1940년 6월 22일",title:"프랑스 휴전",summary:"프랑스가 독일과 휴전하고 북부 점령지와 남부 비시 정부로 나뉨.",routes:[["파리",2.35,48.86,"비시",3.43,46.13]]},
      {id:"west-britain",theater:"west",sortDate:"1940-07-10",date:"1940년 7월 10일~10월 31일",title:"영국 본토 항공전",summary:"독일 공군의 영국 제공권 장악 시도가 실패.",routes:[["칼레",1.86,50.95,"런던",-.13,51.51]]},
      {id:"africa-compass",theater:"africa",sortDate:"1940-12-09",date:"1940년 12월 9일~1941년 2월 9일",title:"컴퍼스 작전",summary:"영국군이 이탈리아군을 격파하고 이집트에서 리비아 동부까지 진격.",routes:[["시디바라니",25.93,31.61,"벵가지",20.07,32.12]]},
      {id:"africa-rommel",theater:"africa",sortDate:"1941-02-12",date:"1941년 2월 12일",title:"롬멜의 리비아 도착",summary:"롬멜이 리비아에 도착하고 독일 아프리카 군단 증원이 이어짐.",routes:[["나폴리",14.27,40.85,"트리폴리",13.19,32.89]]},
      {id:"west-lendlease",theater:"west",sortDate:"1941-03-11",date:"1941년 3월 11일",title:"미국 무기대여법",summary:"미국이 영국을 비롯한 연합국에 대규모 군수 지원을 제공할 법적 기반을 마련.",routes:[]},
      {id:"atlantic-begins",theater:"west",sortDate:"1939-09-03",date:"1939년 9월 3일~",title:"대서양 전투 개시 · U보트전 시작",summary:"개전 첫날 독일 U보트가 여객선 아테니아호를 격침하며 6년에 걸친 대서양 전투가 시작됨.",detail:"제2차 세계대전 개전 당일인 1939년 9월 3일, U-30이 여객선 SS 아테니아호를 격침하며 대서양 전투가 시작됐다. 이후 독일 U보트는 영국으로 향하는 대서양 호송선단을 끊어 섬나라 영국을 고사시키려 했고, 연합군은 이를 지키려 6년간 싸웠다. 회고록 '강철의 관'은 이 대서양 전투 한복판에 있던 한 독일 U보트 승조원의 기록이다.",routes:[["독일 기지",8.0,54.0,"북대서양 호송로",-25,53,"uboat","uboat"]]},
      {id:"uboat-first",theater:"west",sortDate:"1941-04-01",date:"1941년 4월",title:"U보트 첫 출항 · 대서양의 '행복한 시절'",series:"ironcoffins",episode:"입문",summary:"헤르베르트 베르너가 U-557의 2등 당직사관으로 첫 대서양 초계에 나섬. 프랑스 기지에서 출격해 호송선단을 사냥하던 독일 U보트의 전성기.",detail:"헤르베르트 베르너의 회고록 '강철의 관(Iron Coffins)' 시작. 1941년 4월, 스무 살의 베르너가 U-557(Type VIIC)의 2등 당직사관으로 처음 바다에 나선다. 프랑스 함락(1940) 뒤 독일 U보트는 로리앙·브레스트 등 비스케이만 기지에서 출격해 북대서양 호송선단을 사냥했고, 이 시기를 '행복한 시절(Happy Time)'이라 불렀다. 손실은 적고 격침은 많던, U보트가 사냥꾼이던 시절.",routes:[["로리앙",-3.368,47.727,"북대서양 초계",-20,50,"uboat","uboat"]]},
      {id:"uboat-u230",theater:"west",sortDate:"1943-02-11",date:"1943년 2월 11일~3월 31일",title:"U-230 1차 초계 · SC121 늑대떼 공격",series:"ironcoffins",episode:"1차 초계",summary:"베르너가 U-230의 1등 당직사관으로 첫 초계에 나서 북대서양 호송선단 SC121을 늑대떼로 공격하고 브레스트로 귀항.",detail:"1942년 10월 킬에서 취역한 U-230(지크만 함장)에 1등 당직사관으로 승선한 베르너는 1943년 2월 11일 베르겐을 떠나 첫 초계에 나선다. 3월 6~10일, 26척의 U보트 늑대떼('베스트마르크'·'오스트마르크')가 느린 동향 호송선단 SC121을 북대서양 사각지대에서 덮쳐 상선 12~14척을 격침한다. U-230도 3월 7일 상선 한 척을 격침. 폭풍우 속 이 첫 전투에서 배가 해저에 처박혀 16시간을 사투한 일화가 유명하다. 3월 31일 브레스트 귀항.",routes:[["베르겐",5.32,60.39,"SC121 (사각지대)",-20,50,"uboat","uboat"],["SC121 (사각지대)",-20,50,"브레스트",-4.523,48.366,"uboat","uboat"]]},
      {id:"uboat-biscay",theater:"west",sortDate:"1943-07-01",date:"1943년 4~8월",title:"비스케이만 통과 위기",series:"ironcoffins",episode:"통과 지옥",summary:"연합군의 '비스케이만 공세'로 기지를 드나드는 U보트가 초계기의 표적이 됨. 잠항 통과와 대공포 사투가 강요됨.",detail:"1943년 4월 개시된 RAF 연안사령부의 '비스케이만 공세(Operation Derange)'는 센티미터파 레이더를 단 장거리 초계기 약 75대로 기지 출입 U보트를 사냥했다. 4~8월에만 U보트 26척이 만에서 격침됐다. 되니츠는 잠항 통과·집단 통과·부상 대공전을 명령했고, U-230도 4월과 7월 출항 때 이 죽음의 통로를 건넜다. 회고록에서 가장 공포스러운 장면 중 하나.",routes:[["브레스트",-4.523,48.366,"대서양 출구",-8,46,"uboat","uboat"]]},
      {id:"uboat-bermuda",theater:"west",sortDate:"1943-07-05",date:"1943년 7월 5일~9월 8일",title:"U-230 3차 초계 · 서대서양",series:"ironcoffins",episode:"3차 초계",summary:"U-230이 미국 동해안·버뮤다 북방까지 진출했으나 성과 없이 브레스트로 귀항. 판세가 기운 뒤의 헛된 원정.",detail:"7월 5일 브레스트를 떠난 U-230은 뉴잉글랜드 근해와 버뮤다 북방(약 34°N)까지 진출해 보급 잠수함에서 연료를 받으며 오래 초계했으나 단 한 척도 격침하지 못하고 9월 8일 브레스트로 돌아온다. 검은 5월 이후 U보트가 사냥감으로 전락한 현실을 보여주는, 길고 소득 없는 원정.",routes:[["브레스트",-4.523,48.366,"버뮤다 북방",-65,34,"uboat","uboat"]]},
      {id:"uboat-gibraltar",theater:"west",sortDate:"1943-11-22",date:"1943년 11월 22일~12월 16일",title:"U-230 지브롤터 돌파 · 지중해",series:"ironcoffins",episode:"4차 초계",summary:"U-230이 강한 해류와 연합군 초계망을 뚫고 지브롤터 해협을 강행 돌파해 툴롱에 도착. 베르너는 이 무렵 함을 떠남.",detail:"11월 22일 브레스트를 떠난 U-230은 조류가 거세고 연합군 항공·해상 초계가 극심한 지브롤터 해협을 강행 돌파해 12월 16일 지중해의 툴롱에 도착한다. 베르너는 이 전후로 함장 교육을 위해 U-230을 떠난다. (U-230은 이후 1944년 8월 21일 툴롱 앞 생망드리에에서 자침 — 이때 베르너는 이미 하함한 뒤였다.)",routes:[["브레스트",-4.523,48.366,"지브롤터 해협",-5.5,36.0,"uboat","uboat"],["지브롤터 해협",-5.5,36.0,"툴롱",5.9,43.1,"uboat","uboat"]]},
      {id:"uboat-blackmay",theater:"west",sortDate:"1943-05-24",date:"1943년 5월 · 검은 5월",title:"검은 5월 · U보트의 몰락",series:"ironcoffins",episode:"전환점",summary:"단 한 달에 U보트 약 41척이 격침당하며 사냥꾼이 사냥감으로 전락. 되니츠가 북대서양에서 U보트를 철수시킴.",detail:"1943년 5월, 대서양 전투의 결정적 전환점 '검은 5월(Black May)'. 연합군의 장거리 초계기(B-24), 호위항모, 센티미터파 레이더, HF/DF, 에니그마 해독이 한꺼번에 위력을 발휘하며 '항공 사각지대'가 닫혔다. 이 한 달에 U보트 약 41척(전력의 4분의 1)이 격침됐고, 되니츠는 5월 24일 북대서양에서 U보트를 철수시킨다. 이후 U보트는 다시는 주도권을 회복하지 못했다. '강철의 관'이라는 제목이 현실이 된 시점.",routes:[["북대서양 사각지대",-35,55,"철수",-4.523,48.366,"uboat","uboat"]]},
      {id:"uboat-u415",theater:"west",sortDate:"1944-04-17",date:"1944년 4월 17일~",title:"U-415 함장 취임 · 노르망디 대응 출격",series:"ironcoffins",episode:"함장",summary:"베르너가 U-415의 함장으로 첫 지휘. D-Day 직후 상륙 저지 출격에 나서 초계기와 사투를 벌이며 리버레이터를 격추.",detail:"1944년 4월 17일 베르너는 U-415의 함장으로 첫 지휘를 맡아 브레스트에서 출격한다. 6월 6일 노르망디 상륙 직후, 얕은 서부 해협으로 밀려 들어가 반복되는 공습을 견디며 상륙 저지 작전에 투입된다. 6월 7일 대공전 중 U-415의 대공포가 RAF 224비행대의 B-24 리버레이터를 격추하기도 했다. 슈노르헬로 잠항 통과하며 버텼다.",routes:[["브레스트",-4.523,48.366,"서부 해협",-5.5,47.5,"uboat","uboat"]]},
      {id:"uboat-u415-sunk",theater:"west",sortDate:"1944-07-14",date:"1944년 7월 14일",title:"U-415 기뢰 격침 · 브레스트",series:"ironcoffins",episode:"함장",summary:"U-415가 브레스트 항구의 공중 투하 기뢰에 격침됨. 베르너는 생존해 U-953으로 옮김.",detail:"1944년 7월 14일, U-415가 브레스트 앞바다 기뢰원('Jellyfish 5')의 공중 투하 기뢰에 부딪혀 침몰한다. 2명이 죽고 약 14명이 다쳤으나 베르너는 살아남는다. 생존 승조원과 함께 U-953으로 옮겨 지휘를 잇는다.",routes:[["서부 해협",-5.5,47.5,"브레스트",-4.55,48.35,"uboat","uboat"]]},
      {id:"uboat-escape",theater:"west",sortDate:"1944-08-19",date:"1944년 8월",title:"프랑스 기지 탈출 · U-953",series:"ironcoffins",episode:"탈출",summary:"연합군이 브르타뉴를 장악하자 U-953이 포위된 브레스트를 빠져나와 라로셸을 거쳐 노르웨이로 탈출.",detail:"1944년 8월 베르너가 U-953의 함장이 된 직후, 연합 지상군이 브르타뉴를 휩쓸며 브레스트가 포위된다. U-953은 다른 보트들과 함께 브레스트를 탈출해 8월 19일 라팔리스(라로셸)에 도착하고, 8월 말 슈노르헬로 잠항한 채 연합군 항공·해상 봉쇄를 뚫고 노르웨이로 향한다. 회고록 마지막 장의 핵심인 필사의 탈출.",routes:[["브레스트",-4.523,48.366,"라로셸(라팔리스)",-1.228,46.158,"uboat","uboat"],["라로셸(라팔리스)",-1.228,46.158,"노르웨이",5.32,60.39,"uboat","uboat"]]},
      {id:"uboat-surrender",theater:"west",sortDate:"1945-05-09",date:"1945년 5월",title:"U-953 노르웨이 탈출·항복",series:"ironcoffins",episode:"종전",summary:"베르너가 마지막으로 지휘한 U-953이 함락 직전의 프랑스 기지를 떠나 노르웨이로 탈출, 종전과 함께 항복.",detail:"1944년 8월 베르너는 U-953의 함장이 되어, D-Day 이후 봉쇄된 비스케이만을 빠져나와 노르웨이로 탈출한다. 1945년 5월 되니츠의 항복 명령이 전달되고, U-953은 종전 시점까지 살아남은 극소수의 실전 U보트 중 하나로 노르웨이에서 항복한다. 이후 영국으로 인도됐다. 베르너의 전쟁이 끝난다.",routes:[["브레스트",-4.523,48.366,"노르웨이 베르겐",5.32,60.39,"uboat","uboat"]]},
      {id:"atlantic-ends",theater:"west",sortDate:"1945-05-08",date:"1945년 5월 8일",title:"대서양 전투 종결",summary:"독일 항복과 함께 6년에 걸친 대서양 전투가 끝남. 전쟁 중 독일 U보트 약 3분의 2가 격침되고 승조원 대부분이 전사.",detail:"1945년 5월 독일 항복으로 대서양 전투가 종결됐다. 전쟁 기간 독일이 투입한 U보트 약 1,150척 중 800척 가까이가 격침됐고, U보트 승조원 약 4만 명 중 3만 명 이상이 전사해 전 병과를 통틀어 가장 높은 사망률을 기록했다. '강철의 관'이라는 별명 그대로였다.",routes:[]},
      {id:"africa-rommel-east",theater:"africa",sortDate:"1941-03-24",date:"1941년 3월 24일",title:"롬멜의 동진",summary:"독일·이탈리아군이 리비아에서 이집트 국경까지 진격.",routes:[["엘아게일라",20.07,30.18,"토브루크",23.96,32.08],["토브루크",23.96,32.08,"살룸",25.14,31.55]]},
      {id:"east-balkans",theater:"east",sortDate:"1941-04-06",date:"1941년 4월 6일~6월 1일",title:"발칸반도 공략",summary:"독일군이 유고슬라비아와 그리스를 거쳐 크레타로 진격.",routes:[["빈",16.37,48.21,"베오그라드",20.46,44.82],["베오그라드",20.46,44.82,"아테네",23.73,37.98],["아테네",23.73,37.98,"크레타",24.81,35.24]]},
      {id:"east-barbarossa",theater:"east",sortDate:"1941-06-22",date:"1941년 6월 22일",title:"바르바로사 작전",summary:"독일과 추축군이 발트해에서 흑해에 이르는 전선에서 소련을 침공.",routes:[["바르샤바",21.01,52.23,"스몰렌스크",32.05,54.78],["루마니아",26.1,44.43,"키이우",30.52,50.45]]},
      {id:"west-atlantic-charter",theater:"west",sortDate:"1941-08-14",date:"1941년 8월 14일",title:"대서양 헌장",summary:"루스벨트와 처칠이 전후 국제질서의 공동 원칙을 발표.",routes:[]},
      {id:"east-leningrad",theater:"east",sortDate:"1941-09-08",date:"1941년 9월 8일",title:"레닌그라드 포위 시작",summary:"독일군과 핀란드군의 압박으로 레닌그라드의 육상 보급로가 차단.",routes:[["프스코프",28.33,57.82,"레닌그라드",30.32,59.93]]},
      {id:"tiger-barbarossa",theater:"east",sortDate:"1941-06-22",date:"1941년 6월 22일",title:"카리우스의 첫 전투 · 38(t) 장전수",series:"tiger",episode:"입문",summary:"오토 카리우스가 20 기갑사단 38(t) 전차의 장전수로 바르바로사 개시일에 첫 실전을 치름. 동프로이센 수바우키 국경에서 소련으로 진격.",detail:"회고록 '진흙 속의 호랑이(Tiger im Schlamm)'의 시작. 1922년생 오토 카리우스는 1941년 6월 22일 바르바로사 개시일, 20 기갑사단(중부집단군)의 체코제 경전차 Panzer 38(t)의 장전수로 첫 실전에 나선다. 동프로이센 수바우키 국경에서 리투아니아로 밀고 들어가 비테프스크·스몰렌스크 방면으로 진격했다. 훗날 150대 이상을 격파하는 전차 에이스의 출발점.",routes:[["수바우키 국경",22.9,54.1,"비테프스크",30.2,55.2,"tiger","tiger"]]},
      {id:"tiger-deploy",theater:"east",sortDate:"1943-07-01",date:"1943년 1월~7월",title:"티거 전차대 · 502 중전차대대",series:"tiger",episode:"티거",summary:"카리우스가 502 중전차대대로 옮겨 티거 I 전차 소대장이 됨. 1943년 7월 레닌그라드 전선에 투입.",detail:"1943년 1월 보충대대에서 처음 티거 I를 접한 카리우스는 제502 중전차대대(schwere Panzer-Abteilung 502) 2중대에 배속된다. 7월 북부집단군의 레닌그라드·볼호프 전선에 투입되어 소대장으로 싸운다. 이때부터 그의 이름이 알려진 발트·레닌그라드 전선의 티거 전투가 시작된다.",routes:[["프스코프",28.33,57.82,"볼호프 전선",32.3,59.9,"tiger","tiger"]]},
      {id:"east-moscow",theater:"east",sortDate:"1941-10-02",date:"1941년 10월 2일",title:"모스크바 공방전",summary:"독일군의 태풍 작전이 모스크바 앞에서 소련의 저항과 겨울 반격에 막힘.",routes:[["스몰렌스크",32.05,54.78,"모스크바",37.62,55.75]]},
      {id:"africa-crusader",theater:"africa",sortDate:"1941-11-18",date:"1941년 11월 18일",title:"크루세이더 작전",summary:"연합군의 반격으로 토브루크 포위가 풀리고 롬멜군이 서부 리비아로 후퇴.",routes:[["살룸",25.14,31.55,"엘아게일라",20.07,30.18]]},
      {id:"pacific-pearl",theater:"pacific",sortDate:"1941-12-07",date:"1941년 12월 7일",title:"진주만 공격",summary:"일본 기동부대가 하와이 진주만을 기습해 미국의 태평양전쟁 참전을 불러옴.",routes:[["히토카푸만",147.63,44.98,"진주만",-157.95,21.35]]},
      {id:"pacific-philippines",theater:"pacific",sortDate:"1941-12-08",date:"1941년 12월 8일~1942년 5월 8일",title:"필리핀 전역",summary:"일본군이 루손과 민다나오로 진격해 필리핀의 미군·필리핀군을 제압.",routes:[["타이완",121,23.7,"루손",121,16],["팔라우",134.58,7.52,"민다나오",125.5,7.5]]},
      {id:"pacific-rabaul",theater:"pacific",sortDate:"1942-01-23",date:"1942년 1월 23일",title:"라바울 점령",summary:"일본군이 뉴브리튼섬 라바울을 점령해 남태평양의 주요 기지로 사용.",routes:[["트루크",151.84,7.45,"라바울",152.17,-4.2]]},
      {id:"pacific-singapore",theater:"pacific",sortDate:"1942-02-15",date:"1942년 2월 15일",title:"싱가포르 함락",summary:"말레이반도를 남하한 일본군에게 영국군이 싱가포르에서 항복.",routes:[["코타바루",102.24,6.13,"싱가포르",103.82,1.35]]},
      {id:"pacific-coral",theater:"pacific",sortDate:"1942-05-04",date:"1942년 5월 4~8일",title:"산호해 해전",summary:"미·일 항모 전력이 교전해 일본의 포트모르즈비 해상 침공 계획을 저지.",routes:[["라바울",152.17,-4.2,"산호해",154,-18]]},
      {id:"africa-gazala",theater:"africa",sortDate:"1942-05-26",date:"1942년 5월 26일~6월 21일",title:"가잘라 전투와 토브루크 함락",summary:"롬멜군이 연합군 방어선을 돌파하고 토브루크를 점령.",routes:[["가잘라",23.32,32.15,"토브루크",23.96,32.08]]},
      {id:"pacific-midway",theater:"pacific",sortDate:"1942-06-04",date:"1942년 6월 4~7일",title:"미드웨이 해전",summary:"미 해군이 일본 항공모함 네 척을 격침해 태평양의 주도권 전환점을 마련.",routes:[["일본 함대",170,30,"미드웨이",-177.37,28.21]]},
      {id:"east-caseblue",theater:"east",sortDate:"1942-06-28",date:"1942년 6월 28일",title:"청색 작전",summary:"독일군이 볼가강과 코카서스 유전을 목표로 소련 남부에서 공세를 시작.",routes:[["하르키우",36.23,49.99,"로스토프",39.7,47.24],["로스토프",39.7,47.24,"마이코프",40.1,44.61]]},
      {id:"africa-first-elalamein",theater:"africa",sortDate:"1942-07-01",date:"1942년 7월 1~27일",title:"제1차 엘 알라메인 전투",summary:"연합군이 이집트 깊숙이 진격한 롬멜군을 엘 알라메인에서 저지.",routes:[["메르사마트루",27.24,31.35,"엘알라메인",28.95,30.84]]},
      {id:"pacific-guadalcanal",theater:"pacific",sortDate:"1942-08-07",date:"1942년 8월 7일~1943년 2월 9일",title:"과달카날 전역",series:"pacific",episode:"1~2",summary:"미 해병대 상륙 뒤 수개월의 육해공전 끝에 일본군이 섬에서 철수.",detail:"[1화 Guadalcanal / 2화 Basilone] 미 제1해병사단이 과달카날에 상륙해 헨더슨 비행장을 확보한다. 1화는 로버트 레키의 시선으로 정글전과 알리게이터 크리크(테나루강) 전투를, 2화는 존 배실론이 기관총으로 일본군의 야간 인해 돌격을 저지해 명예훈장을 받는 실화를 그린다. 보급이 끊긴 채 말라리아와 굶주림 속에 버틴 태평양전쟁 최초의 미군 대반격.",routes:[["에스피리투산토",167.18,-15.38,"과달카날",160.15,-9.58]]},
      {id:"west-dieppe",theater:"west",sortDate:"1942-08-19",date:"1942년 8월 19일",title:"디에프 기습",summary:"연합군이 프랑스 디에프에 상륙했으나 큰 피해를 입고 철수.",routes:[["뉴헤이븐",.05,50.8,"디에프",1.08,49.92]]},
      {id:"east-stalingrad",theater:"east",sortDate:"1942-08-23",date:"1942년 8월 23일~1943년 2월 2일",title:"스탈린그라드 전투",summary:"독일군이 시가전을 벌였으나 소련군의 포위 뒤 제6군이 항복.",routes:[["하르키우",36.23,49.99,"스탈린그라드",44.5,48.71]]},
      {id:"africa-second-elalamein",theater:"africa",sortDate:"1942-10-23",date:"1942년 10월 23일~11월 11일",title:"제2차 엘 알라메인 전투",summary:"몽고메리의 영국 제8군이 롬멜군을 격파해 서쪽으로 후퇴시킴.",routes:[["엘알라메인",28.95,30.84,"메르사마트루",27.24,31.35]]},
      {id:"africa-torch",theater:"africa",sortDate:"1942-11-08",date:"1942년 11월 8일",title:"횃불 작전",summary:"미·영 연합군이 모로코와 알제리에 상륙해 추축군을 동서에서 압박.",routes:[["대서양",-10,34,"카사블랑카",-7.59,33.57],["지중해",2,38,"알제",3.06,36.75]]},
      {id:"east-uranus",theater:"east",sortDate:"1942-11-19",date:"1942년 11월 19일",title:"천왕성 작전",faction:"allied",summary:"소련군이 스탈린그라드 북서와 남쪽에서 돌파해 독일 제6군을 포위.",routes:[["세라피모비치",42.74,49.58,"칼라치",43.53,48.69],["사르파",44.41,48.38,"칼라치",43.53,48.69]]},
      {id:"west-casablanca",theater:"west",sortDate:"1943-01-14",date:"1943년 1월 14~24일",title:"카사블랑카 회담",summary:"루스벨트와 처칠이 추축국의 무조건 항복 원칙과 다음 작전을 협의.",routes:[]},
      {id:"usaaf-bombing-begins",theater:"west",sortDate:"1942-08-17",date:"1942년 8월 17일",title:"미국의 유럽 주간폭격 개시",summary:"미 제8공군이 프랑스 루앙을 첫 B-17 폭격하며 유럽에서 미국의 주간 정밀폭격이 시작됨. 영국 공군의 야간 폭격과 함께 독일을 24시간 압박.",detail:"1942년 8월 17일, 미 제8공군의 B-17 12대가 독일 점령하 프랑스 루앙-소트빌 조차장을 폭격하며 유럽에서 미국의 첫 주간 정밀폭격이 시작됐다. 영국 공군(RAF)의 야간 지역폭격과 미군의 주간 정밀폭격이 짝을 이뤄 독일 산업을 24시간 두들기는 '연합 폭격 공세'가 이때부터 본격화됐다. 드라마 '마스터스 오브 디 에어'의 100폭격전대는 이 흐름 속에 1943년 투입된다.",routes:[["영국 기지",0.5,52.3,"루앙",1.09,49.44,"mota","air"]]},
      {id:"mota-bremen",theater:"west",sortDate:"1943-06-25",date:"1943년 6월~",title:"제8공군 첫 폭격 임무",series:"mota",episode:"1",summary:"미 제8공군 100폭격전대가 영국 소프 애보츠 기지에서 첫 주간 정밀폭격 임무에 나섬. 브레멘 등 독일 표적으로 출격.",detail:"[1화] 미 육군항공대 제8공군 100폭격전대('블러디 헌드레드')가 영국 이스트앵글리아의 소프 애보츠 기지에 배치된다. 호위기 없이 대낮에 독일 상공으로 날아가 B-17 폭격기로 정밀폭격을 감행하는 위험천만한 임무. 브레멘 출격에서부터 대공포와 독일 전투기에 큰 피해를 입으며, 승무원들이 처음으로 죽음을 마주한다.",routes:[["소프 애보츠",0.98,52.28,"브레멘",8.8,53.08,"mota","air"]]},
      {id:"mota-regensburg",theater:"west",sortDate:"1943-08-17",date:"1943년 8월 17일",title:"레겐스부르크 셔틀 폭격",series:"mota",episode:"2",summary:"레겐스부르크 폭격 후 북아프리카까지 날아가는 셔틀 임무. 큰 손실을 입음.",detail:"[2화] 독일 남부 레겐스부르크의 메서슈미트 공장을 폭격한 뒤, 되돌아오지 않고 그대로 남하해 북아프리카(튀니지)에 착륙하는 전례 없는 '셔틀 폭격' 임무. 장거리 비행 내내 독일 전투기의 집요한 요격을 받아 100전대는 극심한 손실을 입는다. 호위 전투기의 항속거리 한계가 여실히 드러난 임무.",routes:[["소프 애보츠",0.98,52.28,"레겐스부르크",12.1,49.02,"mota","air"],["레겐스부르크",12.1,49.02,"북아프리카",9.5,35.5,"mota","air"]]},
      {id:"mota-munster",theater:"west",sortDate:"1943-10-10",date:"1943년 10월 10일",title:"뮌스터 폭격 · 검은 주간",series:"mota",episode:"3",summary:"뮌스터 폭격에서 100폭격전대가 하루 만에 대부분의 기체를 잃는 참사를 겪음.",detail:"[3화] 뮌스터 도심을 겨냥한 폭격 임무. 이날 100폭격전대는 출격한 13대 중 한 대(로지 로젠탈의 기체)만 돌아오는 궤멸적 손실을 입는다. '블러디 헌드레드'라는 별명이 굳어진 검은 날. 이어진 '검은 주간'(슈바인푸르트 등)의 누적 손실로 주간 정밀폭격 교리 자체가 위기에 몰린다.",routes:[["소프 애보츠",0.98,52.28,"뮌스터",7.63,51.96,"mota","air"]]},
      {id:"mota-berlin",theater:"west",sortDate:"1944-03-06",date:"1944년 3월 6일",title:"베를린 대공습",series:"mota",episode:"7",summary:"P-51 무스탕의 장거리 호위 아래 제8공군이 베를린을 대규모 폭격. 독일 공군을 소모전으로 몰아넣음.",detail:"[7화] P-51 무스탕 전투기가 마침내 베를린까지 왕복 호위가 가능해지면서, 제8공군이 독일 수도 베를린을 대규모로 폭격한다. 폭격 자체보다 이를 요격하러 올라오는 독일 전투기를 무스탕으로 격멸하는 것이 목적. 독일 공군(루프트바페)의 전력이 이 소모전으로 급속히 무너지며 제공권이 연합군으로 넘어간다.",routes:[["소프 애보츠",0.98,52.28,"베를린",13.41,52.52,"mota","air"]]},
      {id:"mota-frantic",theater:"west",sortDate:"1944-06-21",date:"1944년 6월",title:"러시아 셔틀 (프랜틱 작전)",series:"mota",episode:"9",summary:"독일을 폭격한 뒤 소련 폴타바 기지까지 날아가는 미·소 합동 셔틀 폭격.",detail:"[9화] 독일 표적을 폭격한 뒤 서쪽으로 돌아오지 않고 동쪽 소련 영내 폴타바 기지에 착륙하는 프랜틱(Frantic) 셔틀 작전. 그러나 폴타바에서 독일 야간폭격기의 기습을 받아 지상의 미군기 다수가 파괴된다. 이후 종전과 함께 스탈라그 루프트 포로수용소의 승무원들이 해방되며 이야기가 마무리된다.",routes:[["소프 애보츠",0.98,52.28,"베를린",13.41,52.52,"mota","air"],["베를린",13.41,52.52,"폴타바",34.55,49.59,"mota","air"]]},
      {id:"usaaf-bombing-ends",theater:"west",sortDate:"1945-04-25",date:"1945년 4월",title:"전략폭격 종결",summary:"독일 항복을 앞두고 연합군의 전략폭격 임무가 사실상 종료됨. 폭격기 승무원의 손실률은 지상 못지않게 높았다.",detail:"1945년 4월, 폭격할 표적이 거의 남지 않으면서 연합군의 대독 전략폭격이 사실상 끝난다. 제8공군은 마지막으로 보급·인도적 임무로 전환했다. 유럽 상공 폭격기 승무원의 손실률은 지상 전투에 뒤지지 않을 만큼 높았고, 제8공군에서만 수만 명이 전사했다. '마스터스 오브 디 에어'가 그린 100폭격전대의 여정도 이 승리와 희생 위에 있었다.",routes:[]},
      {id:"east-stalingrad-end",theater:"east",sortDate:"1943-02-02",date:"1943년 2월 2일",title:"스탈린그라드 독일군 항복",faction:"allied",summary:"포위된 독일 제6군의 잔여 병력이 항복하고 남부 전선의 흐름이 소련 쪽으로 기움.",routes:[["스탈린그라드",44.5,48.71,"포로수용지",45.1,49.2]]},
      {id:"pacific-guadalcanal-end",theater:"pacific",sortDate:"1943-02-09",date:"1943년 2월 9일",title:"과달카날 전역 종료",summary:"일본군의 철수가 끝나며 연합군이 남태평양 공세의 발판을 확보.",routes:[["과달카날",160.15,-9.58,"부건빌",155.38,-6.2]]},
      {id:"africa-tunisia-end",theater:"africa",sortDate:"1943-05-13",date:"1943년 5월 13일",title:"튀니지 추축군 항복",summary:"튀니지의 독일·이탈리아군이 항복해 북아프리카 전역이 끝남.",routes:[["튀니스",10.18,36.81,"비제르테",9.87,37.27]]},
      {id:"pacific-cartwheel",theater:"pacific",sortDate:"1943-06-30",date:"1943년 6월 30일 시작",title:"카트휠 작전",summary:"연합군이 뉴기니와 솔로몬제도를 따라 진격하며 라바울을 고립시키기 시작.",routes:[["과달카날",160.15,-9.58,"부건빌",155.38,-6.2],["포트모르즈비",147.18,-9.44,"라에",146.98,-6.73]]},
      {id:"pacific-gloucester",theater:"pacific",sortDate:"1943-12-26",date:"1943년 12월 26일~1944년",title:"케이프글로스터 상륙",series:"pacific",episode:"4",summary:"미 제1해병사단이 뉴브리튼섬 케이프글로스터에 상륙해 비행장을 확보하고 라바울 고립을 도움.",detail:"[4화 Gloucester/Pavuvu/Banika] 과달카날 이후 재편성된 제1해병사단이 뉴브리튼섬 케이프글로스터에 상륙한다. 끝없는 열대 우기와 진창, 정글 속 소모전이 이어진다. 이후 부대는 후방 섬 파부부로 물러나 열악한 환경에서 재정비하며, 레키의 병원 생활과 새 인물 유진 슬레지의 참전 준비가 그려진다.",routes:[["핀슈하펜",147.85,-6.6,"케이프글로스터",148.43,-5.45,"allied","landing"]]},
      {id:"east-kursk",theater:"east",sortDate:"1943-07-05",date:"1943년 7월 5일~8월 23일",title:"쿠르스크 전투",summary:"독일의 성채 작전이 실패하고 소련군이 동부전선의 전략적 주도권을 굳힘.",routes:[["오룔",36.06,52.97,"쿠르스크",36.19,51.74],["벨고로드",36.59,50.6,"쿠르스크",36.19,51.74]]},
      {id:"africa-sicily",theater:"africa",sortDate:"1943-07-10",date:"1943년 7월 10일",title:"시칠리아 상륙",summary:"연합군이 시칠리아에 상륙해 이탈리아 본토 진격의 길을 엶.",routes:[["튀니스",10.18,36.81,"시칠리아",14.1,37.5]]},
      {id:"africa-italy",theater:"africa",sortDate:"1943-09-03",date:"1943년 9월 3일",title:"이탈리아 본토 상륙",summary:"연합군이 메시나 해협을 건너 칼라브리아에 상륙.",routes:[["메시나",15.55,38.19,"레조칼라브리아",15.65,38.11]]},
      {id:"africa-armistice",theater:"africa",sortDate:"1943-09-08",date:"1943년 9월 8일",title:"이탈리아 휴전 발표",summary:"이탈리아의 연합군과의 휴전이 발표되고 독일군이 이탈리아 주요 지역을 장악.",routes:[]},
      {id:"africa-salerno",theater:"africa",sortDate:"1943-09-09",date:"1943년 9월 9일",title:"살레르노 상륙",summary:"연합군 주력이 살레르노에 상륙해 독일군의 반격을 막고 교두보를 확보.",routes:[["시칠리아",14.1,37.5,"살레르노",14.77,40.68]]},
      {id:"east-kyiv",theater:"east",sortDate:"1943-11-06",date:"1943년 11월 6일",title:"소련군의 키이우 탈환",faction:"allied",summary:"소련군이 드니프로강을 건너 키이우를 탈환하고 서쪽으로 진격.",routes:[["쿠르스크",36.19,51.74,"키이우",30.52,50.45]]},
      {id:"pacific-tarawa",theater:"pacific",sortDate:"1943-11-20",date:"1943년 11월 20~23일",title:"타라와 전투",summary:"미 해병대가 치열한 상륙전 끝에 길버트제도의 타라와 환초를 점령.",routes:[["하와이",-157.95,21.35,"타라와",172.98,1.35]]},
      {id:"west-tehran",theater:"west",sortDate:"1943-11-28",date:"1943년 11월 28일~12월 1일",title:"테헤란 회담",summary:"미·영·소 정상이 서유럽 제2전선 개설과 전후 구상을 협의.",routes:[]},
      {id:"africa-anzio",theater:"africa",sortDate:"1944-01-22",date:"1944년 1월 22일",title:"안치오 상륙",summary:"연합군이 로마 남쪽 안치오에 상륙해 교두보를 확보했으나 진격이 지체됨.",routes:[["나폴리",14.27,40.85,"안치오",12.62,41.45]]},
      {id:"africa-rome",theater:"africa",sortDate:"1944-06-04",date:"1944년 6월 4일",title:"로마 해방",summary:"구스타프선을 돌파한 연합군이 로마에 입성하며 이탈리아 수도가 해방됨.",routes:[["안치오",12.62,41.45,"로마",12.5,41.9]]},
      {
        id:"west-normandy", theater:"west", sortDate:"1944-06-06",
        date:"1944년 6월 6일", title:"노르망디 상륙작전", series:"bob", episode:"2",
        summary:"D-Day. 미·영·캐나다 연합군이 유타·오마하·골드·주노·소드 5개 해안으로 상륙하고 공수부대가 후방에 강하.",
        detail:"[2화 Day of Days] 1944년 6월 6일 사상 최대의 상륙작전. 서쪽부터 유타(미)·오마하(미)·골드(영)·주노(캐나다)·소드(영) 5개 해안으로 상륙했고, 그중 오마하가 절벽 지형과 강한 저항으로 최대 격전지였다. 상륙에 앞서 미 82·101공수사단이 코탕탱 반도 후방(생트메르에글리즈·생트마리뒤몽)에, 영 6공수사단이 동쪽 오른강 교량 일대에 야간 강하했다. 밴드 오브 브라더스 2화는 101공수사단 이지 중대의 강하와, 윈터스 중위가 브레쿠르 저택에서 유타 해변을 포격하던 독일군 105mm 곡사포 4문을 각개격파한 실화를 그린다.",
        mapDesign:"war-v1",
        mapNote:"현대 국경 기준 · 노르망디 5개 상륙 해안과 공수 강하 개략 표시",
        mapView:[[-4.6,49.0],[1.2,49.0],[1.2,51.5],[-4.6,51.5]],
        countrySides:{"250":"axis"},
        routes:[
          ["플리머스",-4.14,50.37,"유타",-1.17,49.42,"allied","landing"],
          ["웨이머스",-2.46,50.61,"오마하",-0.87,49.37,"allied","landing"],
          ["사우샘프턴",-1.40,50.90,"골드",-0.55,49.34,"allied","landing"],
          ["포츠머스",-1.09,50.80,"주노",-0.46,49.34,"allied","landing"],
          ["뉴헤이븐",0.06,50.79,"소드",-0.29,49.3,"allied","landing"],
          ["영국 비행장",-1.9,50.95,"101·82 공수",-1.28,49.4,"bob","para"]
        ],
        units:[
          {type:"landing",side:"allied",at:[-1.17,49.5],heading:180,label:"유타",showLabel:false},
          {type:"landing",side:"allied",at:[-0.87,49.5],heading:180,label:"오마하",showLabel:false},
          {type:"landing",side:"allied",at:[-0.46,49.5],heading:180,label:"영·캐나다",showLabel:false},
          {type:"para",side:"bob",at:[-1.3,49.4],heading:0,label:"101공수",showLabel:false}
        ],
        legend:{
          title:"노르망디 상륙",
          territories:[{side:"axis",label:"독일 점령(프랑스)"}],
          routes:[{side:"allied",label:"상륙 (유타·오마하·골드·주노·소드)"},{side:"bob",label:"101·82 공수 강하"}],
          units:[{type:"landing",side:"allied",label:"상륙부대"},{type:"para",side:"bob",label:"공수부대"}],
          colors:[{side:"allied",label:"파랑: 연합군 상륙"},{side:"bob",label:"초록: 101 공수사단"}]
        }
      },
      {id:"west-carentan",theater:"west",sortDate:"1944-06-10",date:"1944년 6월 10~13일",title:"카랑탕 전투",series:"bob",episode:"3",summary:"유타·오마하 교두보를 잇는 카랑탕을 점령한 시가전.",detail:"[3화 Carentan] 유타와 오마하 두 상륙 교두보를 잇는 도로 요충지 카랑탕을 두고 벌인 시가전. 이지 중대는 총탄이 쏟아지는 교차로에서 얼어붙은 신병 블라이스 이병을 윈터스가 독려해 전진시키는 장면으로 유명하다. 마을 점령 뒤 독일군의 강력한 역습을 능선(6월 13일)에서 셔먼 전차의 지원을 받아 격퇴한다. 전투 스트레스와 리더십을 정면으로 다룬 화.",routes:[["생트마리뒤몽",-1.23,49.36,"카랑탕",-1.24,49.3,"allied","para"]]},
      {id:"tiger-narva",theater:"east",sortDate:"1944-03-17",date:"1944년 3월 17~22일",title:"나르바 전투 · 기사십자장",series:"tiger",episode:"나르바",summary:"카리우스가 티거 3대로 나르바 서쪽 렘비투 부근에서 사흘간 소련 전차 28대 등을 격파. 이 전공으로 기사십자장을 받음.",detail:"1944년 초 에스토니아 나르바 교두보에서 카리우스의 티거들이 소련군의 대공세를 막아낸다. 2월 12일 4대 격파, 모델 원수의 방문(2월 2일)으로 유명하다. 3월 17~22일 렘비투 마을 부근에서 티거 3대로 사흘간 전차 28대·돌격포 4문·야포 17문을 파괴했고, 이 전공으로 기사십자장을 받는다. 이후 실라매에로 물러나 정비.",routes:[["실라매에",27.774,59.393,"나르바(렘비투)",28.19,59.38,"tiger","tiger"]]},
      {id:"tiger-malinava",theater:"east",sortDate:"1944-07-22",date:"1944년 7월 22~24일",title:"말리나바 전차전과 중상",series:"tiger",episode:"말리나바",summary:"카리우스가 티거 단 2대로 뒤나부르크 북쪽 말리나바에서 IS-2 등 소련 전차 종대를 격파. 이틀 뒤 총 7발을 맞고 중상을 입어 동부전선을 떠남.",detail:"1944년 7월 22일, 2중대장 카리우스는 티거 8대 중 자신과 케르셔 소위의 단 2대만으로 뒤나부르크(다우가프필스) 북쪽 말리나바로 접근하는 소련 전차 종대를 좁은 외길에서 기습한다. 신형 IS-2 중전차를 포함한 다수를 20~30분 만에 격파했다. 격파 수(17~23대)는 자료마다 다투어지지만, 소수의 티거가 이룬 전설적 매복전으로 회고록의 절정이다.\n\n이틀 뒤인 7월 24일, 2중대장으로 정식 취임한 날 카리우스는 다우가프필스 부근에서 다리·팔과 등에 네 발, 목에 한 발 등 총 일곱 발을 맞고 중상을 입는다. 기적적으로 살아남지만 동부전선 일선 복무는 여기서 끝나고, 회복 뒤에는 서부전선의 야크트티거 부대로 옮긴다.",routes:[["다우가프필스",26.536,55.875,"말리나바",26.6,55.95,"tiger","tiger"]]},
      {id:"east-bagration",theater:"east",sortDate:"1944-06-22",date:"1944년 6월 22일~8월 19일",title:"바그라티온 작전",faction:"allied",summary:"소련군의 대공세로 독일 중부집단군이 붕괴하고 벨라루스가 해방됨.",routes:[["스몰렌스크",32.05,54.78,"민스크",27.56,53.9],["민스크",27.56,53.9,"바르샤바",21.01,52.23]]},
      {id:"pacific-philippine-sea",theater:"pacific",sortDate:"1944-06-19",date:"1944년 6월 19~20일",title:"필리핀해 해전",summary:"미 해군이 마리아나 해역에서 일본 함재기 전력을 궤멸시킴.",routes:[["사이판",145.75,15.18,"필리핀해",137,15]]},
      {id:"east-warsaw-uprising",theater:"east",sortDate:"1944-08-01",date:"1944년 8월 1일~10월 2일",title:"바르샤바 봉기",summary:"폴란드 국내군이 봉기했으나 소련군의 진격이 멈춘 사이 독일군에게 진압됨.",routes:[["바르샤바",21.01,52.23,"프라가",21.05,52.25]]},
      {id:"west-paris",theater:"west",sortDate:"1944-08-25",date:"1944년 8월 25일",title:"파리 해방",summary:"연합군과 프랑스 저항군이 파리를 해방하고 독일 점령이 끝남.",routes:[["노르망디",-0.5,49.35,"파리",2.35,48.86]]},
      {id:"west-market-garden",theater:"west",sortDate:"1944-09-17",date:"1944년 9월 17~25일",title:"마켓가든 작전",series:"bob",episode:"4",summary:"네덜란드 에인트호번 강하. 아른험까지의 마켓가든 작전은 실패로 끝남.",detail:"[4화 Replacements] 몽고메리가 구상한 대규모 공수·기갑 연합작전. 이지 중대는 대낮에 네덜란드 에인트호번 근처에 강하해 시민들의 환영을 받으며 진입하고, 아른험까지 이어지는 단일 도로('헬스 하이웨이')를 연다. 그러나 노획 티거 전차를 앞세운 독일군의 반격으로 노이넨에서 큰 피해를 입고 후퇴. 신참들의 죽음과 베테랑들의 냉소를 통해 작전 전체(아른험까지 확보)가 실패로 끝났음을 보여준다.",routes:[["영국 상공",1.2,51.9,"에인트호번",5.47,51.44,"allied","para"],["에인트호번",5.47,51.44,"네이메헌",5.85,51.84,"allied","land"]]},
      {id:"west-the-island",theater:"west",sortDate:"1944-10-05",date:"1944년 10월",title:"더 아일랜드 · 크로스로드",series:"bob",episode:"5",summary:"라인·발강 사이 '아일랜드' 방어. 새벽 교차로 전투로 SS 부대 격퇴.",detail:"[5화 Crossroads] 마켓가든 이후 라인·발강 사이 저지대 '아일랜드'에서의 방어전. 새벽 정찰 중 윈터스가 제방 도로 교차로에서 독일 SS 1개 중대와 조우, 소수 병력으로 기습해 200명 규모의 적을 궤멸시킨다(이 교차로 전투가 제목의 유래). 이후 윈터스는 대대 작전장교로 진급해 일선 지휘에서 물러나고, 회상 형식으로 이야기가 전개된다.",routes:[["네이메헌",5.85,51.84,"더 아일랜드",5.9,51.95,"allied","para"]]},
      {id:"pacific-peleliu",theater:"pacific",sortDate:"1944-09-15",date:"1944년 9월 15일~11월 27일",title:"펠렐리우 전투",series:"pacific",episode:"5~7",summary:"미 제1해병사단이 펠렐리우에 상륙. '사흘이면 끝난다'던 예상과 달리 두 달 넘는 최악의 소모전이 됨.",detail:"[5화 Peleliu Landing / 6화 Peleliu Airfield / 7화 Peleliu Hills] 산호섬 펠렐리우 상륙. 뜨거운 산호 암반 위에서 비행장을 가로지르는 돌격(6화), 그리고 우무르브로골 능선('블러디 노즈 리지')의 동굴 진지를 하나씩 파괴하는 지옥의 능선전(7화)이 이어진다. 전략적 가치 논란에도 불구하고 미 해병대가 가장 높은 손실률을 기록한 전투 중 하나로, 슬레지의 회고를 통해 전쟁의 광기가 극단적으로 그려진다.",routes:[["남태평양 기지",137.5,3.0,"펠렐리우",134.23,6.99,"allied","landing"]]},
      {id:"pacific-leyte",theater:"pacific",sortDate:"1944-10-23",date:"1944년 10월 23~26일",title:"레이테만 해전",summary:"사상 최대 규모의 해전에서 일본 연합함대가 결정적 타격을 입음.",routes:[["뉴기니",141,-6,"레이테",125,10.9]]},
      {id:"west-bulge",theater:"west",sortDate:"1944-12-16",date:"1944년 12월 16일~1945년 1월 25일",title:"벌지 전투",summary:"독일군의 아르덴 기습 반격이 초기 성과 뒤 연합군에게 저지됨.",routes:[["아이펠",6.5,50.3,"바스토뉴",5.72,50.0]]},
      {id:"tiger-jagdtiger",theater:"west",sortDate:"1945-03-01",date:"1945년 초",title:"야크트티거 중대 · 서부전선",series:"tiger",episode:"야크트티거",summary:"회복한 카리우스가 512 중전차구축대대의 야크트티거 중대장으로 서부전선 루르·지겐 일대에 투입됨.",detail:"동부전선에서 중상을 입고 회복한 카리우스는 1945년 초 제512 중전차구축대대(schwere Panzerjäger-Abteilung 512)의 야크트티거(128mm 포를 단 초중량 구축전차) 중대장이 되어 서부전선에 배치된다. 루르·지겐 지역에서 진격하는 미군을 상대했다. 거대하지만 기동성이 떨어지는 야크트티거의 한계 속에 싸운다.",routes:[["지겐",8.024,50.875,"루르",7.5,51.4,"tiger","tiger"]]},
      {id:"tiger-surrender",theater:"west",sortDate:"1945-04-15",date:"1945년 4월 15일",title:"카리우스 항복 · 루르 포위망",series:"tiger",episode:"종전",summary:"루르 포위망에서 탈출이 막히자 카리우스가 야크트티거의 포를 파괴하고 이절론에서 미군에 항복.",detail:"1945년 4월 루르 포위망이 좁혀지자 돌파가 불가능해진 카리우스는 남은 야크트티거의 주포를 파괴해 적에게 넘어가지 않게 한 뒤, 4월 15일 이절론(실러플라츠)에서 미군에 항복한다. 오토 카리우스의 전쟁이 끝난다. 그는 전후 약사가 되었고 2015년 타계했다.",routes:[["루르",7.5,51.4,"이절론",7.70,51.37,"tiger","tiger"]]},
      {id:"west-bastogne",theater:"west",sortDate:"1944-12-19",date:"1944년 12월 19일~1945년 1월",title:"바스토뉴 방어",series:"bob",episode:"6~7",summary:"벌지 전투에서 포위된 바스토뉴를 혹한 속에 사수하고 푸아를 탈환.",detail:"[6화 Bastogne / 7화 The Breaking Point] 벌지 전투에서 101공수사단은 요충지 바스토뉴에서 완전 포위된 채 방한복·탄약·의약품 없이 혹한을 버틴다. 6화는 위생병 유진 '독' 로의 시선으로 부상병 치료와 간호사 르네와의 만남을 그린다. 7화는 푸아(Foy) 공격 — 무능한 다이크 중위의 지휘 마비를 스피어스가 대신 돌파해 마을을 탈환하는 장면이 절정. 겅과 토이 등 여러 대원이 전사·부상한다.",routes:[["랭스",4.03,49.26,"바스토뉴",5.72,50.0,"allied","para"],["바스토뉴",5.72,50.0,"푸아",5.79,50.05,"allied","para"]]},
      {id:"pacific-iwojima",theater:"pacific",sortDate:"1945-02-19",date:"1945년 2월 19일~3월 26일",title:"이오지마 전투",series:"pacific",episode:"8",summary:"미 해병대가 막대한 희생 끝에 이오지마를 점령해 본토 폭격 기지를 확보.",detail:"[8화 Iwo Jima] 화산섬 이오지마 상륙. 검은 화산재 해변과 지하 요새에서 벌어진 지옥 같은 소모전. 과달카날의 영웅 존 배실론이 이 전투에서 전사한다. 스리바치산에 성조기를 세운 장면(로젠탈의 사진)으로 상징되지만, 실제 전투는 그 뒤로도 한 달 넘게 이어졌다. B-29 폭격기의 비상착륙 기지 확보가 목적.",routes:[["사이판",145.75,15.18,"이오지마",141.32,24.78]]},
      {id:"west-haguenau",theater:"west",sortDate:"1945-02-05",date:"1945년 2월",title:"아그누 전투",series:"bob",episode:"8",summary:"알자스 아그누에서 모데르강을 사이에 둔 대치와 야간 정찰.",detail:"[8화 The Last Patrol] 알자스의 아그누에서 모데르강을 사이에 두고 독일군과 대치. 신임 소위 존스가 첫 실전으로 강 건너 포로 생포 정찰을 지휘하고, 웹스터가 부대에 복귀한다. 첫 정찰은 성공하지만 두 번째 정찰 명령이 떨어지자, 윈터스는 부하들을 아끼려 '정찰을 나갔다고만 보고하라'며 실제 도하를 시키지 않는다. 종전이 가까운 시점의 무의미한 희생을 거부하는 결정이 핵심.",routes:[["바스토뉴",5.72,50.0,"아그누",7.79,48.82,"allied","para"]]},
      {id:"west-rhine",theater:"west",sortDate:"1945-03-07",date:"1945년 3월 7일",title:"레마겐 라인강 도하",summary:"연합군이 레마겐의 철교를 확보해 라인강을 건너 독일 본토로 진격.",routes:[["아헨",6.08,50.78,"레마겐",7.23,50.58]]},
      {id:"pacific-okinawa",theater:"pacific",sortDate:"1945-04-01",date:"1945년 4월 1일~6월 22일",title:"오키나와 전투",series:"pacific",episode:"9",summary:"연합군이 오키나와를 점령했으나 양측 모두 막대한 피해를 입음.",detail:"[9화 Okinawa] 일본 본토 코앞 오키나와 상륙. 진흙탕 속 장기 소모전, 가미카제 공격, 그리고 주민을 끌어들인 참극이 벌어진다. 유진 슬레지('With the Old Breed'의 저자)의 시선으로 인간성이 무너지는 전장을 그린다. 미군 사상자만 5만 명이 넘는 태평양 최대 규모의 지상전으로, 일본 본토 침공의 참상을 예고했다.",routes:[["필리핀",122,13,"오키나와",127.8,26.34]]},
      {id:"east-berlin",theater:"east",sortDate:"1945-04-16",date:"1945년 4월 16일~5월 2일",title:"베를린 전투",faction:"allied",summary:"동쪽에서 소련군이 베를린을 포위·함락하고, 서쪽에서 진격한 미·영 연합군이 엘베강에서 소련군과 합류. 히틀러가 자살하고 나치 독일이 붕괴함.",routes:[["오데르강",14.64,52.57,"베를린",13.41,52.52,"soviet","land"],["루르",7.3,51.4,"엘베강",11.6,52.2,"allied","land"]]},
      {id:"west-landsberg",theater:"west",sortDate:"1945-04-27",date:"1945년 4월 27일",title:"카우퍼링 수용소 발견",series:"bob",episode:"9",summary:"란츠베르크 인근 카우퍼링 강제수용소를 발견해 참상을 목격.",detail:"[9화 Why We Fight] 독일 남부로 진격하던 이지 중대가 숲속에서 나치의 카우퍼링(다하우 위성) 강제수용소를 우연히 발견한다. 굶주려 죽어가는 수감자들과 시신 더미를 목격한 병사들은 자신들이 왜 싸웠는지를 비로소 실감한다. 니슨이 유대인 수감자와 마주하는 장면, 마을 주민을 동원해 시신을 수습시키는 미군의 조치가 그려진다. 홀로코스트를 정면으로 다룬 화.",routes:[["아그누",7.79,48.82,"란츠베르크",10.87,48.05,"allied","para"]]},
      {id:"west-eagles-nest",theater:"west",sortDate:"1945-05-05",date:"1945년 5월 5일",title:"독수리 둥지 점령",series:"bob",episode:"10",summary:"히틀러의 산장 켈슈타인하우스(독수리 둥지)를 점령. 유럽전 종착점.",detail:"[10화 Points] 이지 중대가 히틀러의 알프스 산장 베르히테스가덴과 켈슈타인하우스(독수리 둥지, Eagle's Nest)를 무혈 점령한다. 나치 수뇌부의 저택에서 와인과 은식기를 노획하며 유럽 전쟁의 상징적 종착점을 맞는다. 이후 독일 항복(V-E Day)과 오스트리아 점령, 그리고 태평양 재배치를 앞둔 병사들의 제대 점수(points) 계산으로 이야기가 마무리된다.",routes:[["란츠베르크",10.87,48.05,"베르히테스가덴",13.04,47.63,"allied","para"]]},
      {id:"west-ve-day",theater:"west",sortDate:"1945-05-08",date:"1945년 5월 8일",title:"독일 항복(유럽 전승일)",summary:"독일이 무조건 항복하고 유럽에서의 전쟁이 끝남.",routes:[]},
      {id:"pacific-hiroshima",theater:"pacific",sortDate:"1945-08-06",date:"1945년 8월 6일",title:"히로시마 원자폭탄 투하",summary:"미군이 히로시마에 원자폭탄을 투하해 도시가 파괴되고 막대한 사상자가 발생.",routes:[["티니안",145.63,15.0,"히로시마",132.46,34.39]]},
      {id:"east-manchuria",theater:"east",sortDate:"1945-08-08",date:"1945년 8월 8~9일",title:"소련의 대일 참전·만주 침공",faction:"allied",summary:"소련이 일본에 선전포고하고 만주로 진격해 관동군을 붕괴시킴.",routes:[["치타",113.5,52.03,"하얼빈",126.53,45.8],["블라디보스토크",131.89,43.12,"지린",126.55,43.84]]},
      {id:"pacific-nagasaki",theater:"pacific",sortDate:"1945-08-09",date:"1945년 8월 9일",title:"나가사키 원자폭탄 투하",summary:"미군이 나가사키에 두 번째 원자폭탄을 투하함.",routes:[["티니안",145.63,15.0,"나가사키",129.87,32.75]]},
      {id:"pacific-surrender-announce",theater:"pacific",sortDate:"1945-08-15",date:"1945년 8월 15일",title:"일본의 항복 발표",summary:"일왕이 라디오로 항복을 발표하며 사실상 전쟁이 종결됨.",routes:[]},
      {id:"pacific-surrender-sign",theater:"pacific",sortDate:"1945-09-02",date:"1945년 9월 2일",title:"항복 문서 조인",summary:"도쿄만의 미주리함에서 일본이 항복 문서에 서명하며 제2차 세계대전이 끝남.",routes:[["도쿄",139.69,35.69,"도쿄만",139.77,35.45]]}
    ];

const mapCountrySets = {
  west1940:{"276":"axis","250":"allied","056":"allied","528":"allied","442":"allied","826":"allied"},
  britain:{"276":"axis","826":"allied"},
  dieppe:{"276":"axis","250":"axis","826":"allied"},
  africaEarly:{"380":"axis","434":"axis","826":"allied","818":"allied"},
  torch:{"504":"allied","012":"allied","788":"axis","826":"allied","840":"allied"},
  tunisiaAllied:{"788":"allied","012":"allied","504":"allied","380":"axis","276":"axis"},
  italy1943:{"380":"axis","788":"allied","012":"allied","504":"allied","826":"allied","840":"allied"},
  balkans:{"276":"axis","380":"axis","348":"axis","642":"axis","100":"axis","300":"allied","688":"allied","070":"allied","191":"allied","705":"allied","499":"allied","807":"allied"},
  eastFront:{"276":"axis","380":"axis","348":"axis","642":"axis","246":"finnish","643":"soviet","804":"soviet","112":"soviet","233":"soviet","428":"soviet","440":"soviet"},
  eastSouth:{"276":"axis","380":"axis","348":"axis","642":"axis","643":"soviet","804":"soviet","112":"soviet"},
  pearl:{"392":"axis","840":"allied"},
  philippines:{"392":"axis","158":"axis","608":"allied","840":"allied"},
  rabaul:{"392":"axis","598":"allied","036":"allied"},
  singapore:{"392":"axis","458":"allied","702":"allied","826":"allied"},
  coral:{"392":"axis","598":"allied","036":"allied","840":"allied"},
  midway:{"392":"axis","840":"allied"},
  solomons:{"392":"axis","090":"allied","548":"allied","840":"allied"},
  cartwheel:{"392":"axis","090":"allied","598":"allied","036":"allied","840":"allied"},
  tarawa:{"392":"axis","296":"allied","840":"allied"},
  italy1944:{"380":"axis","276":"axis","826":"allied","840":"allied"},
  normandy:{"276":"axis","250":"axis","826":"allied","840":"allied"},
  eastLate:{"276":"axis","348":"axis","642":"axis","643":"soviet","804":"soviet","112":"soviet","616":"soviet"},
  westLate:{"276":"axis","250":"allied","056":"allied","826":"allied","840":"allied"},
  berlin:{"276":"axis","643":"soviet","616":"soviet","826":"allied","840":"allied","250":"allied"},
  marianas:{"392":"axis","840":"allied"},
  leyte:{"392":"axis","158":"axis","608":"allied","840":"allied"},
  iwojima:{"392":"axis","840":"allied"},
  okinawa:{"392":"axis","840":"allied"},
  homeland:{"392":"axis","840":"allied"},
  manchuria:{"392":"axis","156":"axis","643":"soviet"},
  gloucester:{"392":"axis","840":"allied","036":"allied"},
  peleliu:{"392":"axis","840":"allied"},
  mota:{"826":"allied","276":"axis"},
  atlantic:{"826":"allied","276":"axis","250":"axis","840":"allied"},
  tigerEast:{"276":"axis","643":"soviet","233":"soviet","428":"soviet","440":"soviet"},
  tigerWest:{"276":"axis","840":"allied","826":"allied"}
};

const detailedMapPresets = {
  "west-ardennes":{countries:"west1940",sides:"axis",types:"land"},
  "west-dunkirk":{countries:"west1940",sides:"allied",types:"naval"},
  "west-france":{countries:"west1940",sides:"axis",types:"land"},
  "west-britain":{countries:"britain",sides:"axis",types:"air"},
  "africa-italy-egypt":{countries:"africaEarly",sides:"axis",types:"land"},
  "africa-compass":{countries:"africaEarly",sides:"allied",types:"land"},
  "africa-rommel":{countries:"africaEarly",sides:"axis",types:"naval"},
  "africa-rommel-east":{countries:"africaEarly",sides:"axis",types:"land"},
  "east-balkans":{countries:"balkans",sides:"axis",types:["land","land","landing"]},
  "east-barbarossa":{countries:"eastFront",sides:"axis",types:"land"},
  "east-leningrad":{countries:"eastFront",sides:"axis",types:"land"},
  "east-moscow":{countries:"eastFront",sides:"axis",types:"land"},
  "africa-crusader":{countries:"africaEarly",sides:"allied",types:"land"},
  "pacific-pearl":{countries:"pearl",sides:"axis",types:"air"},
  "pacific-philippines":{countries:"philippines",sides:"axis",types:"landing"},
  "pacific-rabaul":{countries:"rabaul",sides:"axis",types:"landing"},
  "pacific-singapore":{countries:"singapore",sides:"axis",types:"land"},
  "pacific-coral":{countries:"coral",sides:"axis",types:"naval"},
  "africa-gazala":{countries:"africaEarly",sides:"axis",types:"land"},
  "pacific-midway":{countries:"midway",sides:"axis",types:"naval"},
  "east-caseblue":{countries:"eastSouth",sides:"axis",types:"land"},
  "africa-first-elalamein":{countries:"africaEarly",sides:"axis",types:"land"},
  "pacific-guadalcanal":{countries:"solomons",sides:"allied",types:"landing"},
  "west-dieppe":{countries:"dieppe",sides:"allied",types:"landing"},
  "east-stalingrad":{countries:"eastSouth",sides:"axis",types:"land"},
  "africa-second-elalamein":{countries:"africaEarly",sides:"allied",types:"land"},
  "africa-torch":{countries:"torch",sides:"allied",types:"landing"},
  "east-uranus":{countries:"eastSouth",sides:"soviet",types:"land"},
  "east-stalingrad-end":{countries:"eastSouth",sides:"soviet",types:"land"},
  "pacific-guadalcanal-end":{countries:"solomons",sides:"allied",types:"naval"},
  "africa-tunisia-end":{countries:"tunisiaAllied",sides:"allied",types:"land"},
  "pacific-cartwheel":{countries:"cartwheel",sides:"allied",types:"landing"},
  "east-kursk":{countries:"eastSouth",sides:"axis",types:"land"},
  "africa-sicily":{countries:"italy1943",sides:"allied",types:"landing"},
  "africa-italy":{countries:"italy1943",sides:"allied",types:"landing",view:[[14,37.3],[16.8,37.3],[16.8,39.2],[14,39.2]]},
  "africa-salerno":{countries:"italy1943",sides:"allied",types:"landing"},
  "east-kyiv":{countries:"eastSouth",sides:"soviet",types:"land"},
  "pacific-tarawa":{countries:"tarawa",sides:"allied",types:"landing"},
  "africa-anzio":{countries:"italy1944",sides:"allied",types:"landing",view:[[11.5,40.5],[15,40.5],[15,42.4],[11.5,42.4]]},
  "africa-rome":{countries:"italy1944",sides:"allied",types:"land",view:[[11.5,40.7],[14,40.7],[14,42.3],[11.5,42.3]]},
  "east-bagration":{countries:"eastLate",sides:"soviet",types:"land"},
  "pacific-philippine-sea":{countries:"marianas",sides:"allied",types:"naval"},
  "east-warsaw-uprising":{countries:"eastLate",sides:"allied",types:"land",view:[[19.5,51],[23,51],[23,53.5],[19.5,53.5]]},
  "west-paris":{countries:"westLate",sides:"allied",types:"land"},
  "pacific-leyte":{countries:"leyte",sides:"allied",types:"naval"},
  "west-bulge":{countries:"westLate",sides:"axis",types:"land",view:[[4,49],[8,49],[8,51.5],[4,51.5]]},
  "pacific-iwojima":{countries:"iwojima",sides:"allied",types:"landing"},
  "west-rhine":{countries:"westLate",sides:"allied",types:"land",view:[[5,49.5],[9,49.5],[9,51.5],[5,51.5]]},
  "pacific-okinawa":{countries:"okinawa",sides:"allied",types:"landing"},
  "east-berlin":{countries:"berlin",sides:["soviet","allied"],types:"land",view:[[6,50.5],[16,50.5],[16,54],[6,54]]},
  "pacific-hiroshima":{countries:"homeland",sides:"allied",types:"air"},
  "east-manchuria":{countries:"manchuria",sides:"soviet",types:"land"},
  "pacific-nagasaki":{countries:"homeland",sides:"allied",types:"air"},
  "pacific-surrender-sign":{countries:"homeland",sides:"allied",types:"naval",view:[[138,34],[142,34],[142,37],[138,37]]},
  "pacific-gloucester":{countries:"gloucester",sides:"allied",types:"landing",view:[[146,-7.5],[151,-7.5],[151,-4],[146,-4]]},
  "pacific-peleliu":{countries:"peleliu",sides:"allied",types:"landing",view:[[122,2],[138,2],[138,13],[122,13]]},
  "usaaf-bombing-begins":{countries:"mota",sides:"mota",types:"air",view:[[-3,48],[6,48],[6,54],[-3,54]]},
  "mota-bremen":{countries:"mota",sides:"mota",types:"air",view:[[-2,50],[12,50],[12,55],[-2,55]]},
  "mota-regensburg":{countries:"mota",sides:"mota",types:"air",view:[[-2,34],[15,34],[15,54],[-2,54]]},
  "mota-munster":{countries:"mota",sides:"mota",types:"air",view:[[-2,50],[10,50],[10,54],[-2,54]]},
  "mota-berlin":{countries:"mota",sides:"mota",types:"air",view:[[-2,50],[16,50],[16,54.5],[-2,54.5]]},
  "mota-frantic":{countries:"mota",sides:"mota",types:"air",view:[[-2,47],[37,47],[37,55],[-2,55]]},
  "atlantic-begins":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-45,40],[10,40],[10,60],[-45,60]]},
  "uboat-first":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-45,40],[5,40],[5,60],[-45,60]]},
  "uboat-u230":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-45,42],[10,42],[10,62],[-45,62]]},
  "uboat-biscay":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-12,43],[2,43],[2,50],[-12,50]]},
  "uboat-bermuda":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-70,30],[2,30],[2,52],[-70,52]]},
  "uboat-gibraltar":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-10,35],[10,35],[10,50],[-10,50]]},
  "uboat-blackmay":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-45,42],[5,42],[5,60],[-45,60]]},
  "uboat-u415":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-10,45],[2,45],[2,51],[-10,51]]},
  "uboat-u415-sunk":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-8,46],[0,46],[0,50],[-8,50]]},
  "uboat-escape":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-10,45],[12,45],[12,62],[-10,62]]},
  "uboat-surrender":{countries:"atlantic",sides:"uboat",types:"uboat",view:[[-10,45],[12,45],[12,62],[-10,62]]},
  "tiger-barbarossa":{countries:"tigerEast",sides:"tiger",types:"tiger",view:[[20,53],[34,53],[34,58],[20,58]]},
  "tiger-deploy":{countries:"tigerEast",sides:"tiger",types:"tiger",view:[[26,57],[34,57],[34,61],[26,61]]},
  "tiger-narva":{countries:"tigerEast",sides:"tiger",types:"tiger",view:[[26,58.5],[30,58.5],[30,60],[26,60]]},
  "tiger-malinava":{countries:"tigerEast",sides:"tiger",types:"tiger",view:[[25,55.3],[28,55.3],[28,56.6],[25,56.6]]},
  "tiger-jagdtiger":{countries:"tigerWest",sides:"tiger",types:"tiger",view:[[6,50],[10,50],[10,52],[6,52]]},
  "tiger-surrender":{countries:"tigerWest",sides:"tiger",types:"tiger",view:[[6.5,50.5],[9,50.5],[9,52],[6.5,52]]},
  "west-carentan":{countries:"normandy",sides:"bob",types:"para",view:[[-1.6,49.1],[-0.8,49.1],[-0.8,49.6],[-1.6,49.6]]},
  "west-market-garden":{countries:"westLate",sides:["bob","bob"],types:["para","land"],view:[[4.8,51.2],[6.4,51.2],[6.4,52.2],[4.8,52.2]]},
  "west-the-island":{countries:"westLate",sides:"bob",types:"para",view:[[5.4,51.6],[6.4,51.6],[6.4,52.2],[5.4,52.2]]},
  "west-bastogne":{countries:"westLate",sides:["bob","bob"],types:["para","para"],view:[[4.6,49.5],[6.6,49.5],[6.6,50.5],[4.6,50.5]]},
  "west-haguenau":{countries:"westLate",sides:"bob",types:"para",view:[[5,48.3],[9,48.3],[9,50.6],[5,50.6]]},
  "west-landsberg":{countries:"westLate",sides:"bob",types:"para",view:[[7,47.6],[11.6,47.6],[11.6,49.4],[7,49.4]]},
  "west-eagles-nest":{countries:"westLate",sides:"bob",types:"para",view:[[10.4,47.3],[13.6,47.3],[13.6,48.6],[10.4,48.6]]}
};
const detailedNoRouteEvents=["west-ve-day","pacific-surrender-announce"];

const sideMapLabels={allied:"연합군",axis:"추축군",soviet:"소련군",finnish:"핀란드군",neutral:"중립",bob:"101 공수사단",mota:"제8공군 100폭격전대",uboat:"독일 U보트",tiger:"독일 중전차대대"};
const unitMapLabels={land:"기갑",naval:"함대",air:"폭격기",landing:"상륙정",para:"공수",uboat:"잠수함",tiger:"전차"};
const unitTypeByRoute={land:"tank",naval:"ship",air:"bomber",landing:"landing",para:"para",uboat:"uboat",tiger:"tank"};
function routeMidpoint(route){const start=Number(route[1]),end=Number(route[4]);let delta=((end-start+540)%360)-180,lon=start+delta/2;if(lon>180)lon-=360;if(lon<-180)lon+=360;return [lon,(Number(route[2])+Number(route[5]))/2]}
events.forEach(event=>{
  const preset=detailedMapPresets[event.id];if(!preset||!event.routes?.length)return;
  const sideFor=index=>Array.isArray(preset.sides)?preset.sides[index]||preset.sides.at(-1):preset.sides;
  const typeFor=index=>Array.isArray(preset.types)?preset.types[index]||preset.types.at(-1):preset.types;
  event.mapDesign="war-v1";
  event.mapNote="현대 국경 기준 · 국가색은 참전국 진영(점령지는 아님), 이동 방향은 개략 표시";
  if(preset.view)event.mapView=preset.view;
  event.countrySides={...mapCountrySets[preset.countries]};
  event.routes=event.routes.map((route,index)=>[...route.slice(0,6),sideFor(index),typeFor(index)]);
  event.units=event.routes.map((route,index)=>{const side=sideFor(index),routeType=typeFor(index);return {type:unitTypeByRoute[routeType],side,at:routeMidpoint(route),heading:0,label:`${sideMapLabels[side]} ${unitMapLabels[routeType]}`,showLabel:false}});
  const territorySides=[...new Set(Object.values(event.countrySides))];
  const routeSides=[...new Set(event.routes.map(route=>route[6]))];
  const unitPairs=[...new Map(event.units.map(unit=>[`${unit.side}-${unit.type}`,unit])).values()];
  event.legend={
    title:"표현 범례",
    territories:territorySides.map(side=>({side,label:`${sideMapLabels[side]} 소속국`})),
    routes:routeSides.map(side=>({side,label:`${sideMapLabels[side]} 이동`})),
    units:unitPairs.map(unit=>({type:unit.type,side:unit.side,label:`${sideMapLabels[unit.side]} ${unitMapLabels[event.routes.find(route=>route[6]===unit.side&&unitTypeByRoute[route[7]]===unit.type)?.[7]||"land"]}`})),
    colors:routeSides.map(side=>({side,label:`진영색: ${sideMapLabels[side]}`}))
  };
});

detailedNoRouteEvents.forEach(id=>{
  const event=events.find(item=>item.id===id);if(!event)return;
  event.mapDesign="war-v1";
  event.mapNote="현대 국경 기준 · 국가색은 참전국 진영, 해당 시점 전황";
  event.countrySides={};
  event.legend={
    title:"표현 범례",
    territories:[{side:"allied",label:"연합국"},{side:"axis",label:"추축국"},{side:"soviet",label:"소련권"}],
    routes:[],units:[],colors:[]
  };
});

const japaneseColonies = ["410","408","158"];
events.forEach(event=>{
  if(!event.countrySides)return;
  const japanIsAxis=event.countrySides["392"]==="axis";
  if(!japanIsAxis)return;
  japaneseColonies.forEach(id=>{if(!event.countrySides[id])event.countrySides[id]="axis"});
});

window.timelineConfig = {
  storageKey: "world-history-ww2-events-v1",
  historicalDataUrl:"data/world-1938.geojson",
  lanes,
  events,
  seriesLabels:{bob:"BAND OF BROTHERS",pacific:"THE PACIFIC",mota:"MASTERS OF THE AIR",ironcoffins:"IRON COFFINS · 강철의 관",tiger:"TIGERS IN THE MUD · 진흙 속의 호랑이"},
  yearMarkers: ["1937-01-01","1939-01-01","1940-01-01","1941-01-01","1942-01-01","1943-01-01","1944-01-01","1945-01-01"]
};
