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
      {id:"west-tehran",theater:"west",sortDate:"1943-11-28",date:"1943년 11월 28일~12월 1일",title:"테헤란 회담",summary:"미·영·소 정상이 서유럽 제2전선 개설과 전후 구상을 협의.",routes:[]},
      {id:"africa-anzio",theater:"africa",sortDate:"1944-01-22",date:"1944년 1월 22일",title:"안치오 상륙",summary:"연합군이 로마 남쪽 안치오에 상륙해 교두보를 확보했으나 진격이 지체됨.",routes:[["나폴리",14.27,40.85,"안치오",12.62,41.45]]},
      {id:"africa-rome",theater:"africa",sortDate:"1944-06-04",date:"1944년 6월 4일",title:"로마 해방",summary:"구스타프선을 돌파한 연합군이 로마에 입성하며 이탈리아 수도가 해방됨.",routes:[["안치오",12.62,41.45,"로마",12.5,41.9]]},
      {id:"west-normandy",theater:"west",sortDate:"1944-06-06",date:"1944년 6월 6일",title:"노르망디 상륙작전",series:"bob",episode:"2",summary:"연합군이 노르망디 해안에 상륙해 서부 제2전선을 엶. 미 101공수사단(이지 중대)은 유타 해변 후방 생트마리뒤몽 일대에 야간 강하해 브레쿠르 저택의 독일군 포대를 제압.",routes:[["포츠머스",-1.09,50.8,"유타 해변",-1.17,49.42,"allied","landing"],["영국 상공",-1.5,50.2,"생트마리뒤몽",-1.23,49.36,"allied","para"]]},
      {id:"west-carentan",theater:"west",sortDate:"1944-06-10",date:"1944년 6월 10~13일",title:"카랑탕 전투",series:"bob",episode:"3",summary:"미 101공수사단이 유타·오마하 교두보를 잇는 요충지 카랑탕을 점령하고 독일군의 반격을 막아냄. 이지 중대가 시가 진입과 방어에 참가.",routes:[["생트마리뒤몽",-1.23,49.36,"카랑탕",-1.24,49.3,"allied","para"]]},
      {id:"east-bagration",theater:"east",sortDate:"1944-06-22",date:"1944년 6월 22일~8월 19일",title:"바그라티온 작전",summary:"소련군의 대공세로 독일 중부집단군이 붕괴하고 벨라루스가 해방됨.",routes:[["스몰렌스크",32.05,54.78,"민스크",27.56,53.9],["민스크",27.56,53.9,"바르샤바",21.01,52.23]]},
      {id:"pacific-philippine-sea",theater:"pacific",sortDate:"1944-06-19",date:"1944년 6월 19~20일",title:"필리핀해 해전",summary:"미 해군이 마리아나 해역에서 일본 함재기 전력을 궤멸시킴.",routes:[["사이판",145.75,15.18,"필리핀해",137,15]]},
      {id:"east-warsaw-uprising",theater:"east",sortDate:"1944-08-01",date:"1944년 8월 1일~10월 2일",title:"바르샤바 봉기",summary:"폴란드 국내군이 봉기했으나 소련군의 진격이 멈춘 사이 독일군에게 진압됨.",routes:[["바르샤바",21.01,52.23,"프라가",21.05,52.25]]},
      {id:"west-paris",theater:"west",sortDate:"1944-08-25",date:"1944년 8월 25일",title:"파리 해방",summary:"연합군과 프랑스 저항군이 파리를 해방하고 독일 점령이 끝남.",routes:[["노르망디",-0.5,49.35,"파리",2.35,48.86]]},
      {id:"west-market-garden",theater:"west",sortDate:"1944-09-17",date:"1944년 9월 17~25일",title:"마켓가든 작전",series:"bob",episode:"4",summary:"연합군 공수부대가 네덜란드의 교량들을 확보하려 강하. 미 101공수사단(이지 중대)은 에인트호번 일대에 강하해 도로(헬스 하이웨이)를 열었으나 아른험까지의 작전 전체는 실패로 끝남.",routes:[["영국 상공",1.2,51.9,"에인트호번",5.47,51.44,"allied","para"],["에인트호번",5.47,51.44,"네이메헌",5.85,51.84,"allied","land"]]},
      {id:"west-the-island",theater:"west",sortDate:"1944-10-05",date:"1944년 10월",title:"더 아일랜드 · 크로스로드",series:"bob",episode:"5",summary:"마켓가든 이후 이지 중대가 네이메헌 북쪽 강 사이의 '아일랜드'를 지킴. 윈터스가 새벽 도로 교차로(크로스로드)에서 독일 SS 부대를 기습해 격퇴한 전투가 5화의 핵심.",routes:[["네이메헌",5.85,51.84,"더 아일랜드",5.9,51.95,"allied","para"]]},
      {id:"pacific-leyte",theater:"pacific",sortDate:"1944-10-23",date:"1944년 10월 23~26일",title:"레이테만 해전",summary:"사상 최대 규모의 해전에서 일본 연합함대가 결정적 타격을 입음.",routes:[["뉴기니",141,-6,"레이테",125,10.9]]},
      {id:"west-bulge",theater:"west",sortDate:"1944-12-16",date:"1944년 12월 16일~1945년 1월 25일",title:"벌지 전투",summary:"독일군의 아르덴 기습 반격이 초기 성과 뒤 연합군에게 저지됨.",routes:[["아이펠",6.5,50.3,"바스토뉴",5.72,50.0]]},
      {id:"west-bastogne",theater:"west",sortDate:"1944-12-19",date:"1944년 12월 19일~1945년 1월",title:"바스토뉴 방어",series:"bob",episode:"6~7",summary:"벌지 전투에서 미 101공수사단이 요충지 바스토뉴에서 포위된 채 혹한과 포격을 견디며 방어. 이지 중대는 인근 숲에서 버티다 1월 푸아를 공격해 탈환.",routes:[["랭스",4.03,49.26,"바스토뉴",5.72,50.0,"allied","para"],["바스토뉴",5.72,50.0,"푸아",5.79,50.05,"allied","para"]]},
      {id:"pacific-iwojima",theater:"pacific",sortDate:"1945-02-19",date:"1945년 2월 19일~3월 26일",title:"이오지마 전투",summary:"미 해병대가 막대한 희생 끝에 이오지마를 점령해 본토 폭격 기지를 확보.",routes:[["사이판",145.75,15.18,"이오지마",141.32,24.78]]},
      {id:"west-haguenau",theater:"west",sortDate:"1945-02-05",date:"1945년 2월",title:"아그누 전투",series:"bob",episode:"8",summary:"이지 중대가 알자스의 아그누에서 모데르강을 사이에 두고 독일군과 대치. 야간 정찰대를 보내 포로를 잡는 작전을 수행.",routes:[["바스토뉴",5.72,50.0,"아그누",7.79,48.82,"allied","para"]]},
      {id:"west-rhine",theater:"west",sortDate:"1945-03-07",date:"1945년 3월 7일",title:"레마겐 라인강 도하",summary:"연합군이 레마겐의 철교를 확보해 라인강을 건너 독일 본토로 진격.",routes:[["아헨",6.08,50.78,"레마겐",7.23,50.58]]},
      {id:"pacific-okinawa",theater:"pacific",sortDate:"1945-04-01",date:"1945년 4월 1일~6월 22일",title:"오키나와 전투",summary:"연합군이 오키나와를 점령했으나 양측 모두 막대한 피해를 입음.",routes:[["필리핀",122,13,"오키나와",127.8,26.34]]},
      {id:"east-berlin",theater:"east",sortDate:"1945-04-16",date:"1945년 4월 16일~5월 2일",title:"베를린 전투",summary:"동쪽에서 소련군이 베를린을 포위·함락하고, 서쪽에서 진격한 미·영 연합군이 엘베강에서 소련군과 합류. 히틀러가 자살하고 나치 독일이 붕괴함.",routes:[["오데르강",14.64,52.57,"베를린",13.41,52.52,"soviet","land"],["루르",7.3,51.4,"엘베강",11.6,52.2,"allied","land"]]},
      {id:"west-landsberg",theater:"west",sortDate:"1945-04-27",date:"1945년 4월 27일",title:"카우퍼링 수용소 발견",series:"bob",episode:"9",summary:"이지 중대가 란츠베르크 인근 카우퍼링 강제수용소를 발견하고 참상을 목격. 나치의 홀로코스트 실상이 병사들에게 드러남.",routes:[["아그누",7.79,48.82,"란츠베르크",10.87,48.05,"allied","para"]]},
      {id:"west-eagles-nest",theater:"west",sortDate:"1945-05-05",date:"1945년 5월 5일",title:"독수리 둥지 점령",series:"bob",episode:"10",summary:"이지 중대가 베르히테스가덴과 히틀러의 산장 켈슈타인하우스(독수리 둥지)를 점령. 유럽 전쟁의 상징적 종착점.",routes:[["란츠베르크",10.87,48.05,"베르히테스가덴",13.04,47.63,"allied","para"]]},
      {id:"west-ve-day",theater:"west",sortDate:"1945-05-08",date:"1945년 5월 8일",title:"독일 항복(유럽 전승일)",summary:"독일이 무조건 항복하고 유럽에서의 전쟁이 끝남.",routes:[]},
      {id:"pacific-hiroshima",theater:"pacific",sortDate:"1945-08-06",date:"1945년 8월 6일",title:"히로시마 원자폭탄 투하",summary:"미군이 히로시마에 원자폭탄을 투하해 도시가 파괴되고 막대한 사상자가 발생.",routes:[["티니안",145.63,15.0,"히로시마",132.46,34.39]]},
      {id:"east-manchuria",theater:"east",sortDate:"1945-08-08",date:"1945년 8월 8~9일",title:"소련의 대일 참전·만주 침공",summary:"소련이 일본에 선전포고하고 만주로 진격해 관동군을 붕괴시킴.",routes:[["치타",113.5,52.03,"하얼빈",126.53,45.8],["블라디보스토크",131.89,43.12,"지린",126.55,43.84]]},
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
  manchuria:{"392":"axis","156":"axis","643":"soviet"}
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
  "west-normandy":{countries:"normandy",sides:["allied","bob"],types:["landing","para"],view:[[-2,48.9],[0.5,48.9],[0.5,50],[-2,50]]},
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
  "west-carentan":{countries:"normandy",sides:"bob",types:"para",view:[[-1.6,49.1],[-0.8,49.1],[-0.8,49.6],[-1.6,49.6]]},
  "west-market-garden":{countries:"westLate",sides:["bob","bob"],types:["para","land"],view:[[4.8,51.2],[6.4,51.2],[6.4,52.2],[4.8,52.2]]},
  "west-the-island":{countries:"westLate",sides:"bob",types:"para",view:[[5.4,51.6],[6.4,51.6],[6.4,52.2],[5.4,52.2]]},
  "west-bastogne":{countries:"westLate",sides:["bob","bob"],types:["para","para"],view:[[4.6,49.5],[6.6,49.5],[6.6,50.5],[4.6,50.5]]},
  "west-haguenau":{countries:"westLate",sides:"bob",types:"para",view:[[5,48.3],[9,48.3],[9,50.6],[5,50.6]]},
  "west-landsberg":{countries:"westLate",sides:"bob",types:"para",view:[[7,47.6],[11.6,47.6],[11.6,49.4],[7,49.4]]},
  "west-eagles-nest":{countries:"westLate",sides:"bob",types:"para",view:[[10.4,47.3],[13.6,47.3],[13.6,48.6],[10.4,48.6]]}
};
const detailedNoRouteEvents=["west-ve-day","pacific-surrender-announce"];

const sideMapLabels={allied:"연합군",axis:"추축군",soviet:"소련군",finnish:"핀란드군",neutral:"중립",bob:"101 공수사단"};
const unitMapLabels={land:"기갑",naval:"함대",air:"폭격기",landing:"상륙정",para:"공수"};
const unitTypeByRoute={land:"tank",naval:"ship",air:"bomber",landing:"landing",para:"para"};
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
  seriesLabels:{bob:"BAND OF BROTHERS",pacific:"THE PACIFIC",mota:"MASTERS OF THE AIR"},
  yearMarkers: ["1937-01-01","1939-01-01","1940-01-01","1941-01-01","1942-01-01","1943-01-01","1944-01-01","1945-01-01"]
};
