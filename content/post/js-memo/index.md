---
IDX: "5"
slug: "js-memo"
tags:
  - Javascript
description: "자주 헷갈리던 거.."
categories:
  - Code
update: "2025-09-20 00:15:00+0900"
date: "2025-09-18 23:07:00+0900"
상태: "Ready"
title: "자바스크립트 메모"
---
## array 관련

### 배열 내 다중 항목 검색

```javascript
let names= ["Style","List","Raw"];

let results= names.filter(x => x.toLowerCase().includes("s"));
console.log(results); //["Style", "List"]

names.forEach(x => {if (x.toLowerCase().includes("s")) results.push(x)});
```

