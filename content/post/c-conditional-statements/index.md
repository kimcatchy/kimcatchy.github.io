---
IDX: "15"
slug: "c-conditional-statements"
tags:
  - C
description: "C언어I"
categories:
  - Code
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 06:02:00+0900"
상태: "Ready"
title: "조건문"
---
## 음식 추천

```c++
#include <stdio.h>

int main(void) {
	char f;
	int	m;

	printf("Which food do u wanna eat? (w: western, k: korean)\n");
	scanf_s(" %c", &f);
	printf("How much do u have?\n");
	scanf_s("%d", &m);

	if (f == 'w') {
		if (m < 3000) {
			printf("You should eat hamburger.\n");
		} else {
			printf("You should eat pasta.\n");
		};
	} else if (f == 'k') {
		if (m < 3000) {
			printf("You should eat kimbap.\n");
		} else {
			printf("You should eat samgyeopsal.\n");
		};
	} else {
		printf("Inappropriate food symbol!\n");
	};
}
```

- 양식/한식 선택 시 잘못된 문자 입력 시는 처리를 했는데, 가진 돈 입력 시 숫자 외의 값이 입력될 때는 아직 안 배워서 처리 못했음

- scanf\_s 에서 문자 입력 시 %c 앞에 한 칸 띄우라는데, scanf로 입력 받을 시에 직접적으로 사용되지 않는 문자들(공백, 줄바꿈 등)은 버퍼에 그대로 남아있게 되는데, %c가 그것들을 사용하려고 해서 그렇다고 함, 공백을 넣어주면 공백을 버리고 입력을 받음

## 입력한 두 수 중 큰 수 출력

```c++
#include <stdio.h>

int main(void) {
	int a, b, c;

	scanf_s("%d", &a);
	scanf_s("%d", &b);

	c = (a > b) ? a : b;
	printf("Bigger numbur is: %d\n", c);
}
```

- a와 b를 비교해서 a가 더 클 경우 c에 a의 값을 저장

- 조건을 만족하지 못했을 경우 c에 b의 값이 저장됨

