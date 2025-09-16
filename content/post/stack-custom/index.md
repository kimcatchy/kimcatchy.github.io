---
title: Hugo Stack Theme Customization
description: 스택 테마 수정하기
slug: stack-custom
date: 2025-09-17 07:00:00+0900
#image: cover.jpg
categories:
    - Web
tags:
    - Hugo
#weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## Font & Line Break
- `~/layouts/partials/head/custom.html` 추가하고 아래 내용 작성
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet">
```
- `~/assets/scss/custom.scss`에 아래 내용 추가
```scss
// 본문 폰트
body, .article-content {
    font-family: 'Noto Sans KR', sans-serif;
}

// 제목 폰트
body, .article-title {
    font-family: 'Noto Sans KR', sans-serif;
}

// 홈페이지 폰트 
body, .article-page {
    font-family: 'Noto Sans KR', sans-serif;
}

/* 한글 줄바꿈 최적화 */
.article-content {
    word-break: keep-all;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

/* 추가적으로 본문 전체에 적용 */
body {
    word-break: keep-all;
    word-wrap: break-word;
}
```

## Link Embed Shortcode
- `~/layouts/shortcodes/linkembed.html` 추가하고 아래 내용 작성
```html
<!-- 기존 링크 텍스트 제거하고 전체 박스를 링크로 만들기 -->
<a href="{{ .Get "url" }}" target="_blank" rel="noopener" class="embed-link-box">
  <div class="embed-content">
    <div class="embed-url">{{ .Get "url" }}</div>
  </div>
</a>
```
- `~/assets/scss/custom.scss`에 아래 내용 추가
```scss
/* 링크 embed */
.embed-link-box {
  display: block;
  margin: 24px 0;
  padding: 16px 20px;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  // 라이트 모드 (포스트 배경과 구분)
  [data-scheme="light"] & {
    background-color: #f1f5f9; // 연한 회색
    border: 1px solid #cbd5e1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background-color: #e2e8f0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }
  }
  
  // 다크 모드 (포스트 배경과 구분)
  [data-scheme="dark"] & {
    background-color: #374151; // 진한 회색
    border: 1px solid #4b5563;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    
    &:hover {
      background-color: #4b5563;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      transform: translateY(-1px);
    }
  }
}

.embed-content {
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: "🔗";
    font-size: 1.1em;
    opacity: 0.7;
  }
}

.embed-url {
  font-family: var(--code-font-family, monospace);
  font-size: 1.1rem;
  margin: 0;
  overflow-wrap: break-word;
  
  [data-scheme="light"] & {
    color: #475569;
  }
  
  [data-scheme="dark"] & {
    color: #d1d5db;
  }
}
```
- 사용 시 아래와 같이 사용
```html
{{< linkembed url="https://kimcatchy.github.io" text="nolog" >}}
```
{{< linkembed url="https://kimcatchy.github.io" text="nolog" >}}

## Collapsible Section Shortcode
- 출처: [Add collapsible section in hugo](https://stackoverflow.com/questions/71691219/add-collapsible-section-in-hugo)
- `~/layouts/shortcodes/details.html` 생성 후 아래 내용 작성
```html
<details>
    <summary>{{ .Get "title" | default "더 보기" | markdownify }}</summary>
    <div>{{ .Inner | markdownify }}</div>
</details>
```
- 사용 시 아래와 같이 사용, title을 입력하지 않으면 default인 '더 보기'로 출력
```html
{{< details title="더 보기" >}}
쮜지직
{{< /details >}}
```
{{< details title="더 보기" >}}
쮜지직
{{< /details >}}

## Custom Height for Code Blocks with Global Scrollbar
- 출처: [Hugo Stack Theme Customization](https://blog.lucaslifes.com/p/hugo-stack-theme-customization/)
- `~/assets/scss/custom.scss`에 아래 내용 추가
```scss
// =============================
// Code Blocks
// =============================
/* Custom variable, modify the height here as needed */
$codeblock-max-height: 25em;

/* ① Set the outermost .highlight as the “only” scrollable container */
.highlight {
  max-height: $codeblock-max-height;
  overflow: auto;                 /* Controls both X and Y directions */
  -webkit-overflow-scrolling: touch; /* Inertia scrolling on mobile */
}

/* ② Disable internal pre/code scrollbars (to avoid double scrollbars) */
.highlight pre,
.highlight code,
.highlight .chroma {
  overflow: visible !important;   /* Override Stack’s overflow-x:auto on pre */
}

/* ③ Make the line number table auto-expand with content width to enable X scroll on wide blocks */
.lntable {
  display: inline-table;          /* Keeps table property, allows content-dependent width */
  min-width: max-content;
  border-spacing: 0;
}

/* ④ Disable auto-wrapping, long lines are handled by horizontal scrolling */
.lntd:last-child code,
.highlight code {
  white-space: pre;               /* No line breaks */
}
.lntd:first-child {
  user-select: none; // Prevent selecting line numbers
}
```

## Reduce Code Block Font Size
- 출처: [Hugo Stack Theme Customization](https://blog.lucaslifes.com/p/hugo-stack-theme-customization/)
- `~/assets/scss/custom.scss`에 아래 내용 추가
```scss
/* Left column (line numbers) */
.chroma .lntd, .chroma .lntd pre, .chroma .ln {
    font-size: 14px;
    font-family: var(--code-font-family);
}
/* Right column (code) */
.chroma code, .chroma pre {
    font-size: 14px;
    font-family: var(--code-font-family);
}
```

## MacOS-style Code Blocks
- 출처: [Hugo Stack Theme Customization](https://blog.lucaslifes.com/p/hugo-stack-theme-customization/)
- `~/static/img/code-header.svg` 추가하고 아래 내용 작성
```SVG
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  x="0px" y="0px" width="450px" height="130px">
    <ellipse cx="65" cy="65" rx="50" ry="52" stroke="rgb(220,60,54)" stroke-width="2" fill="rgb(237,108,96)"/>
    <ellipse cx="225" cy="65" rx="50" ry="52"  stroke="rgb(218,151,33)" stroke-width="2" fill="rgb(247,193,81)"/>
    <ellipse cx="385" cy="65" rx="50" ry="52"  stroke="rgb(27,161,37)" stroke-width="2" fill="rgb(100,200,86)"/>
</svg>
```
- `~/assets/scss/custom.scss`에 아래 내용 추가
```scss
// Add MacOS style to the top of code blocks
.article-content {
    .highlight {
        background-color: var(--pre-background-color);
        padding: var(--card-padding);
        position: relative;
        border-radius: 10px;
        max-width: 100% !important;
        margin: 0 !important;
        box-shadow: var(--shadow-l1) !important;
    }
    .highlight:before {
        content: "";
        display: block;
        background: url(/img/code-header.svg);
        height: 25px;
        width: 100%;
        background-size: 52px;
        background-repeat: no-repeat;
        margin-top: -10px;
        margin-bottom: 0;
    }
}
```

## Show Icon After External Links
- 출처: [Hugo Stack Theme Customization](https://blog.lucaslifes.com/p/hugo-stack-theme-customization/)
- `~/layouts/_default/_markup/render-link.html` 추가하고 아래 내용 작성
```html
<a class="link" href="{{ .Destination | safeURL }}" {{ with .Title}} title="{{ . }}"
    {{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank" rel="noopener"
    {{ end }}>{{ .Text | safeHTML }}</a>
{{ if strings.HasPrefix .Destination "http" }}
<span style="white-space: nowrap;"><svg width=".7em"
    height=".7em" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
    <path d="m13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" fill="currentColor" />
    <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"
        fill="currentColor">
</svg></span>
{{ end }}
```

## Back-to-Top Button
- 출처: [Hugo Stack Theme Customization](https://blog.lucaslifes.com/p/hugo-stack-theme-customization/)
- `~/layouts/partials/footer/components/script.html` 추가하고 아래 내용 작성
```html
<!-- Add back to top button -->
<script>
    function backToTop() {
    document.documentElement.scrollIntoView({
        behavior: 'smooth',
    })
    }

    window.onload = function () {
    let scrollTop =
        this.document.documentElement.scrollTop || this.document.body.scrollTop
    let totopBtn = this.document.getElementById('back-to-top')
    if (scrollTop > 0) {
        totopBtn.style.display = 'inline'
    } else {
        totopBtn.style.display = 'none'
    }
    }

    window.onscroll = function () {
    let scrollTop =
        this.document.documentElement.scrollTop || this.document.body.scrollTop
    let totopBtn = this.document.getElementById('back-to-top')
    if (scrollTop < 200) {
        totopBtn.style.display = 'none'
    } else {
        totopBtn.style.display = 'inline'
        totopBtn.addEventListener('click', backToTop, false)
    }
    }
</script>
```
- `~/layouts/partials/footer/custom.html` 추가하고 아래 내용 작성
```html
<!-- Add back to top button -->
<a href="#" id="back-to-top" title="Back to top"></a>

<!-- Back to top button CSS -->
<style>
#back-to-top {
    display: none;
    position: fixed;
    bottom: 5px;
    right: 15px;
    width: 40px; /* Reduced size */
    height: 40px; /* Reduced size */
    border-radius: 50%; /* Circular button for modern look */
    background-color: var(--body-background);
    box-shadow: var(--shadow-l2);
    font-size: 20px; /* Adjusted for smaller button */
    text-align: center;
    line-height: 38px; /* Center align arrow */
    cursor: pointer;
    transition:
    transform 0.3s ease,
    background-color 0.3s ease; /* Added smooth interaction */
}

#back-to-top:before {
    content: "";
    display: inline-block;
    position: relative;
    transform: rotate(135deg);
    height: 8px; /* Reduced size */
    width: 8px; /* Reduced size */
    border-width: 0 0 2px 2px;
    border-color: var(--back-to-top-color);
    border-style: solid;
}

#back-to-top:hover {
    transform: scale(1.1); /* Slightly larger on hover */
    background-color: var(--accent-background); /* Optional hover effect */
}

#back-to-top:hover:before {
    border-color: var(--accent-color); /* Change arrow color on hover */
}

/* Responsive styles */
@media screen and (max-width: 768px) {
    #back-to-top {
    bottom: 5px;
    right: var(--container-padding);
    width: 30px; /* Slightly smaller for mobile */
    height: 30px;
    font-size: 16px;
    line-height: 32px;
    }
}

@media screen and (min-width: 1024px) {
    #back-to-top {
    bottom: 10px;
    right: 20px;
    }
}

@media screen and (min-width: 1280px) {
    #back-to-top {
    bottom: 15px;
    right: 25px;
    }
}

@media screen and (min-width: 1536px) {
    #back-to-top {
    bottom: 15px;
    right: 25px;
    /* visibility: hidden; */
    }
}
</style>
```

## Top Loading Progress Bar
- `~/layouts/partials/footer/custom.html`에 아래 내용 추가
```html
<!-- Top Loading Progress Bar -->
<script
    src="https://cdn.jsdelivr.net/gh/zhixuan2333/gh-blog@v0.1.0/js/nprogress.min.js"
    integrity="sha384-bHDlAEUFxsRI7JfULv3DTpL2IXbbgn4JHQJibgo5iiXSK6Iu8muwqHANhun74Cqg"
    crossorigin="anonymous"
></script>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/zhixuan2333/gh-blog@v0.1.0/css/nprogress.css"
    integrity="sha384-KJyhr2syt5+4M9Pz5dipCvTrtvOmLk/olWVdfhAp858UCa64Ia5GFpTN7+G4BWpE"
    crossorigin="anonymous"
/>
<script>
    NProgress.start();
    document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") NProgress.inc(0.8);
        if (document.readyState === "complete") NProgress.done();
    });
</script>
```