// 시점별 전 세계 진영 스냅샷. 각 사건 날짜에 맞는 스냅샷을 지도 바탕에 깐다.
// 값: allied / axis / soviet / neutral. 코드는 ISO 3166 숫자.
// axis=독일·이탈리아·일본과 동맹/추축, soviet=소련권, allied=연합국.
(function(){
  const AXIS_CORE = {"276":"axis","380":"axis","392":"axis"};          // 독일·이탈리아·일본
  const JP_COLONIES = {"410":"axis","408":"axis","158":"axis"};        // 한국·대만(일본 식민지)
  const snapshots = [
    { from:"1937-01-01", sides:{
      ...{"392":"axis"}, ...JP_COLONIES, "156":"allied"
    }},
    { from:"1939-09-01", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "703":"axis",
      "826":"allied","250":"allied","616":"allied","156":"allied",
      "643":"soviet","112":"soviet","804":"soviet",
      "840":"neutral","380":"neutral"
    }},
    { from:"1939-10-06", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "703":"axis", "616":"axis",
      "826":"allied","250":"allied","156":"allied",
      "643":"soviet","112":"soviet","804":"soviet",
      "840":"neutral","380":"neutral"
    }},
    { from:"1940-06-22", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "703":"axis","348":"axis","642":"axis","100":"axis",
      "250":"axis","056":"axis","528":"axis","578":"axis","208":"axis","826":"allied","156":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet",
      "840":"neutral"
    }},
    { from:"1941-06-22", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "703":"axis","348":"axis","642":"axis","100":"axis","246":"axis",
      "250":"axis","056":"axis","528":"axis","578":"axis","208":"axis",
      "826":"allied","156":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet",
      "840":"neutral"
    }},
    { from:"1941-12-07", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "703":"axis","348":"axis","642":"axis","100":"axis","246":"axis",
      "250":"axis","056":"axis","528":"axis","578":"axis","208":"axis",
      "826":"allied","840":"allied","156":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet"
    }},
    { from:"1942-11-01", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "703":"axis","348":"axis","642":"axis","100":"axis","246":"axis",
      "250":"axis","056":"axis","528":"axis","578":"axis","208":"axis",
      "826":"allied","840":"allied","156":"allied","036":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet"
    }},
    { from:"1943-02-01", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "703":"axis","348":"axis","642":"axis","100":"axis","246":"axis",
      "250":"axis","056":"axis","528":"axis",
      "826":"allied","840":"allied","156":"allied","036":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet"
    }},
    { from:"1944-06-06", sides:{
      ...AXIS_CORE, ...JP_COLONIES, "348":"axis","642":"axis",
      "826":"allied","840":"allied","156":"allied","036":"allied","250":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet","616":"soviet"
    }},
    { from:"1945-01-20", sides:{
      ...AXIS_CORE, ...JP_COLONIES,
      "826":"allied","840":"allied","156":"allied","036":"allied","250":"allied","056":"allied","528":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet","616":"soviet","642":"soviet","348":"soviet"
    }},
    { from:"1945-05-01", sides:{
      "392":"axis", ...JP_COLONIES,
      "826":"allied","840":"allied","156":"allied","036":"allied","250":"allied","276":"allied","380":"allied",
      "643":"soviet","112":"soviet","804":"soviet","233":"soviet","428":"soviet","440":"soviet","616":"soviet"
    }}
  ];
  // 만주국(일본 괴뢰국, 1932~). 개략 경계 — 아틀라스에 별도 도형이 없어 근사 폴리곤 사용.
  window.worldPuppetStates = [
    { name:"Manchukuo", label:"일본 괴뢰국(만주국·개략)", side:"axis", from:"1932-03-01",
      coordinates:[[119.3,42.4],[121.5,40.9],[124.4,40.0],[128.2,41.8],[130.7,42.9],[131.3,44.6],[134.3,48.4],[130.6,48.9],[127.5,50.3],[123.6,53.5],[120.8,52.6],[120.0,50.1],[119.4,46.6],[117.4,44.0],[119.3,42.4]] }
  ];
  window.worldFrontSnapshots = snapshots;
  window.frontSnapshotFor = function(date){
    let chosen = snapshots[0];
    for(const snap of snapshots){ if(snap.from<=date) chosen = snap; else break; }
    return chosen.sides;
  };
})();
