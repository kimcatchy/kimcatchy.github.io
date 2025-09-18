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
```markdown
{{< linkembed url="https://kimcatchy.github.io" text="nolog" >}}
```
{{< linkembed url="https://kimcatchy.github.io" text="nolog" >}}

## Collapsible Section Shortcode
- `~/layouts/shortcodes/details.html` 생성 후 아래 내용 작성
```html
<details>
    <summary>{{ .Get "title" | default "더 보기" | markdownify }}</summary>
    <div>{{ .Inner | markdownify }}</div>
</details>
```
- 사용 시 아래와 같이 사용, title을 입력하지 않으면 default인 '더 보기'로 출력

```markdown
{{< details title="더 보기" >}}
쮜지직
{{< /details >}}
```
{{< details title="더 보기" >}}
쮜지직
{{< /details >}}

## Modified MacOS Style Code Blocks
- 적용한 기능
  - Custom Height for Code Blocks with Global Scrollbar
  - Reduce Code Block Font Size
  - MacOS-style Code Blocks
  - Show Language on Code Block Header
- `~/static/img/code-header.svg` 추가하고 아래 내용 작성
```SVG
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  x="0px" y="0px" width="450px" height="130px">
    <ellipse cx="65" cy="65" rx="50" ry="52" stroke="rgb(220,60,54)" stroke-width="2" fill="rgb(237,108,96)"/>
    <ellipse cx="225" cy="65" rx="50" ry="52"  stroke="rgb(218,151,33)" stroke-width="2" fill="rgb(247,193,81)"/>
    <ellipse cx="385" cy="65" rx="50" ry="52"  stroke="rgb(27,161,37)" stroke-width="2" fill="rgb(100,200,86)"/>
</svg>
```
- `~/layouts/_default/_markup/render-codeblock.html` 추가하고 아래 내용 작성
```html
{{ $lang := .Type | default "text" }}
{{ $result := transform.HighlightCodeBlock . }}

<div class="code-block-wrapper">
  <!-- 언어 라벨 표시 -->
  <div class="code-block-header">
    <div class="code-block-dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <div class="code-block-language">{{ $lang }}</div>
  </div>
  
  <!-- 실제 코드 블록 -->
  <div class="code-block-content">
    {{ $result.Wrapped }}
  </div>
</div>
```
- `~/assets/scss/custom.scss`에 아래 내용 추가
```scss
/* ============================= */
/* 코드 블록 설정 */
/* ============================= */
/* 최대 높이 변수 설정 */
$codeblock-max-height: 25em;

/* 코드 블록 래퍼 */
.code-block-wrapper {
    background-color: var(--pre-background-color);
    border-radius: 10px;
    margin: 20px 0;
    box-shadow: var(--shadow-l1);
    overflow: hidden;
    width: 100%;
    position: relative;
    display: block;
    clear: both;
}

/* Mac 스타일 헤더 + 언어 라벨 */
.code-block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background-color: var(--card-background-selected);
    border-bottom: 2px solid var(--accent-color);
    min-height: 40px;
    border-radius: 10px 10px 0 0;
}

.code-block-dots {
    display: flex;
    gap: 8px;
}

.dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
}

.dot.red { background-color: #ff5f56; }
.dot.yellow { background-color: #ffbd2e; }
.dot.green { background-color: #27ca3f; }

.code-block-language {
    color: var(--accent-color);
    font-family: var(--code-font-family);
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    opacity: 0.9;
}

/* 코드 내용 영역 */
.code-block-content {
    position: relative;
    overflow: auto;
    max-height: $codeblock-max-height;
    -webkit-overflow-scrolling: touch;
    
    .highlight {
        margin: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        background-color: transparent !important;
        padding: var(--card-padding) !important;
    }
}

/* 기존 .highlight:before 비활성화 */
.article-content .code-block-wrapper .highlight:before {
    display: none !important;
}

/* 기존 코드 블록 스타일 */
.highlight {
    max-height: $codeblock-max-height;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

.highlight pre,
.highlight code,
.highlight .chroma {
    overflow: visible !important;
}

.lntable {
    display: inline-table;
    min-width: max-content;
    border-spacing: 0;
}

.lntd:last-child code,
.highlight code {
    white-space: pre;
}

.lntd:first-child {
    user-select: none;
}

/* 기존 .highlight 스타일 */
.article-content .highlight {
    background-color: var(--pre-background-color);
    padding: var(--card-padding);
    position: relative;
    border-radius: 10px;
    max-width: 100% !important;
    margin: 0 !important;
    box-shadow: var(--shadow-l1) !important;
    
    &:before {
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

/* 좌측 폰트 설정 (ln) */
.chroma .lntd,
.chroma .lntd pre,
.chroma .ln {
    font-size: 14px;
    font-family: var(--code-font-family);
}

/* 우측 폰트 설정 (code) */
.chroma code,
.chroma pre {
    font-size: 14px;
    font-family: var(--code-font-family);
}
```

## Show Icon After External Links
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

## Modified Stack Theme UI
- 적용한 기능
  - Back-to-Top Button
  - Top Loading Progress Bar
- 참고한 블로그 글처럼 script.html 사용 시 기존 script.html이 override 돼서 오류 발생
- `~/layouts/partials/footer/custom.html` 추가하고 아래 내용 작성
```html
<!-- Back to Top Button -->
<a href="#" id="back-to-top" title="Back to top"></a>

<!-- Back to Top Button Styles -->
<style>
#back-to-top {
    display: none;
    position: fixed;
    bottom: 5px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--body-background);
    box-shadow: var(--shadow-l2);
    font-size: 20px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
    z-index: 999;
}

#back-to-top:before {
    content: "";
    display: inline-block;
    position: relative;
    transform: rotate(135deg);
    height: 8px;
    width: 8px;
    border-width: 0 0 2px 2px;
    border-color: var(--accent-color);
    border-style: solid;
}

#back-to-top:hover {
    transform: scale(1.1);
    background-color: var(--accent-background);
}

/* 반응형 스타일 */
@media screen and (max-width: 768px) {
    #back-to-top {
        bottom: 5px;
        right: var(--container-padding);
        width: 30px;
        height: 30px;
        font-size: 16px;
        line-height: 32px;
    }
}
</style>

<!-- Back to Top + NProgress Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Back to Top 기능
    const backToTopBtn = document.getElementById('back-to-top');
    
    function backToTop() {
        document.documentElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    function updateBackToTopVisibility() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (scrollTop > 200) {
            backToTopBtn.style.display = 'inline';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
    
    // 이벤트 리스너는 한 번만 등록
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backToTop();
        });
        
        window.addEventListener('scroll', updateBackToTopVisibility);
        updateBackToTopVisibility(); // 초기 상태 설정
    }
});

<!-- NProgress -->
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/zhixuan2333/gh-blog@v0.1.0/js/nprogress.min.js';
    script.integrity = 'sha384-bHDlAEUFxsRI7JfULv3DTpL2IXbbgn4JHQJibgo5iiXSK6Iu8muwqHANhun74Cqg';
    script.crossOrigin = 'anonymous';
    
    script.onload = function() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/gh/zhixuan2333/gh-blog@v0.1.0/css/nprogress.css';
        link.integrity = 'sha384-KJyhr2syt5+4M9Pz5dipCvTrtvOmLk/olWVdfhAp858UCa64Ia5GFpTN7+G4BWpE';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        
        if (typeof NProgress !== 'undefined') {
            let progressStarted = false;
            let progressCompleted = false;
            
            function startProgress() {
                if (!progressStarted) {
                    NProgress.start();
                    progressStarted = true;
                    progressCompleted = false;
                }
            }
            
            function completeProgress() {
                if (progressStarted && !progressCompleted) {
                    NProgress.done();
                    progressCompleted = true;
                    progressStarted = false;
                }
            }
            
            // 즉시 시작
            if (document.readyState === 'loading') {
                startProgress();
            }
            
            // 다양한 완료 조건 체크
            function checkAndComplete() {
                if (document.readyState === 'complete') {
                    completeProgress();
                    return true;
                }
                return false;
            }
            
            // readyState 변경 감지
            document.addEventListener('readystatechange', function() {
                if (document.readyState === 'interactive') {
                    if (progressStarted) NProgress.inc(0.8);
                } else if (document.readyState === 'complete') {
                    setTimeout(completeProgress, 100); // 약간의 지연
                }
            });
            
            // 추가 완료 조건들
            window.addEventListener('load', function() {
                setTimeout(completeProgress, 200);
            });
            
            // 강제 완료 타이머 (백업)
            setTimeout(function() {
                if (!progressCompleted) {
                    console.log('NProgress 강제 완료');
                    completeProgress();
                }
            }, 10000); // 10초 후 강제 완료
            
            // 페이지가 이미 로드된 경우
            if (document.readyState === 'complete') {
                setTimeout(completeProgress, 100);
            }
        }
    };
    
    document.head.appendChild(script);
})();
</script>
```

## References
- [Hugo Stack Theme Customization](https://blog.lucaslifes.com/p/hugo-stack-theme-customization/)
- [Add collapsible section in hugo](https://stackoverflow.com/questions/71691219/add-collapsible-section-in-hugo)