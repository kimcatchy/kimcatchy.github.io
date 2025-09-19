---
IDX: "37"
slug: "length-of-string"
tags:
  - CodingTest
  - C
description: "프로그래머스"
categories:
  - Code
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 18:50:00+0900"
상태: "Ready"
title: "문자열의 길이"
---
## 문제

[object Promise]### 제한사항

- 공백도 하나의 문자로 취급합니다.

- 1 ≤ message의 길이 ≤ 50

- 편지지의 여백은 생각하지 않습니다.

- **message**는 영문 알파벳 대소문자, ‘!’, ‘~’ 또는 공백으로만 이루어져 있습니다.

## 풀이

```c++
int solution(const char* message) {
    int answer = 0;
    while (message[answer] != '\\0') answer++;
    return answer*2;
}
```

- char* message는 문자열인 message의 첫 번째 주소

- 마지막 주소는 null(\0)

- 문자열의 첫 주소부터 while문이 시작해서 null이 나오기 전까지 answer++

```c++
#include <string.h>
int solution(const char* message) {
    return strlen(message)*2;
}
```

- `string.h` 헤더 파일 사용

- `strlen` 함수로 문자열의 길이를 구한 후 값의 2배 return

