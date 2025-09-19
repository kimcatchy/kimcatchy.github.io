---
IDX: "27"
slug: "selection-sort"
tags:
  - C
description: "C언어I"
categories:
  - Code
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 17:37:00+0900"
상태: "Ready"
title: "선택 정렬 알고리즘"
---
### 알고리즘

- 잘 정의되고 명백한 규칙들의 집합 또는 유한 번의 단계 내에서 문제를 풀기 위한 과정

- 프로그램에서 가장 핵심적인 부분

### 선택 정렬

```c++
#include <stdio.h>

int main(void) {
	int i, j, a[10];
	int min, idx;
	int tmp;

	for (i=0; i<10; i++) {
		scanf_s("%d", &a[i]);
	}

	for (i = 0; i < 9; i++) {
		min = 99999;
		for (j = i; j < 10; j++) {
			if (a[j] < min) {
				min = a[j];
				idx = j;
			}
		}
		tmp = a[idx];
		a[idx] = a[i];
		a[i] = tmp;
	}
	for (i = 0; i < 10; i++) {
		printf("%d\\n", a[i]);
	}
}
```

- 10개의 수를 입력 받아 저장한 뒤 오름차순으로 정렬하여 출력

- 최초의 min 값은 크게 설정

