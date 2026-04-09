---
id: 61
title: "test"
description: "test post"
pubDate: 2026-04-08T01:53:00.000Z
updatedDate: 2026-04-09T09:09:00.000Z
category: "Web"
tags: ["Notion"]
pinned: true
---


# h1 test


test test


## h2 test


test test

<details>
<summary>toggle test</summary>

test test


</details>


[https://github.com/](https://github.com/)


[https://github.com/](https://github.com/)


![](../../assets/notion/blog-61/33c5927d-b75a-8084-92be-c5328e08a5f7.jpg)


| Italics   | Bold     | Code                          | 111                                                                    | 222 | 333                                                                    | 444                    | 1                                                                      |   | 3                       |
| --------- | -------- | ----------------------------- | ---------------------------------------------------------------------- | --- | ---------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------- | - | ----------------------- |
| _italics_ | **bold** | `code`                        | 111                                                                    | 222 | 333                                                                    | 444                    |                                                                        | 2 | 44444444444444444444444 |
|           |          | 한글 문장을 입력했을 때는 줄바꿈이 어디서 적용될까? | test test test test test test test test test test test test test test  |     | test test test test test test test test test test test test test test  | 3333333333333333333333 | test test test test test test test test test test test test test test  |   |                         |


# Blockquotes


The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.


## Blockquote without attribution


### Syntax


```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use _Markdown syntax_ within a blockquote.
```


### Output

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
>
> **Note** that you can use _Markdown syntax_ within a blockquote.
>
>

## Blockquote with attribution


### Syntax


```markdown
> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>
```


### Output

> Don't communicate by sharing memory, share memory by communicating.<br>  
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.


# Tables


## Syntax


```markdown
| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
```


## Output


| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |


# Code Blocks


## Syntax


we can use 3 backticks ``` in new line and write snippet and close with 3 backticks on new line and to highlight language specific syntax, write one word of language name after first 3 backticks, for eg. html, javascript, css, markdown, typescript, txt, bash


```markdown
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```
```


## Output


```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```


# List Types


## Ordered List


### Syntax


```markdown
1. First item
2. Second item
3. Third item
```


### Output

1. First item
2. Second item
3. Third item

## Unordered List


### Syntax


```markdown
- List item
- Another item
- And another item
```


### Output

- List item
- Another item
- And another item

## Nested list


### Syntax


```markdown
- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese
```


### Output

- Fruit
    - Apple
    - Orange
    - Banana
- Dairy
    - Milk
    - Cheese

# Other Elements — abbr, sub, sup, kbd, mark


## Syntax


```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
```


## Output


<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.


H<sub>2</sub>O


X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>


Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.


Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.

