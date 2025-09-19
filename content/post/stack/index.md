---
IDX: "26"
slug: "stack"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 16:57:00+0900"
상태: "Ready"
title: "Stack"
---
## 스택

- **후입선출**(**LIFO**: Last-In First-Out), 가장 최근에 들어온 데이터가 가장 먼저 나감

- **저장되는 내용**: 숫자, 문자열, 클래스 객체, 리스트 등 모든 자료 가능

- 되돌리기, 함수 호출, 괄호 검사, 후위 표기식 계산, 중위 표기식의 후위 표기식 변환 등에 사용

| **기본 기능** |  | **추가 기능** |  |
| --- | --- | --- | --- |
| **isEmpty** | 스택이 비어있는지 확인 | **clear** | 스택 비움 |
| **puh** | 스택의 맨 마지막에 항목 추가 | **peek** | 스택의 맨 마지막 항목 반환 |
| **pop** | 스택의 맨 마지막 항목 삭제 | **size** | 스택 크기 확인 |

### Stack ADT

- 스택의 추상자료형

- 데이터: 후입선출의 접근 방법을 유지하는 항목들의 모음

| **연산** | **결과** |
| --- | --- |
| **Stack()** | 비어있는 새로운 스택 생성 |
| **isEmpty()** | 스택이 비어있으면 True, 아니면 False |
| **push(e)** | 항목 e를 스택의 맨 위에 추가 |
| **pop()** | 스택의 맨 위에 있는 항목을 꺼내 반환 |
| **peek()** | 스택의 맨 위에 있는 항목을 삭제하지 않고 반환 |
| **size()** | 스택 내의 모든 항목들의 개수 반환 |
| **clear()** | 스택을 공백 상태로 만듦 |

### 스택의 구현

- 데이터

    - top: 스택 항목을 저장하는 파이썬 리스트

    - 항목의 개수는 `len(top)`으로 구할 수 있음

- 연산: `isEmpty`, `push`, `pop`, `peek`, `display`

- 항목 삽입/삭제 위치: 리스트의 맨 뒤가 유리

#### 함수를 이용한 스택의 구현

```python
top = []
def isEmpty():
    return len(top) == 0
def push(item):
    top.append(item)
def pop():
    if not isEmpty():
        return top.pop(-1)
def peek():
    if not isEmpty():
        return top[-1]
def size(): return len(top)
def clear():
    global top	# top은 전역변수임을 지정
    top = []
```

#### 클래스를 이용한 스택의 구현

```python
class Stack:
    def __init__(self):
        self.top = []

    def isEmpty(self); return len(self.top) == 0
    def size(self); return len(self.top)
    def clear(self): self.top = []

    def push(self, item):
        self.top.append(item)

    def pop(self):
        if not self.isEmpty():
            return self.top.pop(-1)

    def peek(self):
        if not self.isEmpty():
            return self.top[-1]
```

## 괄호 검사

### 검사 조건

1. 왼쪽 괄호의 개수와 오른쪽 괄호의 개수는 같아야 함

1. 같은 타입의 괄호에서 왼쪽 괄호가 오른쪽 괄호보다 먼저 나와야 함

1. 서로 다른 타입의 괄호 쌍이 서로 교차하면 안됨

### 검사 방법

1. 문자를 저장하는 스택을 준비, 처음에는 공백 상태가 되어야 함

1. 입력 문자열의 문자를 하나씩 읽어 왼쪽 괄호를 만나면 스택에 삽입

1. 오른쪽 괄호를 만나면 `pop()` 연산으로 가장 최근에 삽입된 괄호를 꺼냄, 이때 스택이 비어있으면 조건 ②에 위배

1. 꺼낸 괄호가 오른쪽 괄호와 짝이 맞지 않으면 조건 ③에 위배

1. 끝까지 처리했는데 스택에 괄호가 남아 있으면 조건 ①에 위배

### 괄호 검사 알고리즘

```python
def checkBrackets(statement):
    stack = Stack()
    for ch in statement:
        if ch in ('{', '[', '('):
            stack.push(ch)
        elif ch in ('}', ']', ')'):
            if stack.isEmpty():
                return False	# 조건 2 위반
        else:
            left = stack.pop()
            if (ch=="}" and left!="{") or (ch=="]" and left!="[") or (ch==")" and left!="("):
                return False	# 조건 3 위반
        return stack.isEmpty()	# False면 조건 1 위반
```

## 수식의 계산

### 수식의 표기 방법

| **전위 (prefix)** | **중위 (infix)** | **후위 (postfix)** |
| --- | --- | --- |
| 연산자   피연산자1   피연산자2 | 피연산자1   연산자   피연산자2 | 피연산자1   피연산자2   연산자 |
| \+ 1 2 | 1 + 2 | 1 2 + |
| \+ 3 \* 1 2 | 3 + 1 \* 2 | 3 1 2 \* + |

- 사람들은 중위표기법에 익숙하지만 컴퓨터는 후위표기가 효율적

### 후위 표기 수식 계산 알고리즘

```python
def evalPostfix(expr):
    s = Stack()
    for token in expr:
        if token in "+-*/":
            val2 = s.pop()
            val1 = s.pop()
            if (token == '+'): s.push(val1 + val2)
            elif (token == '-'): s.push(val1 - val2)
            elif (token == '*'): s.push(val1 * val2)
            elif (token == '/'): s.push(val1 / val2)
        else:	# 항목이 피연산자이면 실수로 변경해서 스택에 저장
            s.push(float(token))

    return s.pop()
```

### 중위 표기 수식의 후위 표기 변환 알고리즘

- 피연산자를 만나면 그대로 출력

- 연산자를 만나면 현재 스택의 맨 위에 있는 연산자보다 높거나 같으면 맨 위 연산자가 나오고(계산한 후) 자신(낮은 연산자)을 push

- 왼쪽 괄호는 우선순위가 가장 낮은 연산자로 취급

- 오른족 괄호가 나오면 스택에서 왼쪽 괄호 위에 쌓여있는 모든 연산자를 출력

```python
def precedence(op):
    if op=='(' or op==')': return 0
    elif op=='+' or op=='-': return 1
    elif op=='*' or op=='/': return 2
    else: return -1

def Infix2Postfix(expr):
    s = Stack()
    output = []
    for term in expr:
        if term in '(':
            s.push(')')
        elif term in ')':
            while not s.isEmpty():
                op = s.pop()
                if op == '(': break;
                else:
                    output.append(op)
        elif term in "+-*/":
            while not s.isEmpty():
                op = s.peek()
                if(precedence(term) <= precedence(op)):
                    output.append(op)
                    s.pop()
                else: break
            s.push(term)
        else:
            output.append(term)

    while not s.isEmpty():
        output.append(s.pop())

    return output
```

## 수식 계산 스크립트

```python
class Stack:
    def __init__(self):
        self.top = []

    def isEmpty(self): return len(self.top) == 0
    def size(self): return len(self.top)
    def clear(self): self.top = []

    def push(self, item):
        self.top.append(item)

    def pop(self):
        if not self.isEmpty():
            return self.top.pop(-1)

    def peek(self):
        if not self.isEmpty():
            return self.top[-1]

def precedence(op):
    if op == '(' or op == ')': return 0
    elif op == '+' or op == '-': return 1
    elif op == '*' or op == '/': return 2
    else: return -1

def Infix2Postfix(expr):
    s = Stack()
    output = []
    for term in expr:
        if term == '(':
            s.push(term)
        elif term == ')':
            while not s.isEmpty() and s.peek() != '(':
                output.append(s.pop())
            if not s.isEmpty() and s.peek() == '(':
                s.pop()
        elif term in "+-*/":
            while not s.isEmpty() and precedence(term) <= precedence(s.peek()):
                output.append(s.pop())
            s.push(term)
        else:
            output.append(term)

    while not s.isEmpty():
        output.append(s.pop())

    return output

def evalPostfix(expr):
    s = Stack()
    for token in expr:
        if token in "+-*/":
            val2 = s.pop()
            val1 = s.pop()
            if token == '+': s.push(val1 + val2)
            elif token == '-': s.push(val1 - val2)
            elif token == '*': s.push(val1 * val2)
            elif token == '/': s.push(val1 / val2)
        else:
            s.push(float(token))

    return s.pop()

def calculate_expression(expr):
    # 공백 제거 및 토큰화
    tokens = [token.strip() for token in expr.replace('(', ' ( ').replace(')', ' ) ').split()]
    postfix = Infix2Postfix(tokens)
    result = evalPostfix(postfix)
    return result

# 메인 프로그램
if __name__ == "__main__":
    while True:
        expr = input("계산할 수식을 입력하세요 (종료하려면 'q' 입력): ")
        if expr.lower() == 'q':
            break
        try:
            result = calculate_expression(expr)
            print(f"결과: {result}")
        except Exception as e:
            print(f"오류 발생: {e}")
```

