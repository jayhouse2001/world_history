const lanes = [
  {id:"vietnam",name:"베트남 · 전장",bounds:[[102.0,8.2],[110.0,23.5]]},
  {id:"usa",name:"미국 · 워싱턴",bounds:[[102.0,8.2],[110.0,23.5]],status:[
    {from:"1953-01-20",to:"1961-01-20",label:"아이젠하워 대통령",end:"퇴임"},
    {from:"1961-01-20",to:"1963-11-22",label:"케네디 대통령",end:"암살"},
    {from:"1963-11-22",to:"1969-01-20",label:"존슨 대통령",end:"퇴임"},
    {from:"1969-01-20",to:"1974-08-09",label:"닉슨 대통령",end:"사임"},
    {from:"1974-08-09",to:"1977-01-20",label:"포드 대통령",end:"퇴임"}
  ]}
];

const alliedTerritory={side:"allied",label:"남베트남군·미군"};
const axisTerritory={side:"axis",label:"북베트남군·베트콩"};
const commonNote="현대 국경 기준 · 작전 범위와 이동 방향은 미 육군 공식 전사 지도를 바탕으로 개략 표시";

const events = [
  {
    id:"vietnam-group-559",theater:"vietnam",sortDate:"1959-05-19",
    date:"1959년 5월 19일",title:"559수송단 창설·호찌민 루트 개척",
    summary:"북베트남군이 라오스 동부와 DMZ 일대를 거쳐 남부로 병력과 물자를 보내는 군사 보급망을 조직하기 시작.",
    detail:"북베트남 인민군은 559수송단을 창설해 쯔엉선 산맥을 따라 남베트남으로 이어지는 보급로를 개척했다. 초기에는 도보 운반과 소규모 은밀 침투가 중심이었으며, 이후 라오스와 캄보디아를 통과하는 대규모 도로망으로 확대됐다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[103.59,14.77],[108.61,14.77],[108.61,18.03],[103.59,18.03]],
    routes:[["북베트남",106.6,17.5,"라오스 동부",106.1,16.2,"axis","land"],["라오스 동부",106.1,16.2,"남베트남 북부",106.7,15.5,"axis","land"]],
    zones:[{kind:"operation",side:"axis",coordinates:[[105.7,17.6],[106.3,17.5],[106.6,16.6],[106.4,15.5],[105.8,15.2],[105.5,16.2]],label:"초기 보급 회랑",labelAt:[105.9,16.5]}],
    units:[{type:"truck",side:"axis",at:[106.05,16.35],heading:175,label:"북베트남군 보급대",showLabel:false}],
    legend:{title:"표현 범례",territories:[axisTerritory],routes:[{side:"axis",label:"침투·보급 방향"}],units:[{type:"truck",side:"axis",label:"북베트남군 보급대"}],colors:[{side:"axis",label:"주황: 공산군"}]}
  },
  {
    id:"vietnam-us-bien-hoa",theater:"usa",sortDate:"1959-07-08",
    date:"1959년 7월 8일",title:"미 군사고문 첫 전사",
    summary:"비엔호아의 미 군사고문단 숙소가 베트콩의 기습을 받아 고문관 2명이 숨졌다. 베트남에서 전사한 첫 미군으로 기록됐다.",
    detail:"아이젠하워 행정부는 1955년부터 군사원조고문단을 두고 남베트남군 훈련을 지원했다. 고문단 규모는 수백 명 수준이었고 전투 임무는 없었다.\n\n데일 뷰이스 소령과 체스터 오브낸드 상사가 숙소에서 영화를 보던 중 공격받아 숨졌다. 이름은 워싱턴 베트남전 참전 기념비에 가장 먼저 새겨졌다."
  },
  {
    id:"vietnam-us-kennedy",theater:"usa",sortDate:"1961-01-20",
    date:"1961년 1월 20일 취임 · 1962년 2월 8일 MACV 창설",title:"케네디 취임 · 군사고문단 확대",
    summary:"케네디 행정부가 남베트남 지원을 크게 늘렸다. 주베트남 미군사령부(MACV)를 만들고 고문단을 약 900명에서 1만 6천 명으로 키웠다.",
    detail:"케네디는 라오스·쿠바에서의 후퇴 뒤 동남아시아에서 공산화를 막아야 한다는 도미노 이론을 이어받았다. 헬기 부대와 특수부대를 보내고 전략촌 계획을 지원했다.\n\n고문관들은 형식상 전투 부대가 아니었지만 헬기 조종과 작전 동행으로 실제 전투에 점점 깊이 들어갔다."
  },
  {
    id:"vietnam-ap-bac",theater:"vietnam",sortDate:"1963-01-02",
    date:"1963년 1월 2일",title:"압박 전투",
    summary:"남베트남군이 미군 고문단과 헬기 지원을 받아 베트콩 부대를 공격했지만 큰 피해를 입고 격퇴됨.",
    detail:"미토 북서쪽 압박에서 남베트남군은 베트콩 제261·514대대를 포위하려 했다. 베트콩은 헬기와 장갑차를 상대로 진지를 지키고 철수했으며, 전쟁 초기 남베트남군 지휘와 미군 지원 방식의 문제를 드러낸 전투가 됐다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[105.94,10.21],[106.49,10.21],[106.49,10.58],[105.94,10.58]],
    routes:[["미토",106.36,10.36,"압박",106.17,10.43,"allied","air"],["남베트남군 집결지",106.30,10.27,"압박",106.17,10.43,"allied","land"]],
    zones:[{kind:"operation",side:"axis",coordinates:[[106.08,10.37],[106.22,10.35],[106.28,10.44],[106.18,10.52],[106.07,10.48]],label:"베트콩 방어진지",labelAt:[106.16,10.45]}],
    units:[{type:"helicopter",side:"allied",at:[106.29,10.42],heading:250,label:"헬리본 지원",showLabel:false},{type:"infantry",side:"allied",at:[106.23,10.31],heading:330,label:"남베트남군",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"allied",label:"남베트남군 공격"}],units:[{type:"helicopter",side:"allied",label:"헬리본 지원"},{type:"infantry",side:"allied",label:"남베트남군"}],colors:[{side:"allied",label:"파랑: 남베트남 측"},{side:"axis",label:"주황: 베트콩"}]}
  },
  {
    id:"vietnam-diem-coup",theater:"vietnam",sortDate:"1963-11-01",
    date:"1963년 11월 1~2일",title:"응오딘지엠 정권 붕괴",
    summary:"남베트남 군부가 쿠데타로 응오딘지엠 대통령을 축출하고 살해했다. 이후 남베트남은 잇단 쿠데타로 정국이 흔들렸다.",
    detail:"불교도 탄압과 부패로 민심을 잃은 지엠 정권에 미국이 지지를 거두자, 즈엉반민 장군 등이 11월 1일 쿠데타를 일으켰다. 지엠과 동생 응오딘뉴는 이튿날 체포된 뒤 살해됐다.\n\n이후 1965년까지 군사정권이 여러 차례 바뀌며 남베트남 정부는 스스로 전쟁을 수행할 힘을 잃었고, 미국의 직접 개입이 커지는 배경이 됐다."
  },
  {
    id:"vietnam-us-johnson",theater:"usa",sortDate:"1963-11-22",
    date:"1963년 11월 22일",title:"케네디 암살 · 존슨 승계",
    summary:"케네디가 댈러스에서 암살되고 린든 존슨 부통령이 대통령직을 이었다. 지엠 정권 붕괴 3주 뒤였다.",
    detail:"존슨은 케네디의 베트남 정책을 이어가겠다고 밝혔다. 남베트남 정국이 흔들리는 상황에서 미국의 개입은 고문단 수준을 넘어서는 방향으로 움직이기 시작했다."
  },
  {
    id:"vietnam-us-tonkin",theater:"usa",sortDate:"1964-08-07",
    date:"1964년 8월 2일 교전 · 8월 7일 결의 통과",title:"통킹만 사건 · 통킹만 결의",
    summary:"통킹만에서 미 구축함과 북베트남 어뢰정의 교전이 보고되자, 의회가 대통령에게 군사력 사용 권한을 넘겨주는 결의를 통과시켰다.",
    detail:"8월 2일 구축함 매덕스함이 북베트남 어뢰정과 교전했고, 8월 4일 두 번째 공격이 보고됐다. 두 번째 공격은 이후 실제로 없었던 것으로 밝혀졌다.\n\n결의안은 하원 416 대 0, 상원 88 대 2로 통과됐다. 선전포고 없이 전쟁을 확대할 법적 근거가 됐다."
  },
  {
    id:"vietnam-us-escalation",theater:"usa",sortDate:"1965-03-02",
    date:"1965년 3월 2일 폭격 개시 · 7월 28일 증파 발표",title:"롤링썬더 북폭 · 지상군 대규모 증파",
    summary:"존슨 행정부가 북베트남 지속 폭격을 시작하고, 7월에는 주둔 병력을 12만 5천 명으로 늘리는 대규모 증파를 발표했다.",
    detail:"롤링썬더 작전은 1968년 11월까지 이어진 북베트남 폭격이다. 3월 8일 다낭에 해병대가 상륙하며 지상 전투부대 투입도 시작됐다.\n\n7월 28일 존슨은 징집 인원을 두 배로 늘린다고 발표했다. 미군 병력은 1965년 말 18만여 명, 1969년 4월 최대 54만 3천여 명까지 늘었다."
  },
  {
    id:"vietnam-danang",theater:"vietnam",sortDate:"1965-03-08",
    date:"1965년 3월 8일",title:"미 해병대 다낭 상륙",
    summary:"미 제9해병원정여단이 다낭에 상륙하면서 미군 지상전투부대의 본격적인 베트남 투입이 시작됨.",
    detail:"미 해병대 2개 대대가 다낭 해변과 공항으로 들어와 공군기지를 방어했다. 처음에는 방어 임무였으나 작전 범위가 빠르게 확대되면서 미군의 직접 지상전 개입이 본격화됐다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[107.89,15.74],[108.94,15.74],[108.94,16.43],[107.89,16.43]],
    routes:[["남중국해",108.8,16.0,"다낭",108.20,16.07,"allied","landing"]],
    zones:[{kind:"control",side:"allied",coordinates:[[108.08,15.92],[108.31,15.91],[108.39,16.13],[108.20,16.26],[108.03,16.16]],label:"다낭 기지 방어권",labelAt:[108.17,16.12]}],
    units:[{type:"landing",side:"allied",at:[108.45,16.02],heading:270,label:"미 해병대",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory],routes:[{side:"allied",label:"미 해병대 상륙"}],units:[{type:"landing",side:"allied",label:"미 해병대"}],colors:[{side:"allied",label:"파랑: 연합군"}]}
  },
  {
    id:"vietnam-ia-drang",theater:"vietnam",sortDate:"1965-11-14",
    date:"1965년 11월 14~18일",title:"이아드랑 전투",
    endDate:"1965-11-18",
    summary:"미 제1기병사단과 북베트남군이 플레이미·이아드랑 계곡에서 처음으로 대규모 정면전을 벌임.",
    detail:"미군은 헬리콥터로 X-Ray 착륙지대에 투입되어 북베트남군과 격전을 벌였다. 이후 Albany 착륙지대로 이동하던 미군 부대가 매복 공격을 받았다. 헬리본 전술과 대규모 화력지원의 가능성과 한계가 함께 드러난 전투였다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[107.28,13.27],[108.25,13.27],[108.25,13.9],[107.28,13.9]],
    routes:[["플레이미",108.05,13.60,"LZ X-Ray",107.72,13.58,"allied","air"],["추퐁산",107.67,13.55,"LZ X-Ray",107.72,13.58,"axis","land"]],
    zones:[{kind:"contested",side:"neutral",coordinates:[[107.52,13.39],[107.88,13.35],[108.00,13.67],[107.77,13.82],[107.48,13.68]],label:"이아드랑 전장",labelAt:[107.70,13.48]}],
    units:[{type:"helicopter",side:"allied",at:[107.86,13.63],heading:250,label:"미 제1기병사단",showLabel:false},{type:"infantry",side:"axis",at:[107.61,13.54],heading:90,label:"북베트남군",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"allied",label:"미군 헬리본 투입"},{side:"axis",label:"북베트남군 공격"}],units:[{type:"helicopter",side:"allied",label:"미 제1기병사단"},{type:"infantry",side:"axis",label:"북베트남군"}],colors:[{side:"allied",label:"파랑: 미군"},{side:"axis",label:"주황: 북베트남군"}]}
  },
  {
    id:"vietnam-junction-city",theater:"vietnam",sortDate:"1967-02-22",
    date:"1967년 2월 22일~5월 14일",title:"정션시티 작전 · 공수 강하",
    endDate:"1967-05-14",
    summary:"타이닌성 C 전투지역에서 공산군 남부 사령부를 겨냥한 82일간의 대규모 작전. 베트남전쟁 유일의 대규모 미군 공수 강하가 실시됨.",
    detail:"2월 22일 B-52 폭격에 이어 제173공수여단 예하 부대가 C-130 13대에서 까뚬 북쪽 강하지대로 낙하했다. 한국전쟁 이후 미 육군 최초의 전투 공수작전이었다. 미군 22개 대대와 남베트남군 4개 대대, 포병 17개 대대가 말굽 형태로 포위한 뒤 안쪽을 훑었다.\n\n쁘렉끌록, 압바우방, 쑤오이째, 압구에서 격전이 벌어졌다. 미군은 282명이 전사하고 1,576명이 부상했으며 베트콩 전사자는 2,728명으로 집계됐다. 쌀 810톤과 무기 600톤을 확보했지만 남부 사령부는 찾지 못했고 베트콩 제9사단은 캄보디아 성역으로 물러났다. 국경 차단 실패가 1970년 캄보디아 침공의 직접적 배경이 됐다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[105.48,10.82],[107.28,10.82],[107.28,12.02],[105.48,12.02]],
    routes:[["비엔호아",106.82,10.98,"까뚬 강하지대",106.22,11.67,"allied","para"],["타이닌",106.10,11.31,"C 전투지역",106.26,11.58,"allied","land"]],
    zones:[{kind:"operation",side:"allied",coordinates:[[106.02,11.36],[106.44,11.32],[106.52,11.76],[106.20,11.86],[105.94,11.62]],label:"말굽 포위 구역(개략)",labelAt:[106.22,11.50]}],
    units:[{type:"para",side:"allied",at:[106.22,11.67],heading:180,label:"제173공수여단",showLabel:false},{type:"tank",side:"allied",at:[106.34,11.44],heading:320,label:"기갑 수색",showLabel:false},{type:"infantry",side:"axis",at:[106.10,11.70],heading:250,label:"베트콩 제9사단",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"allied",label:"공수 강하·지상 진출"}],units:[{type:"para",side:"allied",label:"제173공수여단"},{type:"tank",side:"allied",label:"기갑 수색"},{type:"infantry",side:"axis",label:"베트콩 제9사단"}],colors:[{side:"allied",label:"파랑: 미군·남베트남군"},{side:"axis",label:"주황: 베트콩"}]}
  },
  {
    id:"vietnam-khe-sanh",theater:"vietnam",sortDate:"1968-01-21",
    date:"1968년 1월 21일~4월 8일 (기지 철수 7월 9일)",title:"케산 포위전",
    endDate:"1968-04-08",
    summary:"북베트남군 2~3개 사단이 라오스 국경 근처 미 해병대 케산 기지를 77일간 포위하고 포격했다. 보급은 전적으로 항공으로 이뤄졌다.",
    detail:"1월 21일 첫 포격으로 기지 탄약의 약 90%가 파괴된 뒤, 제26해병연대는 항공 보급만으로 버텼다. 나이아가라 작전으로 주변 고지에 약 10만 톤의 폭탄이 투하됐고, B-52 폭격은 방어선 불과 수백 미터 앞까지 유도됐다.\n\n디엔비엔푸의 기억에 시달린 존슨 대통령은 합참에 기지 사수를 문서로 보증하라고 요구했다. 4월 8일 미 제1기병사단의 페가수스 작전이 9번 도로를 열고 해병대와 연결해 포위를 풀었다.\n\n기지에서 미군 274명이 전사하고 2,541명이 부상했으며 구원 작전에서 730명이 더 전사했다. 그러나 기지는 7월에 조용히 해체·철수되어, 사수의 전략적 필요성 자체에 의문이 남았다. 케산이 구정 대공세를 가린 양동이었는지, 반대로 구정이 케산에 쏠린 시선을 이용한 것인지는 지금도 논쟁거리다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[106.34,16.4],[107.22,16.4],[107.22,16.96],[106.34,16.96]],
    routes:[["라오스 국경",106.50,16.62,"케산 기지",106.72,16.65,"axis","land"],["동하",107.10,16.82,"케산 기지",106.75,16.66,"allied","air"]],
    zones:[{kind:"control",side:"axis",coordinates:[[106.54,16.50],[106.92,16.48],[106.98,16.82],[106.70,16.88],[106.46,16.70]],label:"북베트남군 포위(개략)",labelAt:[106.60,16.78]},{kind:"control",side:"allied",coordinates:[[106.67,16.61],[106.79,16.60],[106.81,16.70],[106.71,16.72],[106.63,16.67]],label:"케산 기지",labelAt:[106.73,16.65]}],
    units:[{type:"infantry",side:"allied",at:[106.73,16.65],heading:0,label:"제26해병연대",showLabel:false},{type:"bomber",side:"allied",at:[106.90,16.74],heading:240,label:"B-52 폭격",showLabel:false},{type:"infantry",side:"axis",at:[106.58,16.72],heading:120,label:"북베트남군",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"axis",label:"북베트남군 포위"},{side:"allied",label:"항공 보급"}],units:[{type:"infantry",side:"allied",label:"제26해병연대"},{type:"bomber",side:"allied",label:"B-52 폭격"},{type:"infantry",side:"axis",label:"북베트남군"}],colors:[{side:"allied",label:"파랑: 미 해병대"},{side:"axis",label:"주황: 북베트남군"}]}
  },
  {
    id:"vietnam-tet-saigon",theater:"vietnam",sortDate:"1968-01-31",
    date:"1968년 1월 31일~3월 20일",title:"구정 대공세 · 사이공과 후에",
    endDate:"1968-03-20",
    faction:"axis",
    summary:"북베트남군·베트콩 약 7만 7천 명이 구정 휴전을 깨고 남베트남 전역 100여 개 도시를 동시에 공격했다. 사이공에서는 특공조가 미 대사관 담을 뚫었고, 옛 왕도 후에는 한 달간 시가전 끝에 되찾았다.",
    detail:"음력 계산 차이로 1월 30일 일부 지역에서 먼저 공격이 시작되어 연합군에 몇 시간의 경고가 주어졌고, 31일 전국적 총공세가 이어졌다. 44개 성도 중 36개가 공격받았다.\n\n사이공에서는 대통령궁, 남베트남군 합동참모본부, 떤선녓 공군기지, 국영 라디오 방송국, 미 대사관이 동시에 타격됐다. 대사관에서는 베트콩 C-10 특공대대 15명이 외벽을 폭파해 구내로 들어갔으나 지휘관이 즉시 사살되어 본관에는 진입하지 못했고, 약 6시간 뒤 옥상으로 투입된 미군 증원에 제압됐다. 특공대 12명 전사, 3명 생포, 미군 헌병 4명과 해병 1명이 전사했다.\n\n군사적으로는 공산군의 참패였다. 기대한 민중 봉기는 없었고 베트콩의 남부 조직은 사실상 소멸했다. 그러나 병력 50만을 투입한 뒤에도 미 대사관에서 총격전이 벌어지는 장면이 방송되면서 낙관적 공식 발표의 신뢰가 무너졌고, 미국 여론이 전쟁에 등을 돌리는 정치적 분기점이 됐다.\n\n후에에서는 공산군이 왕성에 깃발을 올린 뒤 3월 2일까지 버텼다. 연합군은 708명이 전사하고, 민간인 5,800~8,000명이 사망했으며 그중 2,000명 이상은 공산군에 처형된 `후에 학살` 희생자다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[106.26,10.48],[107.08,10.48],[107.08,11.02],[106.26,11.02]],
    routes:[["쿠찌 방면",106.50,10.95,"사이공",106.70,10.78,"axis","land"],["메콩 삼각주 방면",106.55,10.55,"사이공",106.69,10.76,"axis","land"],["미 대사관",106.70,10.783,"떤선녓 기지",106.66,10.81,"allied","land"]],
    zones:[{kind:"contested",side:"axis",coordinates:[[106.60,10.70],[106.80,10.69],[106.84,10.86],[106.68,10.90],[106.56,10.82]],label:"사이공 시내 교전 구역",labelAt:[106.72,10.74]}],
    units:[{type:"infantry",side:"axis",at:[106.64,10.84],heading:150,label:"베트콩 특공대",showLabel:false},{type:"infantry",side:"allied",at:[106.74,10.79],heading:290,label:"미군·남베트남군",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"axis",label:"공산군 침투·공격"},{side:"allied",label:"연합군 대응"}],units:[{type:"infantry",side:"axis",label:"베트콩 특공대"},{type:"infantry",side:"allied",label:"미군·남베트남군"}],colors:[{side:"axis",label:"주황: 공산군"},{side:"allied",label:"파랑: 연합군"}]}
  },
  {
    id:"vietnam-my-lai",theater:"vietnam",sortDate:"1968-03-16",
    date:"1968년 3월 16일",title:"미라이 학살",
    summary:"미 제23보병사단(아메리컬) 예하 찰리 중대가 꽝응아이성 선미 마을에서 비무장 민간인 수백 명을 학살했다.",
    detail:"바커 특수임무부대는 베트콩 제48지방대대를 찾아 선미에 진입했지만, 마을에는 장날을 준비하던 여성과 아이, 노인만 있었다. 수색 중 시작된 살해는 게릴라가 없다는 것이 분명해진 뒤에도 계속됐고, 다수를 관개 수로에 몰아넣어 사살했다.\n\n헬기 조종사 휴 톰프슨 주니어가 병사들과 생존자 사이에 헬기를 착륙시켜 민간인을 후송하고 학살을 보고했지만, 이 작전은 `적 128명 사살`의 전과로 기록되어 20개월간 은폐됐다.\n\n베트남 측 집계는 두 마을 합쳐 504명, 미 육군 자체 조사는 347명이다. 1969년 11월 시모어 허시의 폭로와 이어진 피어스 조사로 26명이 기소됐으나 유죄는 윌리엄 캘리 중위 한 명뿐이었고 그의 형량도 결국 몇 년의 가택연금으로 줄었다. 미국 내 반전 여론을 되돌릴 수 없게 바꾼 사건이다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[108.69,15.06],[109.05,15.06],[109.05,15.3],[108.69,15.3]],
    routes:[["꽝응아이",108.80,15.12,"선미(미라이)",108.87,15.18,"allied","air"]],
    zones:[{kind:"operation",side:"allied",coordinates:[[108.83,15.14],[108.92,15.13],[108.94,15.22],[108.87,15.24],[108.81,15.20]],label:"선미 마을 일대",labelAt:[108.875,15.185]}],
    units:[{type:"helicopter",side:"allied",at:[108.90,15.21],heading:230,label:"미군 헬기",showLabel:false},{type:"infantry",side:"allied",at:[108.86,15.17],heading:60,label:"찰리 중대",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory],routes:[{side:"allied",label:"미군 진입"}],units:[{type:"helicopter",side:"allied",label:"미군 헬기"},{type:"infantry",side:"allied",label:"찰리 중대"}],colors:[{side:"allied",label:"파랑: 미군"}]}
  },
  {
    id:"vietnam-us-johnson-exit",theater:"usa",sortDate:"1968-03-31",
    date:"1968년 3월 31일",title:"존슨 재선 불출마 · 북폭 제한",
    summary:"구정 대공세 두 달 뒤, 존슨이 북베트남 폭격을 대부분 멈추고 협상을 제안하며 재선에 나서지 않겠다고 발표했다.",
    detail:"구정 대공세 보도로 전쟁이 곧 끝난다는 정부 발표를 믿는 사람이 크게 줄었다. 추가 20만 명 증파 요청은 받아들여지지 않았다.\n\n5월부터 파리에서 평화 회담이 시작됐다. 미국의 목표가 승리에서 협상을 통한 철수로 바뀌는 분기점이었다."
  },
  {
    id:"vietnam-us-nixon",theater:"usa",sortDate:"1969-01-20",
    date:"1969년 1월 20일 취임 · 6월 8일 첫 철군 발표",title:"닉슨 취임 · 베트남화 정책",
    summary:"닉슨이 전투를 남베트남군에 넘기고 미군을 단계적으로 빼는 `베트남화`를 내세웠다. 6월 첫 2만 5천 명 철수를 발표했다.",
    detail:"닉슨은 `명예로운 평화`를 약속하며 당선됐다. 미군을 줄이는 한편 남베트남군을 증강하고, 비밀 캄보디아 폭격과 협상을 함께 진행했다.\n\n7월 괌에서 발표한 닉슨 독트린은 동맹국이 자국 방어를 스스로 책임져야 한다는 원칙을 밝혔다."
  },
  {
    id:"vietnam-cambodia",theater:"vietnam",sortDate:"1970-04-29",
    date:"1970년 4월 29일~7월 22일",title:"캄보디아 침공",
    endDate:"1970-07-22",
    summary:"미군·남베트남군이 캄보디아 동부 국경 성역의 공산군 약 4만 명과 남부 사령부를 겨냥해 13개 작전으로 진입했다.",
    detail:"1970년 3월 시아누크를 축출하고 친서방 론 놀 정권이 들어서면서 직접 개입의 정치적 장애가 사라졌다. 닉슨은 4월 26일 침공을 승인하되 진입 깊이 30km, 6월 30일 미군 철수를 조건으로 걸었다.\n\n남베트남군이 먼저 `앵무새 부리` 지역을 쳤고, 5월 1일 B-52 36대가 774톤을 투하한 뒤 미 제1기병사단 기동부대와 남베트남군 기갑이 `낚싯바늘` 지역의 메못·스누올로 진격해 `더 시티`를 포함한 대규모 보급 기지를 찾아냈다.\n\n미군 338명, 남베트남군 638명이 전사하고 공산군은 11,369명 전사, 2,328명이 포로가 됐다. 확보한 물자는 3군단 지역에서 베트남화 계획에 약 1년의 여유를 줬다. 그러나 미국에서는 켄트주립대·잭슨주립대 발포와 전국 대학 파업으로 이어지는 최대 규모 반전 폭발을 불렀고, 캄보디아를 전쟁에 완전히 끌어들여 크메르루주의 집권 기반을 만들었다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[104.71,10.56],[107.63,10.56],[107.63,12.5],[104.71,12.5]],
    routes:[["남베트남 3군단",106.30,11.20,"앵무새 부리",106.01,11.04,"allied","land"],["떠이닌",106.10,11.31,"낚싯바늘·메못",106.19,11.82,"allied","land"],["낚싯바늘",106.19,11.82,"스누올",106.45,12.07,"allied","land"]],
    zones:[{kind:"operation",side:"allied",coordinates:[[105.82,10.86],[106.22,10.82],[106.30,11.24],[106.02,11.32],[105.76,11.10]],label:"앵무새 부리 작전 구역(개략)",labelAt:[106.02,11.02]},{kind:"operation",side:"allied",coordinates:[[105.98,11.62],[106.42,11.58],[106.58,12.12],[106.24,12.24],[105.92,11.94]],label:"낚싯바늘 작전 구역(개략)",labelAt:[106.22,11.86]}],
    units:[{type:"tank",side:"allied",at:[106.32,11.94],heading:35,label:"미 제1기병 기동부대",showLabel:false},{type:"bomber",side:"allied",at:[106.10,11.70],heading:20,label:"B-52 폭격",showLabel:false},{type:"truck",side:"axis",at:[106.06,11.16],heading:200,label:"공산군 보급 기지",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"allied",label:"미군·남베트남군 진입"}],units:[{type:"tank",side:"allied",label:"미군 기갑"},{type:"bomber",side:"allied",label:"B-52 폭격"},{type:"truck",side:"axis",label:"공산군 보급"}],colors:[{side:"allied",label:"파랑: 미군·남베트남군"},{side:"axis",label:"주황: 공산군 성역"}]}
  },
  {
    id:"vietnam-us-kent-state",theater:"usa",sortDate:"1970-05-04",
    date:"1970년 5월 4일",title:"켄트 주립대 총격",
    summary:"캄보디아 침공에 항의하던 오하이오 켄트 주립대 학생들에게 주 방위군이 발포해 4명이 숨졌다. 전국 대학가에 반전 시위가 번졌다.",
    detail:"닉슨이 4월 30일 캄보디아 진공을 발표하자 대학가 시위가 커졌다. 총격으로 4명이 숨지고 9명이 다쳤다.\n\n이후 수백 개 대학이 휴교했고, 의회는 캄보디아 작전 예산을 제한하는 쿠퍼-처치 수정안을 추진했다."
  },
  {
    id:"vietnam-lam-son-719",theater:"vietnam",sortDate:"1971-02-08",
    date:"1971년 2월 8일~3월 25일",title:"람손 719 작전 · 라오스 진공",
    endDate:"1971-03-25",
    faction:"axis",
    summary:"남베트남군이 호찌민 루트를 끊기 위해 라오스 체폰까지 진격한 베트남화 정책의 첫 시험. 미군 지상 병력 없이 진행되어 큰 피해를 입고 철수함.",
    detail:"남베트남군 약 1만 7천 명이 9번 도로를 따라 라오스 42km 지점 체폰으로 진격했다. 미군은 항공 수송과 화력을 지원했지만 쿠퍼-처치 수정안 때문에 지상 병력과 고문단은 라오스에 들어갈 수 없었고, 남베트남군의 지휘·통제는 바로 그 미군 고문단에 의존하고 있었다.\n\n북베트남군은 공격을 예상하고 5개 사단을 전례 없는 기갑·대공 전력과 함께 투입해, 능선 위에 노출된 화력기지를 하나씩 무너뜨렸다. 2월에 레인저 북·남 기지와 31화력기지가 함락됐다.\n\n3월 6일 헬기로 투입된 1개 대대가 폐허가 된 체폰에 도달해 이틀간 상징적으로 점령한 뒤, 티에우 대통령이 철수를 명령했고 일부 지역에서 철수는 궤멸로 변했다. 헬기 스키드에 매달린 병사들의 사진이 전 세계에 퍼졌다.\n\n남베트남군 전사자는 1,146~8,843명으로 자료마다 크게 다르고 실종·포로 1,767명, 미군 전사 215명, 헬기 108대가 파괴되고 600대 이상이 손상됐다. 미군 지상 지원이 빠지면 정예 남베트남군조차 북베트남군 정규군에 패한다는 사실이 드러나 베트남화 정책의 신뢰가 무너졌고, 하노이는 1972년 재래식 대공세를 준비하게 됐다.",
    mapDesign:"war-v1",mapNote:commonNote,mapView:[[105.85,16.45],[106.85,16.45],[106.85,17.11],[105.85,17.11]],
    routes:[["케산",106.72,16.654,"9번 도로 서진",106.45,16.68,"allied","land"],["9번 도로",106.45,16.68,"체폰",106.233,16.683,"allied","air"],["31화력기지",106.426,16.715,"철수 방향",106.68,16.66,"allied","air"],["북베트남군 증원",106.10,16.86,"31화력기지",106.40,16.72,"axis","land"]],
    zones:[{kind:"operation",side:"allied",coordinates:[[106.14,16.58],[106.66,16.56],[106.72,16.80],[106.30,16.86],[106.08,16.72]],label:"9번 도로 진공 구역(개략)",labelAt:[106.40,16.62]},{kind:"contested",side:"axis",coordinates:[[106.04,16.72],[106.36,16.70],[106.42,16.94],[106.18,17.00],[105.98,16.86]],label:"북베트남군 집결(개략)",labelAt:[106.16,16.90]}],
    units:[{type:"helicopter",side:"allied",at:[106.30,16.70],heading:270,label:"남베트남군 헬기 수송",showLabel:false},{type:"tank",side:"axis",at:[106.32,16.80],heading:200,label:"북베트남군 기갑",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"allied",label:"남베트남군 진격·철수"},{side:"axis",label:"북베트남군 증원"}],units:[{type:"helicopter",side:"allied",label:"헬기 수송"},{type:"tank",side:"axis",label:"북베트남군 기갑"}],colors:[{side:"allied",label:"파랑: 남베트남군"},{side:"axis",label:"주황: 북베트남군"}]}
  },
  {
    id:"vietnam-us-pentagon-papers",theater:"usa",sortDate:"1971-06-13",
    date:"1971년 6월 13일",title:"펜타곤 페이퍼 공개",
    summary:"뉴욕타임스가 국방부 비밀 보고서를 보도했다. 역대 행정부가 전쟁 전망과 확전 과정을 국민에게 숨겨 왔다는 사실이 드러났다.",
    detail:"보고서는 1945년부터 1967년까지의 베트남 정책 결정을 담은 국방부 내부 연구다. 연구에 참여했던 대니얼 엘스버그가 언론에 넘겼다.\n\n닉슨 행정부는 보도 중지를 요구했지만 6월 30일 연방대법원이 보도의 자유를 인정했다."
  },
  {
    id:"vietnam-easter-offensive",theater:"vietnam",sortDate:"1972-03-30",
    date:"1972년 3월 30일~10월 22일",title:"부활절 대공세 · 3개 축 침공",
    endDate:"1972-10-22",
    faction:"axis",
    summary:"북베트남군이 게릴라전을 버리고 기갑과 중포를 앞세운 재래식 3개 축 침공을 시작했다. 비무장지대·중부고원·안록 세 방향이었다. 꽝찌는 함락 뒤 9월에 탈환했고 꼰뚬·안록은 포위를 버텼다.",
    detail:"북쪽 축은 3월 30일 제304·308·312·320B·325C사단 약 3만 명과 전차 100대 이상으로 비무장지대를 넘어 꽝찌로 향했다. 중부고원 축은 4월 5일 14번 도로를 따라 딱또·떤깐을 거쳐 꼰뚬으로 향했고, 3군단 축도 4월 5일 캄보디아에서 빈롱성 록닌을 쳐 4월 7일 함락시켰다.\n\n미 지상군이 대부분 철수한 뒤 베트남화 정책의 첫 대규모 시험이었다. 세 축 모두 결국 저지됐지만 그것은 대규모 미 항공력 덕분이었고, 남베트남군이 미군 지원 없이는 버틸 수 없다는 사실이 드러났다.\n\n북베트남군은 약 10만 명의 사상자를 냈고 그중 전사자는 약 4만 명이다. 남베트남군은 약 1만 명 전사, 3만 3천 명 부상, 1만 4천 명이 실종됐다. 공세는 파리 회담에서 하노이의 입지를 강화하고 남베트남 안에 영구적인 발판을 남겼다.\n\n이 시기에는 게릴라전과 달리 실제로 연속된 전선이 형성됐다. 5월 초 전선은 꽝찌 남부 미짜인강 일대를 따라 동서로 이어졌다(개략).\n\n각 축의 결과: 북쪽 꽝찌시는 5월 1일 함락됐다가 9월 16일 남베트남 해병대가 탈환했다. 중부고원 꼰뚬은 제23사단이 3주 시가전으로 지켰다. 안록은 66일간 포위됐지만 B-52 근접 폭격과 항공 보급으로 버텨 사이공으로 가는 13번 도로를 막았다.",
    mapDesign:"war-v1",mapNote:"현대 국경 기준 · 1972년 전선과 통제 구역은 미 육군 전사와 각 전투 기록을 바탕으로 개략 표시",
    mapView:[[101.34,10.52],[112.84,10.52],[112.84,18.06],[101.34,18.06]],
    routes:[["비무장지대",107.00,16.95,"꽝찌",106.967,16.733,"axis","tank"],["라오스 국경",107.50,14.80,"떤깐·딱또",107.833,14.650,"axis","tank"],["캄보디아 국경",106.35,11.95,"록닌",106.591,11.843,"axis","tank"],["록닌",106.591,11.843,"안록",106.614,11.514,"axis","land"]],
    zones:[{kind:"control",side:"axis",coordinates:[[106.60,16.62],[107.20,16.60],[107.24,17.02],[106.66,17.06],[106.52,16.82]],label:"북베트남군 진출(개략)",labelAt:[106.86,16.90]},{kind:"contested",side:"neutral",coordinates:[[107.16,16.56],[107.50,16.54],[107.54,16.70],[107.22,16.72],[107.10,16.64]],label:"미짜인강 전선(개략)",labelAt:[107.32,16.62]}],
    units:[{type:"tank",side:"axis",at:[106.90,16.86],heading:190,label:"북베트남군 기갑",showLabel:false},{type:"tank",side:"axis",at:[107.70,14.68],heading:160,label:"중부고원 축",showLabel:false},{type:"tank",side:"axis",at:[106.58,11.70],heading:185,label:"3군단 축",showLabel:false},{type:"bomber",side:"allied",at:[107.30,16.40],heading:340,label:"미 항공 지원",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"axis",label:"북베트남군 3개 축 침공"}],units:[{type:"tank",side:"axis",label:"북베트남군 기갑"},{type:"bomber",side:"allied",label:"미 항공 지원"}],colors:[{side:"axis",label:"주황: 북베트남군"},{side:"allied",label:"파랑: 남베트남군"}]}
  },
  {
    id:"vietnam-linebacker",theater:"usa",sortDate:"1972-05-09",
    date:"1972년 5월 9일~10월 23일 · 12월 18~29일",title:"라인배커 작전과 라인배커 II",
    endDate:"1972-12-29",
    summary:"북베트남의 철도·유류·방공망을 겨냥한 지속 차단 폭격과, 12월 하노이·하이퐁 중심부에 집중된 11일간의 B-52 공습.",
    detail:"라인배커는 5월 9일 하이퐁 항 기뢰 부설(포켓머니 작전)과 함께 시작됐다. 41,653회 출격으로 155,548톤을 투하해 부활절 대공세를 지탱하던 병참을 끊었다. 정밀유도무기가 항공전의 양상을 바꾼 첫 현대적 폭격 전역으로, 롤링썬더가 실패한 지점에서 성과를 냈다는 평가를 받는다.\n\n라인배커 II는 12월 18~29일 B-52 200대 이상과 전술기 약 1,077대가 2만 톤 이상을 투하했다. 미측은 B-52 16대 손실을 인정하고 북베트남은 34대를 주장했다.\n\n효과는 지금도 논쟁적이다. 하노이 협상단은 폭격이 자신들을 움직이지 않았다고 했고 키신저 보좌관은 `폭격으로 양보를 받아냈다`고 했다. 확인되는 순서는, 12월 22일 미국이 10월 조건 복귀를 제안하고 26일 하노이가 응할 뜻을 보였으며 30일 닉슨이 20도선 이북 폭격을 중지하고 1월 2일 실무회담이 재개됐다는 것이다. 1월 27일 서명된 협정은 사실상 10월 문안과 같았다.",
    mapDesign:"war-v1",mapNote:"현대 국경 기준 · 폭격 목표는 주요 지점만 개략 표시",
    mapView:[[104.18,19.29],[107.92,19.29],[107.92,21.65],[104.18,21.65]],
    routes:[["통킹만 항모",107.20,20.20,"하이퐁",106.688,20.865,"allied","air"],["태국 기지 방면",104.90,19.60,"하노이",105.854,21.028,"allied","air"],["하이퐁 항",106.75,20.83,"기뢰 부설",106.72,20.80,"allied","ship"]],
    zones:[{kind:"operation",side:"allied",coordinates:[[105.40,20.60],[106.90,20.56],[107.00,21.30],[105.60,21.34],[105.24,20.94]],label:"하노이·하이퐁 폭격 구역(개략)",labelAt:[106.10,20.94]}],
    units:[{type:"bomber",side:"allied",at:[106.20,21.00],heading:280,label:"B-52 폭격",showLabel:false},{type:"ship",side:"allied",at:[107.00,20.60],heading:300,label:"제7함대",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory],routes:[{side:"allied",label:"폭격·기뢰 부설"}],units:[{type:"bomber",side:"allied",label:"B-52 폭격"},{type:"ship",side:"allied",label:"제7함대"}],colors:[{side:"allied",label:"파랑: 미군"}]}
  },
  {
    id:"vietnam-paris-accords",theater:"usa",sortDate:"1973-01-27",
    date:"1973년 1월 27일 서명 · 3월 29일 미군 철수 완료",title:"파리 평화협정과 미군 철수",
    endDate:"1973-03-29",
    summary:"미국·북베트남·남베트남·임시혁명정부가 파리 협정에 서명했다. 현 위치 정전과 60일 내 미군 완전 철수를 규정했다.",
    detail:"정전은 1973년 1월 27일 24시(GMT), 사이공 시간 1월 28일 08시부터 발효됐다. 미군 철수는 협정 2장 5조의 60일 기한대로 3월 29일 완료됐고 같은 날 주베트남 미군사령부가 해체되어 국방무관실로 대체됐다.\n\n결정적 결함은 `현 위치 정전` 조항이었다. 북베트남군이 남베트남 안에 있던 자리를 그대로 인정해, 깨끗한 분단선이 아니라 파편화된 경합 지도를 남겼다. 사이공은 명목상 영토의 약 80%와 인구의 약 90%를 통제했지만 상당 지역이 분쟁 상태였고 정전은 실질적으로 지켜지지 않았다.\n\n이후 미 의회의 예산 삭감과 1973년 전쟁권한법으로 미국의 재개입 가능성이 사라졌다. 하노이는 이를 프억롱에서 직접 시험했다. 1973년 8월 15일까지 미군과 연합군의 95%가 떠났다.",
    mapDesign:"war-v1",mapNote:"현대 국경 기준 · 정전 시점 통제 상황은 개략 표시",
    mapView:[[99.65,9.14],[113.61,9.14],[113.61,18.32],[99.65,18.32]],
    routes:[["사이공",106.700,10.776,"미군 철수",107.10,10.35,"allied","ship"]],
    zones:[{kind:"contested",side:"axis",coordinates:[[106.30,16.40],[107.20,16.36],[107.30,17.05],[106.50,17.10],[106.16,16.70]],label:"공산군 잔류 구역(개략)",labelAt:[106.70,16.74]},{kind:"contested",side:"axis",coordinates:[[106.10,11.40],[106.90,11.36],[107.00,12.10],[106.34,12.16],[105.96,11.74]],label:"공산군 잔류 구역(개략)",labelAt:[106.48,11.74]}],
    units:[{type:"ship",side:"allied",at:[107.00,10.40],heading:130,label:"미군 철수",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"allied",label:"미군 철수"}],units:[{type:"ship",side:"allied",label:"미군 철수"}],colors:[{side:"axis",label:"주황: 공산군 잔류"},{side:"allied",label:"파랑: 남베트남 통제"}]}
  },
  {
    id:"vietnam-us-ford",theater:"usa",sortDate:"1974-08-09",
    date:"1974년 8월 9일",title:"닉슨 사임 · 포드 승계",
    summary:"워터게이트 사건으로 닉슨이 물러나고 제럴드 포드가 대통령이 됐다. 의회는 남베트남 원조를 크게 줄였다.",
    detail:"닉슨은 티에우에게 협정 위반 시 재개입을 약속했지만, 사임으로 그 약속은 사실상 사라졌다.\n\n1973년 전쟁권한법과 인도차이나 군사행동 금지로 재개입 길은 이미 막혀 있었고, 1975 회계연도 원조는 7억 달러로 삭감됐다."
  },
  {
    id:"vietnam-buon-ma-thuot",theater:"vietnam",sortDate:"1975-03-10",
    date:"1975년 3월 10~30일",title:"봄 대공세 · 부온마투옷에서 다낭까지",
    endDate:"1975-03-30",
    faction:"axis",
    summary:"북베트남군이 부온마투옷을 함락시키자 중부고원이 무너졌다. 7B번 도로 철수가 궤멸로 끝나고 3월 25일 후에, 29일 다낭이 함락됐다.",
    detail:"제3·10·316·320A·968사단과 전차 57대가 남베트남군 제23사단이 지키던 부온마투옷을 쳤다. 3월 11일 사단 사령부가 무너지고 닥락성 성장이 생포됐으며, 탈환을 위한 공중기동 반격은 격파됐다.\n\n성공의 핵심은 기만이었다. 1974년 12월부터 북베트남군은 습격과 허위 무선 교신을 반복하고 제10·320A사단으로 쁠래이꾸를 포격하며 베트콩 요원을 쁠래이꾸·꼰뚬에 침투시켜 소문을 퍼뜨렸다. 사이공은 주공이 더 북쪽에 올 것이라 확신했다.\n\n부온마투옷 상실로 14번 도로가 끊기고 중부고원 방어 전체가 무너져 2군단 지역이 소멸했다. 함락 속도는 하노이 지도부가 2년으로 계획한 전역을 한 계절로 압축하게 만들었다.\n\n3월 16일 티에우의 명령으로 2군단이 쁠래이꾸·꼰뚬을 버리고 7B번 도로로 해안 뚜이호아를 향해 철수했다. 추격 포격 속에 6만 명 중 약 2만 명만 해안에 닿은 `눈물의 행렬`이었다.\n\n공황은 1군단 지역으로 번졌다. 3월 25일 후에, 3월 29일 다낭이 조직적 방어 없이 함락되며 한 달 만에 남베트남의 절반이 사라졌다.",
    mapDesign:"war-v1",mapNote:"현대 국경 기준 · 기만 작전과 통제 구역은 개략 표시",
    mapView:[[106.24,12.2],[109.66,12.2],[109.66,14.46],[106.24,14.46]],
    routes:[["캄보디아 국경 방면",107.60,12.90,"부온마투옷",108.050,12.667,"axis","tank"],["쁠래이꾸 기만 포격",108.000,13.983,"쁠래이꾸 일대",108.05,13.90,"axis","land"],["쁠래이꾸",108.000,13.983,"부온마투옷 반격",108.10,12.75,"allied","air"]],
    zones:[{kind:"control",side:"axis",coordinates:[[107.86,12.52],[108.24,12.50],[108.30,12.84],[108.02,12.92],[107.78,12.72]],label:"북베트남군 점령(개략)",labelAt:[108.02,12.60]},{kind:"operation",side:"axis",coordinates:[[107.84,13.82],[108.20,13.80],[108.24,14.10],[107.98,14.16],[107.78,13.98]],label:"기만 작전 구역(개략)",labelAt:[108.00,13.90]}],
    units:[{type:"tank",side:"axis",at:[107.96,12.78],heading:130,label:"북베트남군 기갑",showLabel:false},{type:"infantry",side:"allied",at:[108.050,12.667],heading:0,label:"남베트남군 제23사단",showLabel:false},{type:"helicopter",side:"allied",at:[108.20,12.80],heading:230,label:"공중기동 반격",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"axis",label:"북베트남군 공격·기만"},{side:"allied",label:"남베트남군 반격"}],units:[{type:"tank",side:"axis",label:"북베트남군 기갑"},{type:"infantry",side:"allied",label:"남베트남군 제23사단"},{type:"helicopter",side:"allied",label:"공중기동 반격"}],colors:[{side:"axis",label:"주황: 북베트남군"},{side:"allied",label:"파랑: 남베트남군"}]}
  },
  {
    id:"vietnam-us-tulane",theater:"usa",sortDate:"1975-04-23",
    date:"1975년 4월 23일",title:"포드 `미국의 전쟁은 끝났다`",
    summary:"포드가 튤레인 대학 연설에서 베트남 전쟁은 미국에게 끝난 전쟁이라고 선언했다. 일주일 뒤 사이공이 함락됐다.",
    detail:"봄 대공세로 남베트남이 무너지는 동안 포드가 요청한 긴급 군사원조는 의회를 통과하지 못했다.\n\n4월 29~30일 프리퀀트 윈드 작전으로 사이공에 남은 미국인과 베트남인을 헬기로 철수시키며 미국의 개입은 끝났다."
  },
  {
    id:"vietnam-fall-of-saigon",theater:"vietnam",sortDate:"1975-04-29",
    date:"1975년 4월 29~30일",title:"사이공 함락 · 프리퀀트 윈드 작전",
    endDate:"1975-04-30",
    faction:"axis",
    summary:"북베트남군이 사이공으로 진입하는 가운데 미국은 역사상 최대 헬기 철수 작전으로 약 7천 명을 실어냈다. 4월 30일 사이공이 항복하며 전쟁이 끝났다.",
    detail:"반띠엔중은 4월 29일 06시 `적의 최후 소굴로 곧장 진격하라`고 명령했다. 같은 날 14시경 떤선녓 국방무관실 구내에서 헬기 수송이 시작되어 밤새 이어졌고, 대사관 철수는 4월 30일 07시 53분에 끝났다. 헬기로 미국인 1,373명과 베트남인·제3국인 5,595명이 빠져나갔으며 전체 철수 노력으로는 베트남인 138,869명이 이동했다.\n\n4월 28일 대통령이 된 즈엉반민 장군이 4월 30일 항복했다. 하노이는 4월 14일 이 전역을 `호찌민 전역`으로 명명하고 호찌민 생일인 5월 19일 전에 끝내려 했다.\n\n사이공 방어는 쿠찌(북서), 빈즈엉(북), 비엔호아(북동), 15번 도로·프억뚜이(남동), 롱안·4번 도로(남) 다섯 방면에 약 12만 5천 명이었고 북베트남군 약 27만 명 앞에서 이틀도 못 버텼다. 메콩 삼각주의 4군단은 야전에서 결정적으로 패한 적 없이 비교적 온전한 상태로 총항복을 맞았다.\n\n대사관 옥상에서 헬기가 떠오르는 장면은 미국의 패배를 상징하는 이미지가 됐고, 갑작스레 끝난 철수는 많은 베트남인 협력자를 남겨두었다.",
    mapDesign:"war-v1",mapNote:"현대 국경 기준 · 최종 방어 원호는 개략 표시",
    mapView:[[105.81,10.03],[107.77,10.03],[107.77,11.33],[105.81,11.33]],
    routes:[["쿠찌 방면",106.49,10.97,"사이공",106.700,10.776,"axis","tank"],["비엔호아 방면",106.818,10.976,"사이공",106.720,10.800,"axis","tank"],["롱안·4번 도로",106.62,10.62,"사이공",106.690,10.750,"axis","land"],["미 대사관",106.699,10.783,"제76기동함대",107.30,10.20,"allied","air"],["국방무관실",106.660,10.810,"제76기동함대",107.28,10.24,"allied","air"]],
    zones:[{kind:"control",side:"axis",coordinates:[[106.36,10.86],[107.00,10.84],[107.08,11.10],[106.60,11.16],[106.28,11.02]],label:"북베트남군 진출(개략)",labelAt:[106.66,11.04]},{kind:"contested",side:"neutral",coordinates:[[106.54,10.66],[106.88,10.64],[106.92,10.86],[106.62,10.90],[106.48,10.78]],label:"사이공 최종 방어 원호(개략)",labelAt:[106.70,10.70]}],
    units:[{type:"tank",side:"axis",at:[106.62,10.92],heading:170,label:"북베트남군 기갑",showLabel:false},{type:"helicopter",side:"allied",at:[106.85,10.60],heading:120,label:"프리퀀트 윈드",showLabel:false},{type:"ship",side:"allied",at:[107.20,10.28],heading:300,label:"제76기동함대",showLabel:false}],
    legend:{title:"표현 범례",territories:[alliedTerritory,axisTerritory],routes:[{side:"axis",label:"북베트남군 최종 공격"},{side:"allied",label:"헬기 철수"}],units:[{type:"tank",side:"axis",label:"북베트남군 기갑"},{type:"helicopter",side:"allied",label:"프리퀀트 윈드"},{type:"ship",side:"allied",label:"제76기동함대"}],colors:[{side:"axis",label:"주황: 북베트남군"},{side:"allied",label:"파랑: 미군·남베트남군"}]}
  }
];

window.timelineConfig={
  storageKey:"world-history-vietnam-war-events-v2",
  historicalDataUrl:null,
  lanes,
  events,
  yearMarkers:["1959-01-01","1960-01-01","1961-01-01","1962-01-01","1963-01-01","1964-01-01","1965-01-01","1966-01-01","1967-01-01","1968-01-01","1969-01-01","1970-01-01","1971-01-01","1972-01-01","1973-01-01","1974-01-01","1975-01-01","1976-01-01"]
};
