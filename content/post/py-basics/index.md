---
IDX: "22"
slug: "py-basics"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 12:35:00+0900"
상태: "Ready"
title: "Python 기초"
---
## 자료형과 리터럴

- **수치**

    - **정수(int)**: `4`, `-7`, `Oxfffe`, `073`, ...

    - **실수(float)**: `3.14`, `-5.242`, `123.123E-13`, ...

    - **복소수(complex)**: `complex(1,2)`, `1+2j`, ...

    - **부울(bool)**: `true`, `false`

- **시퀀스**

    - **문자열(str)**: `'aaa'`, `"BBB"`, ...

    - **리스트(list)**: `[]`, `[1, 'bbb', 3.14]`, ....

    - **튜플(tuple)**: `(1, 2, 3)`, `('aaa', 'bbb', 'bbb')`, ...

- **매핑**

    - **딕셔너리(dict)**: `{3.14: "pi", 4.5: "score"}`, ...

- **집합(set, frozenset)**: `{1, 2, 3}`, `{'aaa', 'bbb', 'bbb'}`, ...

## 변수

- 변수 선언 X

- 파이썬에서는 모든 자료가 클래스로부터 만들어진 객체임

- 변수는 다른 객체를 참조하는 참조자 또는 포인터의 역할을 함

## 연산

- 나눗셈 연산의 경우 `/`로 실수 연산, `//`로 정수 연산(몫만)

- **이항 연산자**: `**`

- **관계 연산자**: `>`, `<`, `>=`, `<=`, `==`, `!=`

- **불 연산자**: `||`, `&&`, `!` → or, and, not

- **in / not in 연산자**: `'a' in 'banana'` → True

## 함수

- 함수 호출: `Y = sum(a, b)` → 함수 sum 호출, 인수 2개

- 키보드 입력 함수: `input()`

- 화면 출력 함수: `print()`

    - `\\` Backlash

    - `\n` New line

    - `\"` Double quote

    - `\'` Single quote

    - `\t` Horizontal tab

## 제어구조와 반복

### 판단문

```python
if value % 2 == 0 :
	print("짝수")
else : print("홀수")

if score >= 90: grade = "A"
elif score >= 80: grade = "B"
elif score >= 70: grade = "C"
else: grade = "F"
```

- 판단문 (분기-branching): `if`, `else`, `elif`

- 블럭 지정은 들여쓰기로 함

### 반복문

```python
dan = int(input("구구단 단 입력:"))
for n in range (2, 10, 1) :
	print("%2d x %2d = %2d"% (dan, n, dan*n))
    
m = 2
while m < 10:
	print("%2d x %2d= "% (dan, m), dan*m)
    m += 1
```

```python
for n in range(5)						# n: 0, 1, 2, 3, 4
for n in range(2, 10)				# n: 2, 3, ... , 9
for n in range(10, 3, -2)		# n: 10, 8, 6, 4

for item in[12, 33, 52, 26, 99]		# 리스트의 모든 항목에 대해 반복
for c in "Game Over !"						# 문자열의 각 문자에 대해 반복(G ~ !)
```

