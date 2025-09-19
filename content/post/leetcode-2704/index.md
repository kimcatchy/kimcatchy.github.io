---
IDX: "34"
slug: "leetcode-2704"
tags:
  - CodingTest
  - Javascript
description: "LeetCode 2704"
categories:
  - Code
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 18:38:00+0900"
상태: "Ready"
title: "To Be Or Not To Be"
---
## 문제

Write a function **expect** that helps developers test their code. It should take in any value **val** and return an object with the following two functions.

- **toBe(val)** accepts another value and returns **true** if the two values **\===** each other. If they are not equal, it should throw an error **"Not Equal"**.

- **notToBe(val)** accepts another value and returns **true** if the two values **!==** each other. If they are equal, it should throw an error **"Equal"**.

### 출력 예시

#### Example 1:

[object Promise]    **Output**: {"value": true}

    **Explanation**: 5 === 5 so this expression returns true.

#### Example 2:

[object Promise]    **Output**: {"error": "Not Equal"}

    **Explanation**: 5 !== null so this expression throw the error "Not Equal".

#### Example 3:

[object Promise]    **Output**: {"value": true}

    **Explanation**: 5 !== null so this expression returns true.

## 필요 사전 지식

사실 object를 직접 생성해서 써본 적은 없었는데.. [누가 Object 만들어서 쓰는 방법을 Discussion에 올려줬다](https://leetcode.com/problems/to-be-or-not-to-be/description/comments/2200906).

### object 생성

```javascript
// 방법 1
let object = {
    method1: function(arg1) {
        // some code
    },
    method2: function(arg2) {
        // some code
    }
};
return object
```

```javascript
// 방법 2
let object = new Object();
object.method1 = function(arg) {
      // some code
}
object.method2 = function(arg) {
      // some code
}
return object
```

### 함수 생성

```javascript
// 방법 1
functionNameOne: function(arg) => {
    // do something.. return something..
}
```

```javascript
// 방법 2
functionNameOne(arg) {
    // do something.. return something..
}
```

```javascript
// 방법 3
functionNameOne: (arg) => returnValue
```

### error 출력

```javascript
throw new Error("message");
```

## 풀이

```javascript
/**
 * @param {string} val
 * @return {Object}
 */

var expect = function(val) {
    let object = {
        toBe: function(arg1) {
            if (arg1 === val) {
                return true
            } else {
                throw new Error("Not Equal");
            }
        },
        notToBe: function(arg2) {
            if (arg2 !== val) {
                return true
            } else {
                throw new Error("Equal");
            }
        }
    };
return object
};
```

![](image1.png)
