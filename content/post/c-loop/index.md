---
IDX: "17"
slug: "c-loop"
tags:
  - C
description: "C언어I"
categories:
  - Code
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 11:48:00+0900"
상태: "Ready"
title: "반복문"
---
## While문을 통해 1 ~ 5 출력

```c++
#include <stdio.h>

int main(void) {
	int i;
	i = 0;

	while (i < 5) {
		i += 1;
		printf("%d\n", i);
	}
}
```

- printf를 i의 증가 이전에 출력할 경우 0 ~ 4 출력

## While문을 통해 1부터 n까지의 합계 출력

```c++
#include <stdio.h>

int main(void) {
	int i, sum, en;
	i = 1;
	sum = 0;

	scanf_s("%d", &en);

	while (i <= en) {
		sum += i;
		i += 1;
	}

	printf("%d\n", sum);
}
```

- 1부터 입력받은 숫자 en까지의 합계를 while문으로 계산한 뒤 출력

## For문을 통해 1부터 n까지의 합계 출력

```c++
#include <stdio.h>

int main(void) {
	int i, sum, en;
	i = 1;
	sum = 0;

	scanf_s("%d", &en);

	for (i = 1; i <= en; i++) {
		sum += i;
	}

	printf("%d\n", sum);
}
```

## 소수 판별

```c++
#include <stdio.h>

int main(void) {
	int a, b, i;
	scanf_s("%d", &a);
	b = 0;

	for (i = 2; i < a; i++) {
		if (a % i == 0) {
			b = 1;
			break;
		}
	}
	if (b == 0) {
		printf("%d is prime number\n", a);
	} else {
		printf("%d is not prime number\n", a);
	}
}
```

- a = 입력 받는 수

- b = 결과 출력 전 a의 소수 판별 여부 저장

- i를 2부터 1씩 증가시키며 a를 i로 나눠 약수 여부를 판단

- 약수가 있을 경우 b를 1로 변경하고 for문을 중단(break)

- b의 값에 따라 결과 출력

