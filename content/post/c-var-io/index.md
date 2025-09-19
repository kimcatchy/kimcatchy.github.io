---
IDX: "14"
slug: "c-var-io"
tags:
  - C
description: "C언어I"
categories:
  - Code
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 05:57:00+0900"
상태: "Ready"
title: "변수와 입출력"
---
## 두 입력값의 합 출력

```c++
#include <stdio.h>

int main(void) {
	int a;
	int b;
	int c;
	printf("input a \n");
	scanf_s("%d", &a);
	printf("input b \n");
	scanf_s("%d", &b);
	c = a + b;
	printf("result of c: \n%d + %d = %d", a, b, c);
}
```

- `#include <stdio.h>`는 `printf`와 `scanf`를 사용하기 위한 헤더 파일을 불러오는 것

- Visual Studio에서 `scanf`에 문제가 있어 `scanf_s` 사용

- 정수는 int, 실수는 float, 문자(문자열 X)는 char

- `printf` 시 정수는 `%d`, 실수는 `%f`, 문자는 `%c`

## 세 입력값의 합과 평균 출력

```c++
#include <stdio.h>

int main(void) {
	float a, b, c;
	float sum, avg;
    
	printf("input a \n");
	scanf_s("%f", &a);
	printf("input b \n");
	scanf_s("%f", &b);
	printf("input c \n");
	scanf_s("%f", &c);
    
	sum = a + b + c;
	avg = (a + b + c) / 3;
    
	printf("sum of a, b, c: \n%f + %f + %f = %f\n", a, b, c, sum);
	printf("avg of a, b, c: \n(%f + %f + %f) / 3 = %f\n", a, b, c, avg);
}
```

## 나눗셈 후 몫과 나머지

```c++
#include <stdio.h>

int main(void) {
	int a, b;
	int q, r;

	scanf_s("%d", &a);
	scanf_s("%d", &b);

	q = a / b;
	r = a % b;

	printf("quotient: %d, remainder: %d\n", q, r);
}
```

