---
IDX: "7"
slug: "pm2"
tags:
  - Node.js
description: "PM2 사용법"
categories:
  - linux
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 02:29:00+0900"
상태: "Ready"
title: "PM2"
---
## PM2란?

- Node.js 애플리케이션을 백그라운드에서 안정적으로 실행하는 프로세스 관리자

- 재시작, 로그 관리, 무중단 재시작까지 지원

- 전역 설치: `npm install pm2@latest -g`로 설치, 설치 후 `pm2 -v`로 버전 확인

## 프로세스 관리

- 기본 실행: `pm2 start app.js`

### 관리 명령어

- 프로세스 목록: `pm2 list`

- 프로세스 상태: `pm2 status`

- 정지/재시작/삭제: `pm2 stop <이름|id>` / `pm2 restart <이름|id>` / `pm2 delete <이름|id>`

### 자주 쓰는 옵션

- 프로세스 이름 지정: --name <이름>

- 파일 변경 시 자동 재시작: --watch

- 메모리 제한 초과 시 재시작: --max-memory-restart <용량>

## 로그

- 실시간 확인: `pm2 logs`, 출력 로그와 에러 로그 동시에 출력

    - `pm2 log <이름|id>`로 특정 프로세스 지정

- 로그 저장 위치: 기본 로그 파일은 `$HOME/.pm2/logs`에 저장, 각 앱별 out/err 로그 파일로 분리

## 부팅 시 자동 시작

- 프로세스 목록 저장: `pm2 save`

- 부팅 시 자동 복원 활성화: `pm2 startup`

    - 활성화 전 목록 저장 필수

- 수동 복원: `pm2 resurrect`

    - 재부팅 후 자동 복원이 안 될 경우 수동으로 복원

## 예시

- `pm2 start app.js --name myApp --watch`

- `pm2 start "npm run dev" --name myApp`

- `pm2 start npm --name "myApp" -- run dev`

