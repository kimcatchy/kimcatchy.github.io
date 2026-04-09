---
id: 4
title: "Nginx 로그 특정 경로 제외"
description: "특정 확장자의 파일들을 로그에서 제외"
pubDate: 2026-04-05T00:14:00.000Z
updatedDate: 2026-04-09T09:36:00.000Z
category: "DevOps"
tags: ["Nginx"]
pinned: false
---


# 특정 경로(파일 유형) 제외

- jpg나 png 같은 정적 파일까지 모두 로그에 남기다 보니 로그를 파악하기가 어려움
- 조금 더 쉽게 로그를 확인하기 위해 특정 확장자의 파일들을 로그에서 제외

## 제외할 파일 유형 설정


```bash
# Log Exception - file
map $request_uri $except_file {
    ~*\.(ico|css|js|gif|jpg|jpeg|png|svg|woff|ttf|eot)$ 0;
    default 1;
}
```

- nginx 설정 파일(default 등)의 하단에 아래의 내용을 추가
- 로그에 기록할 확장자는 지우고 더 제외할 확장자가 있다면 추가로 입력

## 제외할 로그 설정


```bash
...

    set $logging 1;

    if ( $except_file = 0 ) {
    	set $logging 0;
    }

    access_log /var/log/nginx/도메인.access.log combined if=$logging;
    error_log /var/log/nginx/도메인.error.log;

...
```

- 기본으로 logging이라는 변수를 1로 설정해주고, except_file이 0일 경우에는 logging도 0으로 변경
- logging이 0일 경우에는 access.log에 로그를 기록하지 않음
- 파일 확장자로만 제외한다면 logging 부분을 없애고 if=$except_file;로 끝내도 되지만, 위와 같이 설정할 경우 다른 제외 조건들과 연계하기가 쉬움
