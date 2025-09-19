---
IDX: "23"
slug: "py-types-and-function"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 12:44:00+0900"
상태: "Ready"
title: "Python 자료형 & 함수"
---
## 자료형

### 문자열

- single quote, double quote 둘 다 사용 가능

- 배열처럼 msg라는 문자열에 msg\[n\]을 하면 앞에서 n+1번째 글자, msg\[-n\]이면 뒤에서 n번째 글자

- C에서 %d로 변수의 값을 쓰는 것처럼 문자열에 다른 변수의 값을 적용할 수 있음

```python
hobby = "테니스"
age = 21
score = 4.5
msg = "취미=%s, 나이=%d, 학점=%f" %(hobby, age, score)
```

### 리스트

- 크기가 자유롭고 다양한 타입의 데이터를 추가할 수 있는 배열

- **메소드**

    - `s.append(item)`: 항목 item을 리스트 s의 맨 뒤에 추가

    - `s.extend(lst)`: 리스트 lst를 s에 추가

    - `s.count(item)`: 리스트에서 항목 item의 개수를 세고 그 개수를 반환

    - `s.index(item,\[시작\],\[종료\])`: 리스트에서 항목 item을 찾아 가장 작은 인덱스를 반환, 탐색의 시작 위치와 종료 위치 지정 가능

    - `s.insert(pos,item)`: pos 위치에 항목 item을 삽입

    - `s.pop(pos)`: pos 위치의 항목을 s에서 꺼내고 반환

    - `s.remove(item)`: 항목 item을 s에서 제거

    - `s.reverse()`: 리스트 항목의 순서를 뒤집음

    - `s.sort(\[key\],\[reverse\])`: 항목 정렬

### 튜플

- 리스트와 동일하지만 크기나 값을 변경할 수 없음

### 딕셔너리

- key와 관련된 value로 이루어진 항목들의 집합

```python
map = {'사과':'apple', '바나나':'banana'}
search = input("과일의 한글 이름을 입력해주세요: ")
print("%s는 영어로 %s 입니다." %(search, map[search]))
```

### 집합

- **set**과 **frozenset**(내용을 변경할 수 없는 set)이 있음

- `s1.union(s2)`: s1과 s2의 합집합

- `s1.intersection(s2)`: s1과 s2의 교집합

- `s3 = s1 - s2`: 차집합

## 함수

- 파이썬 내장 함수(type, len, ord 등)

- 사용자 정의 함수

```python
def find_max(A):			# 함수 헤더
    maximum = A[0]		# 함수 몸체 ↓
    for i in range(1, len(A)):
        if maximum < A[i]:
            maximum = A[i]
    return maximum

data = [5, 3, 8, 4, 9, 1, 6, 2, 7]
print("max number =", find_max(data))
```

- 함수의 결과값을 반환할 때 여러 개의 값을 반환할 수 있음

```python
def find_min_max(A):		# 함수 헤더
    maximum = A[0]			# 함수 몸체 ↓
    minimum = A[0]
    for i in range(1, len(A)):
        if maximum < A[i]: maximum = A[i]
        if minimum > A[i]: minimum = A[i]
    return maximum, minimum

data = [5, 3, 8, 4, 9, 1, 6, 2, 7]
x, y = find_min_max(data)
print("(max, min) =", (x, y))	# 튜플로 만들어 출력
```

### 디폴트 인수

```python
def sum_range(begin, end, step=1):
    summ = 0
    for n in range(begin, end, step):
        summ += n
    return summ

print("sum =", sum_range(1, 10))
print("sum =", sum_range(1, 10, 2))
```

- step의 디폴트 값을 1로 지정

- step의 값을 지정하지 않고 range를 1~10으로 할 경우 1~10의 합인 45 출력

- step을 2로 지정할 경우 1, 3, 5, 7, 9의 합인 25 출력

### 키워드 인수

```python
print("sum =", sum_range(step=3, begin=1, end=10))
print("game ", end="")
```

- 순서에 상관 없이 인수의 값을 따로 입력할 수도 있음

- end="" → 라인피드가 발생하지 않음

## 변수의 범위

- **내장 범위(built-in scope)**

    - 언어의 일부로 정의된 변수와 리터럴들

    - 프로그램의 어디에서나 사용할 수 있음

- **전역 범위(global scope)**

    - 소스 파일의 맨 꼭대기 레벨(함수나 클래스 밖)에서 생성

    - 프로그램의 어디에서나 사용할 수 있음

- **지역 범위(local scope)**

    - 함수나 클래스의 멤버함수(메소드) 안에서 생성

    - 그 안에서만 사용, 함수의 매개변수들도 지역범위

- **인스턴스 범위(instance scope)**

    - 클래스의 데이터 멤버로 생성된 변수

    - 클래스 내의 다른 함수들에서 사용할 수 있음

## 모듈 & namespace

```python
# 파일명: min_max.py
def find_min_max(A):
	...
    return min, max

# 파일명: summ.py
def sum_range(begin, end, step=1):
	...
    return summ

# 파일명: my_job.py
import min_max.py
from summ import *	# 두 방식 모두 사용 가능

data = [5,3,8,4,9,1,6,2,7]
print("(min,max) =", min_max.find_min_max(data))
print("sum =", summ.sum_range(1,10))
```

## OOP 기본 개념

- 객체 지향 프로그래밍을 통해 코드를 더 모듈화하고, 재사용성을 높이며, 복잡한 시스템을 더 쉽게 모델링할 수 있음

- **객체(Object)**

    - 데이터(속성)와 이를 조작하는 메서드(함수)를 포함하는 독립적인 단위

    - 실제 세계의 엔티티를 모델링하는 데 사용

- **클래스(Class)**

    - 객체를 생성하기 위한 템플릿 또는 청사진

    - 객체의 구조와 행동을 정의

- **인스턴스(Instance)**

    - 클래스를 바탕으로 생성된 구체적인 객체

    - 각 인스턴스는 고유한 속성 값을 가질 수 있음

### Python에서의 클래스 구현

```python
class Student:
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade

    def introduce(self):
        return f"안녕하세요, 저는 {self.name}이고 {self.age}살입니다."

    def study(self, subject):
        return f"{self.name}이(가) {subject}을(를) 공부하고 있습니다."

    def get_grade(self):
        return f"{self.name}의 학년은 {self.grade}학년입니다."
```

- **생성자(init)**:

    - 객체가 생성될 때 자동으로 호출되는 특별한 메서드

    - 객체의 초기 상태를 설정

    - self는 객체 자신을 가리키는 참조

- **속성(Attributes)**:

    - [self.name](http://self.name/), self.age, self.grade는 객체의 속성

    - 각 객체의 상태를 나타냄

- **메서드(Methods)**:

    - introduce(), study(), get\_grade()는 클래스의 메서드

    - 객체의 행동을 정의

    - 첫 번째 매개변수로 항상 self를 받음

### 객체 생성 및 사용

```python
# 객체 생성
student1 = Student("김철수", 15, 1)
student2 = Student("이영희", 16, 2)

# 메서드 호출
print(student1.introduce())  # 출력: 안녕하세요, 저는 김철수이고 15살입니다.
print(student2.study("수학"))  # 출력: 이영희이(가) 수학을(를) 공부하고 있습니다.
print(student1.get_grade())  # 출력: 김철수의 학년은 1학년입니다.
```

- Student 클래스의 인스턴스 두 개 생성

- 각 인스턴스는 고유한 속성 값을 가짐

- 객체의 메서드를 호출하여 다양한 작업을 수행할 수 있음

## 연산자 중복

- **Operator Overloading**

- 클래스에 대해 연산자의 동작을 재정의하는 것

- 이를 통해 사용자 정의 객체에 대해 기본 연산자(+, -, \*, / 등)를 사용할 수 있음

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # __add__ 메서드 호출
print(v3)  # 출력: Vector(4, 6)
```

## 상속

- **Inheritance**

- 기존 클래스의 속성과 메서드를 새로운 클래스가 물려받는 것

- 이를 통해 코드 재사용성을 높이고 계층 구조를 만들 수 있음

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name}이(가) 멍멍!"

class Cat(Animal):
    def speak(self):
        return f"{self.name}이(가) 야옹!"

dog = Dog("바둑이")
cat = Cat("나비")

print(dog.speak())  # 출력: 바둑이이(가) 멍멍!
print(cat.speak())  # 출력: 나비이(가) 야옹!
```

## 재정의

- **Method Overriding**

- 부모 클래스의 메서드를 자식 클래스에서 새롭게 정의하는 것

- 이를 통해 같은 이름의 메서드가 다른 동작을 할 수 있음

```python
class Shape:
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

rect = Rectangle(5, 4)
circle = Circle(3)

print(rect.area())   # 출력: 20
print(circle.area()) # 출력: 28.26
```

