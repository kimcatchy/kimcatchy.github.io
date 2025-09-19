---
IDX: "13"
slug: "ubuntu-cheat-sheet"
tags:
  - Ubuntu
description: "자주 쓰는 우분투 명령어"
categories:
  - CheatSheet
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 05:51:00+0900"
상태: "Ready"
title: "Ubuntu Cheat Sheet"
---
## 기본 명령어

```bash
sudo 슈퍼유저 권한
sudo passwd 루트 계정 암호 설정
su 루트 계정으로 전환
adduser (이름) 사용자 추가
userdel (이름) 사용자 제거
su (이름) 사용자 전환
history 내가 입력했던 명령어 출력
clear 화면 비우기

chmod 권한 설정
chown (사용자:그룹) (파일) 소유자 설정

pwd 현재 위치의 전체 경로 표시
cd (경로) 해당 경로로 이동

ls 현재 디렉토리의 내용 표시
ls -R 하위 디렉토리의 파일까지 전부 표시
ls -a 숨김 파일 표시
ls -al 파일 세부 정보 표시

cat (파일명) 파일 생성
cp (파일) (경로) 파일 복사
mv (파일) (경로) 파일 이동
mkdir (경로) 디렉토리 생성
rmdir (경로) 디렉토리 제거
touch (파일) 빈 파일 생성
echo (내용) >> (파일) 파일에 내용 추가

locate (파일) 파일 검색
locate -i (A) (B) 내용에 A와 B가 포함된 파일 검색
find (A) A가 포함된 파일과 디렉토리 검색
grep (A) (파일) 파일 내에 A라는 내용이 있는지 검색

head -n (숫자) (파일) 파일 내용의 첫 n줄 출력
tail -n (숫자) (파일) 파일 내용의 끝 n줄 출력
diff (파일) (파일) 두 파일의 내용 비교
tar 압축

df 시스템 디스크 사용량 출력(KB)
df -m 시스템 디스크 사용량 출력(MB)
du -h 디스크 사용량

ping (주소) 서버 연결 상태 확인
wget (주소) 파일 다운로드
```

## APT 관련 명령어

```bash
// 도움말 출력
apt --help

// 패키지 목록 갱신
apt update

// 패키지 최신 버전으로 업그레이드
apt upgrade

// 패키지 목록 출력
apt list

// 설치된 패키지 목록 출력
apt list --installed
dpkg -l

// 업그레이드 가능한 패키지 목록 출력
apt list --upgradable

// 패키지 설치 (요구하는 패키지 함께 설치)
apt install @@@

// 패키지 삭제, 설정 파일은 삭제 X
apt remove @@@

// 필요 없는 패키지 삭제
apt autoremove

// 설정 파일 포함 패키지 삭제
apt purge @@@

// 패키지 정보 출력
apt show @@@

// @@@와 관련된 패키지 검색
apt search @@@
```

## 우분투 초기화

```bash
// 루트 사용자로 접속
exec sudo -i

// 설정되지 않은 패키지 설정(?)
dpkg --configure -a

// 패키지 업데이트
apt-get update

// 패키지 매니저 깨졌을 경우 복구
apt-get -f install

// 시스템 업데이트
apt-get dist-upgrade

// 우분투 재설치
apt-get install --reinstall ubuntu-desktop

// 불필요한 패키지 제거
apt-get autoremove

// 설치된 패키지 제거
apt-get clean

// 재부팅
reboot
```

## 로그 파일 정리

```bash
// 현재 + 하위 폴더 .gz 확장자 파일 검색
sudo find . -type f -name "*.gz"

// 현재 + 하위 폴더 .gz 확장자 파일 삭제
sudo find . -type f -name "*.gz" -exec rm {} \;

// 현재 + 하위 폴더 60일 이상 된 .gz 확장자 파일 삭제
sudo find . -ctime +30 -type f -name "*.gz" -exec rm {} \;

// 현재 폴더 .gz 확장자 파일 삭제
sudo find . -maxdepth 1 -type f -name "*.gz" -exec rm {} \;
```

## 메일 관련 명령어

```bash
// 메일 확인
$ mail

// 메일 읽기
> t메일번호

// 메일 삭제
> d메일번호
1번부터 8번을 삭제할 경우 d1-8

// 상태를 저장하고 종료
> q
```

