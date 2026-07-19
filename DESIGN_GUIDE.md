# 세계사 타임라인 디자인 가이드

이 문서는 다른 AI, Claude AI, Codex 또는 새로운 세션에서 작업하더라도 현재 승인된 첫 화면의 디자인과 이미지 합성 방식을 동일하게 유지하기 위한 필수 명세다.

## 1. 현재 승인된 디자인

사용자가 2026년 7월 19일 승인한 첫 화면 카드 디자인을 기준으로 한다.

핵심 구성:

- 사건 카드는 역사적 시작 시점이 오래된 순서로 배열한다.
- 각 전쟁 카드는 한 장의 임의 생성 이미지가 아니라 실제 전쟁 사진과 실제 역사 지도 두 장을 사용한다.
- 위쪽에는 전쟁을 대표하는 실제 사진을 배치한다.
- 아래쪽과 배경에는 해당 전쟁 시기의 세력·동맹·전선 지도를 배치한다.
- 사진은 아래로 갈수록 투명해지고, 아래에 깔린 지도가 자연스럽게 드러난다.
- 지도는 완전한 그레이스케일로 처리한다.
- 카드 제목과 설명을 읽을 수 있도록 최종 어두운 오버레이를 추가하되 지도를 가리지 않을 정도로 유지한다.

이 구조를 이후 추가되는 모든 전쟁 카드의 기본 템플릿으로 사용한다.

## 2. 절대 피해야 할 방식

- AI 또는 개발자가 국가·대륙 윤곽을 임의로 그리지 않는다.
- 한반도, 유럽 등 실제 지형을 닮지 않은 추상 SVG를 지도처럼 사용하지 않는다.
- 역사적 세력 지도가 필요한 곳에 현대 백지도를 대신 사용하지 않는다.
- 외부 URL을 카드에서 직접 불러오지 않는다. 자료를 `images/`에 저장한 뒤 로컬 경로로 사용한다.
- 지도 한 장 또는 사진 한 장만으로 카드를 완성하지 않는다.
- 한국전쟁 지도 주변에 원본 이미지의 넓은 좌우 여백이 보이게 하지 않는다.
- 이미지 출처와 라이선스 기록을 생략하지 않는다.

## 3. 카드 레이어 순서

뒤에서 앞으로 다음 순서로 겹친다.

1. 역사 지도 `.war-map`
2. 대표 전쟁 사진 `.war-photo`
3. 사진·지도 통합용 미세 명암 레이어 `.war-composite::after`
4. 카드 전체 가독성 오버레이 `.card-overlay`
5. 연도, 상태, 제목, 설명, 이동 문구

권장 HTML 구조:

```html
<div class="card-art war-composite {topic-class}" role="img" aria-label="지도와 사진을 설명하는 문장">
  <img class="war-map" src="images/{map-file}" alt="">
  <img class="war-photo" src="images/{photo-file}" alt="">
</div>
<div class="card-overlay"></div>
```

두 이미지의 개별 `alt`는 비워 중복 낭독을 방지하고, 부모의 `aria-label`에서 두 자료의 의미를 한 번에 설명한다.

## 4. 현재 CSS 기준값

다른 AI가 레이아웃을 다시 만들더라도 다음 값을 출발점으로 사용한다.

### 지도

```css
.war-composite .war-map {
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(1) brightness(.72) contrast(1.34);
  opacity: 1;
  transform: scale(1.04);
}
```

### 사진

```css
.war-composite .war-photo {
  inset: 0 0 auto;
  width: 100%;
  height: 69%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(.72) sepia(.16) brightness(.82) contrast(1.12);
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 56%,
    rgba(0, 0, 0, .82) 72%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 56%,
    rgba(0, 0, 0, .82) 72%,
    transparent 100%
  );
}
```

### 공통 오버레이

```css
.card-overlay {
  background:
    linear-gradient(
      180deg,
      rgba(13, 16, 14, .08),
      rgba(13, 16, 14, .11) 38%,
      rgba(13, 16, 14, .82) 100%
    ),
    linear-gradient(90deg, rgba(13, 16, 14, .2), transparent);
}
```

이 값은 현재 사용자가 `너무 좋다`고 승인한 결과다. 명확한 요청 없이 대폭 변경하지 않는다.

## 5. 전쟁별 현재 이미지 조합

### 제1차 세계대전

- 사진: `images/ww1-somme-trench.jpg`
- 지도: `images/ww1-europe-alliances-1914.svg`
- 사진 내용: 1916년 솜 전투의 참호
- 지도 내용: 1914년 유럽 군사동맹과 세력
- 사진 위치: `object-position: 52% center`

### 제2차 세계대전

- 사진: `images/ww2-panzer-iv-ukraine.jpg`
- 지도: `images/ww2-europe-1942.svg`
- 사진 내용: 1941년 우크라이나에 배치된 독일 4호 전차
- 지도 내용: 1942년 추축국 세력 확장기의 유럽
- 사진 위치: `object-position: center 47%`

### 한국전쟁

- 사진: `images/korean-war-seoul.jpg`
- 지도: `images/korean-war-phase-1.svg`
- 사진 내용: 1950년 서울 전투
- 지도 내용: 북한군 남침과 부산 교두보까지의 제1단계 전선
- 사진 위치: `object-position: center 42%`

한국전쟁 지도는 원본의 좌우 가장자리와 여백이 카드 안에 보이지 않도록 확대한다.

```css
.war-composite.korean-war .war-map {
  object-fit: contain;
  object-position: center 66%;
  padding: 6% 0 0;
  background: #354047;
  transform: scale(1.58);
}
```

한국 지도 확대값 `1.58`은 현재 승인된 값이다. 카드 비율을 변경하면 결과를 직접 확인한 뒤, 한반도 핵심 지역이 잘리지 않는 범위에서만 조정한다.

### 베트남전쟁

- 사진: `images/vietnam-war-jungle-combat.jpg`
- 지도: `images/vietnam-war-map-1968-1969.svg`
- 사진 내용: 1969년 베트남 정글에서 작전 중인 미군
- 지도 내용: 1968~1969년 베트남전쟁 전황과 주요 작전 지역
- 시작 연도: `1955`
- 종료 연도: `1975`
- 사진 위치: `object-position: center 48%`
- 지도 위치: `object-position: center 58%`
- 지도 확대: `transform: scale(1.12)`

## 6. 새로운 전쟁 카드 추가 절차

1. 전쟁의 시작 연도와 종료 연도를 확인한다.
2. 해당 전쟁을 대표하는 실제 사진을 찾는다.
3. 해당 전쟁 시기의 세력·동맹·점령지·전선을 보여주는 지도를 찾는다.
4. 라이선스와 원출처를 확인한다.
5. 두 파일을 `images/`에 내려받는다.
6. `images/README.md`에 파일명, 제목, 제작자, 날짜, 라이선스, 원본 URL을 기록한다.
7. 카드에 `war-composite` 구조를 적용한다.
8. 지도는 그레이스케일로 유지한다.
9. 사진은 상단에 배치하고 아래로 갈수록 지도가 드러나게 한다.
10. 카드의 `data-start-year`를 입력해 시간순 자동 정렬에 포함한다.
11. 데스크톱과 모바일에서 사진의 핵심 피사체, 지도 윤곽, 카드 제목이 모두 보이는지 확인한다.

## 7. 일반 역사 사건 카드

전쟁이 아닌 사건에도 같은 원리를 응용하되 억지로 세력 지도를 사용하지 않는다.

- 혁명: 대표 사진·회화 + 당시 도시·국가 지도
- 제국의 성립·붕괴: 대표 유물·인물·건축 + 당시 세력 지도
- 탐험: 인물·선박 + 항로 지도
- 종교·문화 확산: 대표 유물·장소 + 확산 경로 지도
- 경제위기: 대표 사진·자료 + 영향 지역 또는 경제 흐름 지도
- 재난: 대표 사진 + 피해 범위 지도

즉, `대표 시각 자료 + 공간적 맥락 자료`의 두 레이어 원칙을 유지한다.

## 8. 정렬 규칙

- 첫 화면 카드는 `data-start-year`를 기준으로 오름차순 정렬한다.
- 고대 사건은 음수 연도를 사용한다.
- 예: 제2차 포에니 전쟁은 `data-start-year="-218"`.
- 중요도, 제작 순서, 게시 순서 때문에 시간순을 바꾸지 않는다.
- 동시대 사건의 세부 정렬은 정확한 시작일, 시작 월, 내부 정렬값 순서로 결정한다.

## 9. 현재 원본 파일

- 구현: `index.html`
- 전체 계획: `PLAN.md`
- 이미지 및 지도: `images/`
- 이미지 출처: `images/README.md`
- 디자인 재현 명세: `DESIGN_GUIDE.md`

새로운 AI는 첫 화면을 수정하기 전에 반드시 `PLAN.md`, `DESIGN_GUIDE.md`, `images/README.md`, `index.html`을 먼저 확인한다.

## 10. 변경 원칙

- 사용자의 명시적 요청 없이 승인된 두 이미지 합성 구조를 단일 이미지로 바꾸지 않는다.
- 이미지 교체 시에도 사진+지도 조합을 유지한다.
- 디자인을 변경한 뒤에는 카드 3개 모두에 일관되게 적용한다.
- 지도 가독성, 사진 대표성, 제목 가독성 순서로 검토한다.
- 지형이나 국경을 직접 임의 제작하지 않는다.
- 실제 자료가 없으면 임의로 만들지 말고 자료 탐색 또는 사용자 확인을 먼저 진행한다.
