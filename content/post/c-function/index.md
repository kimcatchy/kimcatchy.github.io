---
IDX: "21"
slug: "c-function"
tags:
  - C
description: "C언어I"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 12:33:00+0900"
상태: "Ready"
title: "C 함수"
---
## 함수란?

- 그룹 지어진 작업

- 긴 프로그램 작성 시 유용

- 초기의 고급 언어(FORTRAN, COBOL, BASIC 등) → 함수 개념 미미

- C → 함수에 기반한 언어

- 현대의 고급언어(C++, JAVA, C#, Python) → 객체 지향 언어

## 함수 선언

```c++
#include <stdio.h>
int avg(int a, int b);

int main(void) {
    int a, b, c;
    
    a = 20;
    b = 12;
    c = avg(a, b);
    printf("%d\n", c);
}

int avg(int a, int b) {
    int c;
    c = (a+b)/2;
    return c;
}
```

- 함수를 호출하기 이전에 함수가 정의 또는 선언되어 있어야 함

- 함수가 main보다 아래에 있으면 컴파일러 오류 발생

- 하지만 함수가 아래에 있는 형태가 읽기에 편함

    - 해결 방법으로 함수의 머리 부분(함수 원형)만 미리 기술

- 함수가 선언되어 있으면 함수 정의는 프로그램의 어디에 위치해도 괜찮음

- **매개변수**: parameter, formal argument, 형식인자, 형식매개변수

- **인자**: argument, actual argument, 실인자, 실매개변수

### void

- 반환값 자료형 자리에 void를 적으면 반환값이 없다는 의미

- 수를 끝낼 때 return 뒤에 반환값이 없어도 되고, 아예 return;이 없어도 됨

- 매개변수 자리에 void를 적으면 매개변수가 없다는 의미

## 다양한 함수

### 배열을 사용하는 함수 주의점

```c++
#include <stdio.h>

int array_sum(int a[5]) {
    int i, sum;
    sum = 0;
    for(i=0;i<5;i++) {
    	sum += a[i];
    }
    a[2] = 8;
    return sum;
}

int main(void) {
    int b[5] = {10, 2, 3, 7, 9}
    printf("%d\n", array_sum(b));
    return 0;
}
```

- `array_sum` 함수는 입력받은 배열 내의 수의 합을 계산하는 함수

- 배열을 사용하는 함수는 값에 의한 호출 개념이 적용되지 않음

    - 실제로는 입력받은 b 배열의 이름만 잠시 a로 바꾼 것이기 때문에 함수 내부에서 `a[2] = 8`을 해버리면 `b[2]`의 값이 8로 바뀌게 됨

    - 값에 의한 호출은 포인터를 통해 단일하게 설명 가능

    - 이름만 재지정하는 것이기 때문에 매개변수에서 배열의 크기를 지정하는 것이 불필요 (`int a[]`만 써도 됨)

```c++
#include <stdio.h>
int array_sum2(int a[][3], int n) {
    int i, j, sum;
    sum = 0;
    for(i=0;i<n;i++) {
        for(j=0;j<3;j++) {
            sum = sum + a[i][j];
        }
    }
    return sum;
}
int main(void) {
    int b[2][3] = { {3,2,3}, {2,3,4} };
    printf("%d\n", array_sum2(b,2));
}
```

- 다차원 배열의 경우 첫 번째 크기만 생략 가능하고 나머지 크기는 지정 필요 (`int a[][3]`)

    - 보통 첫 번째 크기는 따로 넘겨 받음 (위의 코드에서는 n=2)

    - 나머지 크기가 다를 경우 오류 발생

### 재귀 함수

```c++
#include <stdio.h>

int fact(int a) {
    int mul;
    if(a>=2) {
        mul = a*fact(a-1);
    } else {
        mul = 1;
    }
    return mul;
}

int main(void)
{
    int res;
    res = fact(5);
    printf("%d", res);
}
```

- **재귀 함수**: 자기 자신을 다시 호출하는 함수

- 코드는 새로 생성되는 것이 아니지만 변수는 함수는 호출할 때마다 새로 생성 (a, mul)

- 함수가 반환되면 생성된 변수들도 같이 소멸

- 무한히 호출할 수는 없기 때문에 마치는 조건 설정 필요

### 난수 생성 함수

```c++
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int a, i;
    for (i=0;i<10;i++) {
        a = rand();
        printf("%d\n", a);
    }
}
```

- **난수**: 규칙이 없어서 다음에 나올 수를 예측할 수 없는 수 (로또 번호, 주사위 등)

- `rand()`: C 언어에서의 난수 생성 함수

    - 호출할 때마다 난수를 하나씩 반환

    - **난수의 범위**: 0 ~ 32767 (컴퓨터에 따라 다를 수 있음)

    - `#include <stdlib.h>`

```c++
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    int a, i;
    srand(time(NULL));
    for (i=0;i<10;i++) {
        a = rand()%10+1;
        printf("%d\n", a);
    }
}
```

- `srand(시드)`: rand의 시드를 설정하는 함수

    - 컴퓨터에서의 난수는 정해진 규칙에 따라 난수를 생성하기 때문에 위의 코드를 실행하면 같은 결과만 출력됨

    - 시드가 동일하면 여전히 같은 결과가 출력됨

    - `srand(time(NULL))`의 경우 실행 시간을 기준으로 실행할 때마다 시드를 바꿔줄 수 있음

- `rand()%(b-a+1)+a`: [a ~ b] 범위의 수만 출력

