---
IDX: "40"
slug: "c-struct"
tags:
  - C
description: "C언어I"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 19:10:00+0900"
상태: "Ready"
title: "구조체"
---
## 구조체

- 여러 종류의 변수를 모아서 한 번에 만들 수 있도록 한 것

- 배열과의 차이: 배열은 같은 종류의 변수를 여러 개 만들 때 사용

### 예시 1: 평면 위의 점을 x, y 좌표로 표현

```c++
// 구조체를 사용하지 않았을 때
float a_x, a_y;
float b_x, b_y;
```

```c++
// 구조체를 사용했을 때
struct point {
    float x;
    float y;
} a, b;
```

- 구조체를 사용하지 않으면 a\_x와 a\_y 등의 관계가 불명확함

- 구성 요소가 많을수록 구조체가 유리해짐

- point는 구조체 태그, 구조체 태그가 선언되면 이후에 그 태그로 변수 생성 가능

```c++
struct point {
    float x;
    float y;
} a, b;

// 구조체 변수 안의 멤버에 접근
a.x = 3.0;
b.y = a.x * 2;

// 배열처럼 초기화 가능
struct point a = {2.0, 3.0};

// 구조체 변수끼리 대입
struct point a = {2.0, 3.0}, b;
b = a;
```

### 예시 2: 두 점의 좌표를 입력 받아서 두 점 사이의 거리 출력

```c++
struct point {
    float x, y;
};
struct point a, b;
float d;

scanf_s("%f", &a.x);
scanf_s("%f", &a.y);
scanf_s("%f", &b.x);
scanf_s("%f", &b.y);

d = (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y);
d = sqrt(d);

printf("%f\\n", d);
```

- struct point는 구조체의 틀만 선언하는 것이고 실제로 공간이 할당되는 것은 아님

- 실제 공간 할당은 변수를 만들 때 할당

## 구조체 배열

```c++
struct point {
    float x, y;
};
struct point b[5];

b[2].x = 1.0;
b[3].y = b[2].x * 3;
```

## 구조체 포인터

```c++
struct point {
    float x, y;
};
struct point a;
struct point *c;

c = &a;
(*c).x = 7.0;
(*c).y = (*c).x + 2;
// (*c).x 는 c->x 와 같이 사용할 수 있음
```

```c++
#include <stdio.h>
int main() {
    struct point {
        float x, y;
    };
    struct point b[5];
    struct point *c;

    c = b;
    c[1].x = 2.0;
    (c+2)->y = (*(c+1)).x + (b+1)->x;

    for (int i=0; i<5; i++) {
        printf("%f ", b[i].x);
        printf("%f\\n", b[i].y);
    };
}

// 출력 결과: b[1].x = 2.0, b[2].y = 4.0
```

## 구조체 관련 문법

- 구조체 멤버로 가능한 것들: 변수, 배열, 포인터, 다른 구조체 변수

- 자기 참조 구조체: 구조체 멤버로 자신을 포함하는 경우

    - 자기 자신(구조체)를 넣을 경우 무한히 큰 공간을 차지하므로 불가능

    - 자기 자신의 포인터는 가능

- typedef: 사용자가 새로운 자료형 이름을 만들어 사용할 수 있게 함

```c++
typedef struct point {
    float x, y;
} t_point;
...
t_point a, b;
```

## 구조체와 함수

```c++
#include <stdio.h>
#include <math.h>

struct point {
    float x, y;
};

float dist(struct point a, struct point b) {
    float d;
    d = (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y);
    d = sqrt(d);
    return d;
}

int main(void) {
    struct point e, f;
    float d;

    scanf("%f", &e.x);
    scanf("%f", &e.y);
    scanf("%f", &f.x);
    scanf("%f", &f.y);
    d = dist(e, f);
    printf("%f\\n", d);
}
```

- 함수의 매개변수로 구조체형이 올 수 있음

- 인자가 매개변수로 복사됨

    - 값에 의한 호출

    - 각각의 멤버들이 그대로 복사됨

    - 멤버가 많을 경우 비효율적이 될 수 있음 → 구조체 포인터를 주로 이용

```c++
#include <stdio.h>
#include <math.h>

struct point {
    float x, y;
};

float dist(struct point *a, struct point *b) {
    float d;
    d = (a->x - b->x)*(a->x - b->x) + (a->y - b->y)*(a->y - b->y);
    d = sqrt(d);
    return d;
}

int main(void) {
    struct point e, f;
    float d;

    scanf("%f", &e.x);
    scanf("%f", &e.y);
    scanf("%f", &f.x);
    scanf("%f", &f.y);
    d = dist(&e, &f);
    printf("%f\\n", d);
}
```

