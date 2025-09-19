---
IDX: "18"
slug: "c-types-and-conversion"
tags:
  - C
description: "C언어I"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 11:52:00+0900"
상태: "Ready"
title: "자료형과 형변환"
---
## 자료형

- 저장하거나 계산하는 값의 종류

- C에서 다루는 자료형: 정수, 실수, 문자

    - 정수: int a;

    - 실수: float b;

    - 문자: char c;

- **sizeof**: 자료형의 크기를 알고 싶을 때 사용하는 연산자

    - 결과값은 바이트 단위의 크기

    - 동적할당 등에 유용하게 사용

    - 자료형의 크기는 컴퓨터나 운영체제에 따라 달라질 수 있음

### 정수형

- `signed short int`: 16비트 / -2^15~2^15-1 / short, short int, signed short

- `unsigned short int`: 16비트 / 0~2^16-1 / unsigned short

- `signed int`: 32비트 / -2^31~2^31-1 / int, signed

- `unsigned int`: 32비트 / 0~2^32-1 / unsigned

- `signed long int`: 32비트 / -2^31~2^31-1 / long, long int, signed long

- `unsigned long int`: 32비트 / 0~2^32-1 / unsigned long

- 크기에 따라 int형이나 long int형으로 자동 설정

- 수의 끝에 L이나 l을 추가하면 lont int형으로 설정

- U나 u를 추가하면 unsigned형으로 설정

#### 정수형 상수 진법 표기

- **8진법**: 0으로 시작(0123 = 123(8))

- **16진법**: 0x or 0X로 시작(0x1A1B = 1A1B(16))

#### 정수형의 변환 명세

- `%d`: printf, scanf: signed 10진수

- `%u`: printf, scanf: unsigned 10진수

- `%o`: printf, scanf: 8진수, 첫 자리 0 표기 안함

- `%x`: printf: 16진수, abcedf로 출력, 첫 자리 0X 표기 안함, scanf: 16진수, 첫 자리 0x나 0X 표기 안함

- `%X`: printf: 16진수, ABCDEF로 출력, 첫 자리 0X 표기 안함

- `%i`: printf: signed 10진수, scanf: 0이 처음에 있으면 8진수, 0x나 0X가 처음에 있으면 16진수로 해석, 어느 쪽도 아니면 10진수로 해석

- short형 변수나 값에 대해 입출력을 하고 싶을 경우 변환 명세 글자 앞 h 추가

- long형 변수나 값에 대해 입출력을 하고 싶을 경우 변환 명세 글자 앞 l 추가

#### 변환 지정자

[object Promise]- **flag**

    - `-` (왼쪽 맞춤)

    - `+` (양수에 대해서도 부호 출력)

    - `0` (남는 왼쪽 자리는 0으로 채움)

    - `#` (%o와 같이 사용되면 처음에 0을, %x(%X)와 같이 사용되면 처음에 0x(0X)를 출력)

- **width**

    - 정수

    - 출력할 자리의 폭 지정

    - 기본적으로 오른쪽 맞춤

- **precision**

    - 정수

    - 출력할 최소의 자리수 지정

    - 남는 자리는 0으로 채움

[object Promise]### 실수형

- `float`: 32비트

- `double`: 64비트

- `long double`: 64, 96, 128비트

- 12는 정수지만 12.0은 실수로 취급

- e나 E를 붙여 10의 몇 승이 곱해지는지 표기

    - 지수승 형태는 항상 실수형

    - 12.34e1 = 12.34 * 10^1 = 123.4

- 기본적으로 double형

    - float형을 원하면 f나 F를 뒤에 추가

    - long double형을 원하면 l이나 L을 뒤에 추가

#### 실수형의 변환 명세

- float형 - printf

    - `%f`: mmm.dddd의 형태

    - `%e`, `%E`: 지수 표현 형태

    - `%g`, `%G`: %f / %e / %E 중 적절한 형태

- float형 - scanf

    - `%f`, `%e`, `%E`, `%g`, `%G` 모두 사용 가능하나 구별은 되지 않음

- double형

    - printf의 경우 float형과 동일한 변환 명세

    - scanf의 경우 `%lf`와 같이 앞에 `l`을 추가

    - 통일성을 위해 printf에서도 `%lf`등을 사용하도록 추가

- long double형

    - `%Lf`와 같이 앞에 `L`을 추가

#### 변환 지정자

- 정수형과 같이 지정자들을 사용할 수 있음

- flag나 width는 동일하지만 precision에서 차이

    - `%f`, `%e`, `%E`의 경우 소수점 이하 자리수, precision을 지정하지 않을 경우 소수점 이하 6자리

    - `%g`, `%G`의 경우 유효 숫자의 최대 개수

### 문자형

- `char`: 8비트, -2^7~2^7-1

- `signed char`: 8비트, 0~2^8-1

- `unsigned char`: 8비트, -2^7~2^7-1 또는 0~2^8-1

- 문자는 정수로 바꾼 뒤 저장, 아스키 코드

## 형변환

- 기본적으로 사칙연산은 같은 자료형끼리 해야 함, 결과도 같은 자료형이 됨

- 서로 다른 자료형 간의 연산은 피연산자를 더 넓은 자료형으로 맞춰 결과도 더 넓은 자료형이 됨

- char, short, signed, unsigned → int, unsigned int

    - 보통 컴퓨터가 가장 효율적으로 처리할 수 있는 자료형을 int형으로 정함

- 형 넓히기 5가지 규칙

    - 두 피연산자 중 하나가 long double이면 다른 하나도 long double로 변환

    - 위 경우가 아닐 때, 한 피연산자가 double이면 다른 하나도 double로 변환

    - 위 두 경우가 모두 아닐 때, 한 피연산자가 float이면 다른 하나도 float으로 변환

    - 위 경우들이 모두 아닐 때, char와 short는 int로 변환

    - 그리고 만일 한 연산자가 long이면 다른 하나도 long으로 변환

