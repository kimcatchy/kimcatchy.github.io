---
IDX: "6"
slug: "cron"
tags:
  - Ubuntu
description: "Cron 사용법"
categories:
  - linux
update: "2025-09-20 00:15:00+0900"
date: "2025-09-18 23:26:00+0900"
상태: "Ready"
title: "Cron"
---
## Cron이란?

- 반복 작업을 자동으로 실행해 주는 스케줄러

- e.g. 매일 새벽 백업, 10분마다 로그 정리, 서버 부팅 시 한 번 실행 등

## 사용법

```bash
#!/bin/bash
echo "작동 테스트: $(date)" >> /home/ubuntu/cron_test.log
```

- 간단한 셸 스크립트를 작성하고, 예를 들어 `/home/ubuntu/test.sh`라면 아래의 명령어로 실행 권한 부여

```bash
chmod +x /home/ubuntu/test.sh
```

- 실행 권한 부여 후에는 아래 명령어로 사용자 cron을 편집

```bash
crontab -e
```

## 표현식

- 간단 요약: `분 시 일 월 요일 명령`

    - e.g. `30 4 1 * * /home/ubuntu/test.sh`

- 요일의 경우 0(일) - 6(토)을 사용해도 되고, SUN - SAT도 가능

- 일(일자)과 요일을 동시에 제한하면 OR로 동작

### 특수 기호

- 별표(*) = 모든 값 매칭

- 쉼표(,) = 여러 값 지정

- 하이픈(-) = 범위

- 슬래시(/) = 간격(*/10 → 10분 간격)

### **특수 문자열**

- @reboot → 부팅(크론 데몬 시작) 시 1회 실행

- @hourly → 매시 정각(0분)

- @daily 또는 @midnight → 매일 00:00

- @weekly → 매주 일요일 00:00

- @monthly → 매월 1일 00:00

- @yearly 또는 @annually → 매년 1월 1일 00:00

## 사용 예시

```bash
# 매분 실행
* * * * * /home/ubuntu/test.sh

# 10분마다
*/10 * * * * /home/ubuntu/test.sh

# 매일 04:30
30 4 * * * /home/ubuntu/test.sh

# 부팅 시 실행
@reboot /home/ubuntu/test.sh

# 작업 별로 로그 남기기
*/10 * * * * /home/ubuntu/test.sh >> /home/ubuntu/test.log 2>&1
```

## 자주 겪는 문제 해결 방법

- 실행이 안 될 때

    - 스크립트 권한 확인

    - 절대 경로로 수정

    - PATH 지정

    - 명령 앞에 셸 지정 시도

- 터미널에선 되는데 크론에서만 실패

    - 환경 변수 차이가 원인인 경우가 많음

    - 스크립트 맨 위에 필요한 변수(PATH 등)를 선언하거나 명령을 절대 경로로 변경

- 메일 폭탄이 날아옴..

    - 최상단에 `MAILTO=""` 작성

