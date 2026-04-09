---
id: 65
title: "Notion to Blog (3)"
description: "마크다운 테이블 UI 리팩토링 삽질기"
pubDate: 2026-04-09T19:00:00.000Z
updatedDate: 2026-04-09T22:13:00.000Z
category: "Projects"
tags: ["CSS", "Astro", "React", "Typescript", "TailwindCSS", "Troubleshooting", "shadcn", "BurrowBlog"]
pinned: false
---


Hugo에서 Astro로 블로그를 이전하면서 대부분의 작업은 순조로웠다. `shadcn/ui`와 `Tailwind CSS v4`를 결합해 내가 원하는 '컴팩트하고 밀도 높은' 디자인 시스템을 구축하는 과정은 꽤 즐거웠다. 하지만 나를 가장 괴롭히는 최종 보스는 따로 있었다. 바로 **마크다운 테이블**이다.


텍스트나 이미지는 브라우저가 알아서 잘 렌더링 해주지만, 테이블은 너비, 스크롤, 가독성, 테두리 등 신경 써야 할 요소가 너무 많다. 이 글은 완벽?한? 테이블을 만들기 위해 거쳤던 기나긴 삽질의 기록이다.


---


## 100% 너비의 저주와 가독성의 붕괴


문제의 시작은 아주 사소한 불편함에서 출발했다.


기본적으로 Tailwind의 `@tailwindcss/typography`(`prose` 클래스)가 적용된 테이블은 포스트 본문의 너비(100%)에 맞춰 꽉 차게 렌더링된다. 하지만 나는 셀에 들어가는 텍스트 길이가 짧은데도 불구하고, 억지로 테이블 너비가 화면 끝까지 늘어나 빈 공간이 생기는 것이 너무 보기 싫었다.


그래서 CSS를 수정해 데이터의 길이에 따라 테이블 너비가 유동적으로 결정되도록 변경했다. 하지만 곧바로 다음 문제에 부딪혔다. 텍스트 길이가 길고 한 행에 셀이 많아지는 복잡한 표를 넣었더니, 화면 너비 안에 억지로 들어가기 위해 각 열의 너비가 비정상적으로 좁아져 버린 것이다. 글자들이 세로로 길게 늘어지며 가독성이 처참하게 박살 났다.


## 넘쳐흐르는 콘텐츠와 정렬 대참사


가독성을 살리기 위해 셀의 최소 너비를 보장해주었더니, 이번에는 텍스트의 길이가 길어질 경우 테이블이 포스트 본문의 최대 너비를 뚫고 삐져나가는 현상이 발생했다. 스크롤을 지원하지 않으니 본문 너비를 벗어난 오른쪽 내용들은 아예 화면에서 잘려나가 볼 수 없었다.


잘린 텍스트를 보기 위해 하단에 가로 스크롤바를 추가하는 시도를 했다. 가장 단순한 방법인 `table` 요소 자체에 `display: block`과 `overflow-x: auto`를 적용했다.


**여기서 대참사가 일어났다.**
분명 같은 열(Column)에 속해 있는데도 불구하고, 행마다 들어있는 텍스트 길이에 따라 열의 너비가 제각각으로 어긋나는 현상이 발생한 것이다. `display: table` 속성이 깨지면서 브라우저가 `thead`와 `tbody`의 그리드 관계를 잃어버렸기 때문이다.


## HTML 변환과 MDX의 딜레마


CSS만으로 해결이 안 되자 로직으로 눈을 돌렸다. Notion에서 데이터를 가져와 마크다운으로 변환(Sync)하는 과정 중, 아예 테이블 요소만 날것의 `<table>` HTML 태그로 변환해서 출력하도록 스크립트를 수정해 보았다. HTML로 렌더링을 하면 `<div>` 래퍼(Wrapper)를 씌워서 스크롤을 제어하기가 훨씬 쉬웠기 때문이다.


하지만 코드를 작성하면서 강한 찝찝함이 밀려왔다. 마크다운(`.md`) 파일 내부에 HTML 코드가 범벅이 되어 있으면, 나중에 이 마크다운 파일들을 다른 플랫폼이나 뷰어에서 읽어 들일 때 테이블이 다 깨지거나 호환되지 않을 가능성이 있다고 생각했다.


이 지점에서 **MDX**로의 전환을 진지하게 고려했다. MDX를 쓰면 `<ScrollableTable>` 같은 UI 컴포넌트를 만들어 마크다운 안에서 깔끔하게 호출할 수 있다.


| **구분**       | **Markdown (.md)**    | **MDX (.mdx)**              |
| ------------ | --------------------- | --------------------------- |
| **핵심 개념**    | 정적 텍스트 서식             | 마크다운 내 컴포넌트 삽입              |
| **컴포넌트 사용**  | 불가능 (HTML 태그 정도만 지원)  | React/Vue 컴포넌트 사용 가능        |
| **프로그래밍 로직** | 불가능                   | 변수 선언, 조건부 렌더링 가능           |
| **주요 용도**    | 단순 기록, README, 정적 블로그 | 대화형 문서, 디자인 시스템 가이드         |
| **처리 방식**    | 단순 파싱 (HTML 변환)       | 번들링 과정 필요 (Webpack, Vite 등) |


**하지만 나는 MDX를 포기하고 MD를 유지하기로 했다.** 가장 큰 이유는 '데이터의 영속성과 이식성' 때문이다. 나중에 Astro가 아닌 MDX를 지원하지 않는 다른 정적 사이트 생성기(SSG)로 전환할 수도 있다. 마크다운 문서들이 특정 프레임워크의 컴포넌트 태그들로 범벅이 되어 있다면 전환할 때 엄청난 고생을 또 하게 될 것이 눈에 뻔히 보였다.


개인적으로 **데이터는 순수해야 하고, 보여주는 방식은 플랫폼이 책임져야 한다**고 생각한다.


## 최종 해결책


결국 마크다운 문서 원본(`.md`)은 절대 건드리지 않으면서 화면에 렌더링 될 때만 스크롤 래퍼를 씌워주는 방식을 찾아냈다. 바로 Astro의 클라이언트 사이드 스크립트를 활용하는 것이다.


### JS 동적 래핑 (BlogPost.astro)


`BlogPost.astro` 하단에 스크립트를 추가하여, 렌더링이 끝난 후 본문 안의 모든 테이블 요소를 찾아 그 바깥에 `<div class="table-wrapper">`를 동적으로 생성해 감싸도록 했다.


```javascript
// Standard Table Wrapper Logic
const tables = document.querySelectorAll('.prose table');
tables.forEach(table => {
  if (table.parentElement.classList.contains('table-wrapper')) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'table-wrapper scrollbar-thin';
  table.parentNode.insertBefore(wrapper, table);
  wrapper.appendChild(table);
});
```


### CSS 스타일링 (global.css)


래퍼가 생겼으니 이제 Tailwind v4의 CSS를 활용해 디테일한 스타일링과 자잘한 버그들을 잡아냈다.

1. **레이아웃과 스크롤**: 래퍼에 `fit-content`와 `overflow-x: auto`를 주고, 내부 테이블에는 브라우저 기본 동작인 `display: table`을 강제 복구시켰다.
2. **Prose 패딩 전쟁**: `@tailwindcss/typography` 플러그인이 테이블 첫 번째 열의 패딩을 강제로 없애 텍스트가 잘리는 현상을 막기 위해, 명시도를 높여 오버라이드했다. (`!important`)
3. **이중 테두리 및 유령 여백 제거**: `border-separate`를 사용해 둥근 모서리를 구현하되, 마지막 자식 요소의 테두리를 없애 래퍼 테두리와 겹치는 현상을 막았다. 래퍼에는 `line-height: 0`을 주어 인라인 블록 유령 여백을 날려버렸다.

```css
@layer components {
  /* Table Wrapper: 바깥쪽 둥근 테두리와 가로 스크롤 담당 */
  .prose .table-wrapper {
    @apply my-6 rounded-md border border-border overflow-x-auto shadow-sm;
    width: fit-content;
    max-width: 100%;
    line-height: 0; /* 세로 유령 여백 제거 */
  }

  /* Standard Table: 래퍼 안에서 고유의 그리드 유지 */
  .prose table {
    @apply text-left border-separate border-spacing-0;
    display: table !important; /* 정렬 대참사 복구 */
    width: max-content !important;
    margin: 0 !important;
  }

  /* Prose의 기본 패딩 덮어쓰기 (텍스트 잘림 방지) */
  .prose table :is(th, td):first-child {
    padding-left: 0.6rem !important;
  }

  /* 이중 테두리(Double Border) 방지 */
  .prose th:last-child,
  .prose td:last-child {
    border-right: none !important;
  }
  .prose tr:last-child td {
    border-bottom: none !important;
  }
}
```


## 결론


이렇게 어찌저찌 문제가 해결되었다. 텍스트가 짧으면 표도 타이트하게 줄어들고, 텍스트가 길면 가독성을 유지한 채 가로 스크롤이 생긴다. 무엇보다 마크다운 파일들은 어디에서나 사용할 수 있는 순수한 상태를 유지하고 있다.


프론트엔드를 만지다 보면 쉽고 빠른 길과 험난한 길 사이에서 자주 고민하게 된다. UI 컴포넌트 라이브러리를 가져다 쓰거나, 아니면 그냥 다른 사람이 만든 테마를 쓰면 확실히 빠르고 편하다. 하지만 결국엔 내가 직접 만든 게 가장 마음에 들고, 만드는 과정 자체가 재미가 있어서 점점 하나하나 직접 만드는 것들이 늘어나고 있다.


이번 테이블 UI 리팩토링 과정도 많은 삽질이 있었지만.. 데이터의 독립성을 지키는 방법을 치열하게 고민해 본 의미 있는 시간이었다고 생각하고, 이번 작업을 통해 아래의 두 가지는 확실히 배웠다고 생각한다.

1. 전역 스타일로 `prose`와 억지로 싸우려 들지 마라. 명시도가 높은 덮어쓰기를 하거나, 아예 구조적인 Wrapper를 사용하는 것이 정신 건강에 좋다.
2. CSS에서 테이블 레이아웃은 생각보다 훨씬 깨지기 쉽다. `display: table` 같은 브라우저의 기본 동작은 최대한 건드리지 않고 보존하는 것이 상책이다.
