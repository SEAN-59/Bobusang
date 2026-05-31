# Web Design Guideline v1

브라우저에서 직접 확인하는 HTML/CSS/JS 기반 웹 디자인 가이드입니다.

## 기준

- 레거시 원본은 `../resources/DesignGuideline.html` 입니다.
- `main.html` 은 전체 요소를 한 번에 확인하는 메인 뷰어입니다.
- 각 요소의 HTML 은 그룹별 디렉토리 아래에 분리합니다.
- 이번 1차 분리에서는 기존 동작 보존을 위해 CSS/JS 를 `main.css`, `main.js` 공통 파일로 분리했습니다.
- 요소별 `.css`, `.js` 는 이후 세분화 작업을 위한 자리입니다.
- Foundation 뒤에는 토큰 사용 규칙, 상태 규칙, 접근성, 반응형 기준, 사용 예시를 문서화합니다.
- 조작 가능한 컴포넌트는 키보드 포커스, `Escape` 닫기, 모바일 동작 기준을 함께 관리합니다.

## 실행

`main.html` 을 브라우저에서 열면 전체 웹 디자인 가이드를 확인할 수 있습니다.

로컬 서버로 확인할 경우:

```bash
python3 -m http.server 8765
```

이후 `http://127.0.0.1:8765/web-design-guideline/main.html` 로 접근합니다.

## 구조

```text
web-design-guideline/
├── main.html
├── main.css
├── main.js
├── foundation/
│   ├── color/
│   ├── typography/
│   ├── spacing/
│   └── radius-shadow/
├── components/
│   ├── button/
│   ├── form/
│   ├── checkbox-radio/
│   └── ...
├── navigation/
│   ├── topbar/
│   ├── sidebar/
│   ├── topbar-sidebar/
│   └── mobile-hamburger/
└── partials/
    └── overlays.html
```

## 다음 분리 단계

1. 요소별 CSS 를 `main.css` 에서 각 요소의 CSS 파일로 이동합니다.
2. 요소별 JS 를 `main.js` 에서 각 요소의 JS 파일로 이동합니다.
3. `main.html` 이 요소 파일을 조합하는 방식으로 전환할지 결정합니다.
