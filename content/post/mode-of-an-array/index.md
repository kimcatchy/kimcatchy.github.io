---
IDX: "35"
slug: "mode-of-an-array"
tags:
  - CodingTest
  - C
description: "프로그래머스"
categories:
  - Code
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 18:45:00+0900"
상태: "Ready"
title: "배열의 최빈값 구하기"
---
## 문제

[object Promise]### 제한사항

- 0 < array의 길이 < 100

- 0 ≤ array의 원소 < 1000

## 풀이

```c++
#include <stdlib.h>

int solution(int array[], size_t array_len) {
    if (array_len == 1) return array[0];

    int count[1000] = {0}; // 빈도를 저장할 배열 생성
    int max_freq = 0;
    int mode = -1;
    int mode_count = 0;

    // 빈도 기록
    for (int i = 0; i < array_len; i++) {
        count[array[i]]++;
        if (count[array[i]] > max_freq) {
            max_freq = count[array[i]];
        }
    }

    // 최빈수와 최빈수의 빈도 확인
    for (int i = 0; i < 1000; i++) {
        if (count[i] == max_freq) {
            mode = i;
            mode_count++;
            if (mode_count > 1) {
                return -1;
            }
        }
    }

    return mode;
}
```

- 배열의 원소가 하나라면 해당 원소의 값 return

- 제한사항에서 배열의 원소가 1000 미만이므로 빈도를 저장할 배열의 길이를 1000으로 했음

## 다른 사람들의 풀이

```c++
#include <stdlib.h>

int solution(int array[], size_t array_len) {
    int answer = 0;
    int count = 0;
    int check = 0;
    for(int i = 0; i < array_len; i++){
        for(int j = i; j < array_len; j++){
            if (array[i] == array[j]) count++;
        }
        if(count > check){
            answer = array[i];
            check = count;
        }
        else if(count == check){
            answer = -1;
        }
        count = 0;
    }
    return answer;
}
```

- 배열에서 이후의 요소에 같은 값이 존재하면 count 증가

- 해당 요소의 count가 check(이전에 확인한 최빈값의 빈도)보다 크면 answer에 값을 저장 후 check에 count 저장

- count와 check의 값이 같다면 answer에 -1 저장

