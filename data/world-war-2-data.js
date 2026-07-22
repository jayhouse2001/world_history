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
      {id:"africa-rommel-east",theater:"africa",sortDate:"1941-03-24",date:"1941년 3월 24일",title:"롬멜의 동진",summary:"독일·이탈리아군이 리비아에서 이집트 국경까지 진격.",routes:[["엘아게일라",20.07,30.18,"토브루크",23.96,32.08],["토브루크",23.96,32.08,"살룸",25.14,31.55]]},
      {id:"east-balkans",theater:"east",sortDate:"1941-04-06",date:"1941년 4월 6일~6월 1일",title:"발칸반도 공략",summary:"독일군이 유고슬라비아와 그리스를 거쳐 크레타로 진격.",routes:[["빈",16.37,48.21,"베오그라드",20.46,44.82],["베오그라드",20.46,44.82,"아테네",23.73,37.98],["아테네",23.73,37.98,"크레타",24.81,35.24]]},
      {id:"east-barbarossa",theater:"east",sortDate:"1941-06-22",date:"1941년 6월 22일",title:"바르바로사 작전",summary:"독일과 추축군이 발트해에서 흑해에 이르는 전선에서 소련을 침공.",routes:[["바르샤바",21.01,52.23,"스몰렌스크",32.05,54.78],["루마니아",26.1,44.43,"키이우",30.52,50.45]]},
      {id:"west-atlantic-charter",theater:"west",sortDate:"1941-08-14",date:"1941년 8월 14일",title:"대서양 헌장",summary:"루스벨트와 처칠이 전후 국제질서의 공동 원칙을 발표.",routes:[]},
      {id:"east-leningrad",theater:"east",sortDate:"1941-09-08",date:"1941년 9월 8일",title:"레닌그라드 포위 시작",summary:"독일군과 핀란드군의 압박으로 레닌그라드의 육상 보급로가 차단.",routes:[["프스코프",28.33,57.82,"레닌그라드",30.32,59.93]]},
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
      {id:"pacific-guadalcanal",theater:"pacific",sortDate:"1942-08-07",date:"1942년 8월 7일~1943년 2월 9일",title:"과달카날 전역",summary:"미 해병대 상륙 뒤 수개월의 육해공전 끝에 일본군이 섬에서 철수.",routes:[["에스피리투산토",167.18,-15.38,"과달카날",160.15,-9.58]]},
      {id:"west-dieppe",theater:"west",sortDate:"1942-08-19",date:"1942년 8월 19일",title:"디에프 기습",summary:"연합군이 프랑스 디에프에 상륙했으나 큰 피해를 입고 철수.",routes:[["뉴헤이븐",.05,50.8,"디에프",1.08,49.92]]},
      {id:"east-stalingrad",theater:"east",sortDate:"1942-08-23",date:"1942년 8월 23일~1943년 2월 2일",title:"스탈린그라드 전투",summary:"독일군이 시가전을 벌였으나 소련군의 포위 뒤 제6군이 항복.",routes:[["하르키우",36.23,49.99,"스탈린그라드",44.5,48.71]]},
      {id:"africa-second-elalamein",theater:"africa",sortDate:"1942-10-23",date:"1942년 10월 23일~11월 11일",title:"제2차 엘 알라메인 전투",summary:"몽고메리의 영국 제8군이 롬멜군을 격파해 서쪽으로 후퇴시킴.",routes:[["엘알라메인",28.95,30.84,"메르사마트루",27.24,31.35]]},
      {id:"africa-torch",theater:"africa",sortDate:"1942-11-08",date:"1942년 11월 8일",title:"횃불 작전",summary:"미·영 연합군이 모로코와 알제리에 상륙해 추축군을 동서에서 압박.",routes:[["대서양",-10,34,"카사블랑카",-7.59,33.57],["지중해",2,38,"알제",3.06,36.75]]},
      {id:"east-uranus",theater:"east",sortDate:"1942-11-19",date:"1942년 11월 19일",title:"천왕성 작전",summary:"소련군이 스탈린그라드 북서와 남쪽에서 돌파해 독일 제6군을 포위.",routes:[["세라피모비치",42.74,49.58,"칼라치",43.53,48.69],["사르파",44.41,48.38,"칼라치",43.53,48.69]]},
      {id:"west-casablanca",theater:"west",sortDate:"1943-01-14",date:"1943년 1월 14~24일",title:"카사블랑카 회담",summary:"루스벨트와 처칠이 추축국의 무조건 항복 원칙과 다음 작전을 협의.",routes:[]},
      {id:"east-stalingrad-end",theater:"east",sortDate:"1943-02-02",date:"1943년 2월 2일",title:"스탈린그라드 독일군 항복",summary:"포위된 독일 제6군의 잔여 병력이 항복하고 남부 전선의 흐름이 소련 쪽으로 기움.",routes:[["스탈린그라드",44.5,48.71,"포로수용지",45.1,49.2]]},
      {id:"pacific-guadalcanal-end",theater:"pacific",sortDate:"1943-02-09",date:"1943년 2월 9일",title:"과달카날 전역 종료",summary:"일본군의 철수가 끝나며 연합군이 남태평양 공세의 발판을 확보.",routes:[["과달카날",160.15,-9.58,"부건빌",155.38,-6.2]]},
      {id:"africa-tunisia-end",theater:"africa",sortDate:"1943-05-13",date:"1943년 5월 13일",title:"튀니지 추축군 항복",summary:"튀니지의 독일·이탈리아군이 항복해 북아프리카 전역이 끝남.",routes:[["튀니스",10.18,36.81,"비제르테",9.87,37.27]]},
      {id:"pacific-cartwheel",theater:"pacific",sortDate:"1943-06-30",date:"1943년 6월 30일 시작",title:"카트휠 작전",summary:"연합군이 뉴기니와 솔로몬제도를 따라 진격하며 라바울을 고립시키기 시작.",routes:[["과달카날",160.15,-9.58,"부건빌",155.38,-6.2],["포트모르즈비",147.18,-9.44,"라에",146.98,-6.73]]},
      {id:"east-kursk",theater:"east",sortDate:"1943-07-05",date:"1943년 7월 5일~8월 23일",title:"쿠르스크 전투",summary:"독일의 성채 작전이 실패하고 소련군이 동부전선의 전략적 주도권을 굳힘.",routes:[["오룔",36.06,52.97,"쿠르스크",36.19,51.74],["벨고로드",36.59,50.6,"쿠르스크",36.19,51.74]]},
      {id:"africa-sicily",theater:"africa",sortDate:"1943-07-10",date:"1943년 7월 10일",title:"시칠리아 상륙",summary:"연합군이 시칠리아에 상륙해 이탈리아 본토 진격의 길을 엶.",routes:[["튀니스",10.18,36.81,"시칠리아",14.1,37.5]]},
      {id:"africa-italy",theater:"africa",sortDate:"1943-09-03",date:"1943년 9월 3일",title:"이탈리아 본토 상륙",summary:"연합군이 메시나 해협을 건너 칼라브리아에 상륙.",routes:[["메시나",15.55,38.19,"레조칼라브리아",15.65,38.11]]},
      {id:"africa-armistice",theater:"africa",sortDate:"1943-09-08",date:"1943년 9월 8일",title:"이탈리아 휴전 발표",summary:"이탈리아의 연합군과의 휴전이 발표되고 독일군이 이탈리아 주요 지역을 장악.",routes:[]},
      {id:"africa-salerno",theater:"africa",sortDate:"1943-09-09",date:"1943년 9월 9일",title:"살레르노 상륙",summary:"연합군 주력이 살레르노에 상륙해 독일군의 반격을 막고 교두보를 확보.",routes:[["시칠리아",14.1,37.5,"살레르노",14.77,40.68]]},
      {id:"east-kyiv",theater:"east",sortDate:"1943-11-06",date:"1943년 11월 6일",title:"소련군의 키이우 탈환",summary:"소련군이 드니프로강을 건너 키이우를 탈환하고 서쪽으로 진격.",routes:[["쿠르스크",36.19,51.74,"키이우",30.52,50.45]]},
      {id:"pacific-tarawa",theater:"pacific",sortDate:"1943-11-20",date:"1943년 11월 20~23일",title:"타라와 전투",summary:"미 해병대가 치열한 상륙전 끝에 길버트제도의 타라와 환초를 점령.",routes:[["하와이",-157.95,21.35,"타라와",172.98,1.35]]},
      {id:"west-tehran",theater:"west",sortDate:"1943-11-28",date:"1943년 11월 28일~12월 1일",title:"테헤란 회담",summary:"미·영·소 정상이 서유럽 제2전선 개설과 전후 구상을 협의.",routes:[]}
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
  tarawa:{"392":"axis","296":"allied","840":"allied"}
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
  "pacific-tarawa":{countries:"tarawa",sides:"allied",types:"landing"}
};

const sideMapLabels={allied:"연합군",axis:"추축군",soviet:"소련군",finnish:"핀란드군",neutral:"중립"};
const unitMapLabels={land:"기갑",naval:"함대",air:"폭격기",landing:"상륙정"};
const unitTypeByRoute={land:"tank",naval:"ship",air:"bomber",landing:"landing"};
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
  yearMarkers: ["1937-01-01","1939-01-01","1940-01-01","1941-01-01","1942-01-01","1943-01-01"]
};
