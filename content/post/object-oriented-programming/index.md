---
IDX: "29"
slug: "object-oriented-programming"
tags:
  - Python
description: "객체 지향 프로그래밍 기본 개념 정리"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 17:51:00+0900"
상태: "Ready"
title: "Object-Oriented Programming"
---
## 클래스와 객체

- **클래스**(Class): 객체를 만들기 위한 틀 또는 설계도

- **객체**(Object): 클래스의 인스턴스, 실제로 메모리에 할당된 실체

```python
class Car:
    def __init__(self, color, brand):
        self.color = color
        self.brand = brand

    def drive(self):
        print(f"{self.color} {self.brand} 차를 운전합니다.")

my_car = Car("빨간", "테슬라")
my_car.drive()  # 출력: 빨간 테슬라 차를 운전합니다.
```

## 속성과 메서드

- **속성**(Attribute): 객체의 특성을 나타내는 변수

- **메서드**(Method): 객체가 수행할 수 있는 동작을 정의하는 함수

```python
class Person:
    def __init__(self, name, age):
        self.name = name  # 속성
        self.age = age    # 속성

    def greet(self):  # 메서드
        print(f"안녕하세요, 저는 {self.name}입니다.")

person = Person("김철수", 30)
print(person.name)  # 출력: 김철수
person.greet()      # 출력: 안녕하세요, 저는 김철수입니다.
```

## 상속

- Inheritance

- 기존 클래스의 속성과 메서드를 새로운 클래스가 재사용할 수 있게 해줌

```python
class ElectricCar(Car):
    def __init__(self, color, brand, battery_capacity):
        super().__init__(color, brand)
        self.battery_capacity = battery_capacity

    def charge(self):
        print(f"{self.brand} 전기차를 충전합니다.")

electric_car = ElectricCar("파란", "현대", "100kWh")
electric_car.drive()  # Car 클래스의 메서드 사용
electric_car.charge() # ElectricCar 클래스의 메서드 사용
```

## 캡슐화

- Encapsulation

- 객체의 내부 데이터를 외부로부터 숨기고, 접근을 제어하는 메커니즘

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # 비공개 속성

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
print(account.get_balance())  # 출력: 1000
account.deposit(500)
print(account.get_balance())  # 출력: 1500
```

## 다형성

- Polymorphism

- 같은 이름의 메서드가 다른 클래스에서 다르게 동작할 수 있게 해줌

```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "멍멍!"

class Cat(Animal):
    def speak(self):
        return "야옹!"

def animal_sound(animal):
    print(animal.speak())

dog = Dog()
cat = Cat()

animal_sound(dog)  # 출력: 멍멍!
animal_sound(cat)  # 출력: 야옹!
```

