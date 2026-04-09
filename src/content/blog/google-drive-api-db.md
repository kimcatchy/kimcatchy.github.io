---
id: 58
title: "Google Drive API를 활용한 Serverless DB"
description: "구글 드라이브를 웹사이트의 데이터베이스로 활용하는 방법"
pubDate: 2026-04-05T00:14:00.000Z
updatedDate: 2026-04-09T09:40:00.000Z
category: "Web"
tags: ["Typescript", "Node.js", "React", "DataBase"]
pinned: false
---


별도의 데이터베이스(DB) 서버 없이 사용자의 Google 드라이브를 데이터 저장소로 활용할 수 있다. Google OAuth 2.0 로그인 연동 시 Drive API 권한(Scope)을 추가하여, 서버를 거치지 않고 프론트엔드에서 직접 데이터를 읽고 쓰는 Serverless 아키텍처다.


데이터 저장 방식과 장단점, 기본적인 구현 흐름은 다음과 같다.


---


# 구글 드라이브 데이터 저장 방식


저장 목적과 요구되는 Scope에 따라 두 가지 방식으로 나뉜다.


## Application Data Folder (`drive.appdata`)


웹사이트의 환경 설정, 브라우저 게임의 세이브 파일 등 사용자가 직접 접근하거나 수정할 필요가 없는 앱 전용 데이터 저장에 적합하다.

- 특징: 사용자 드라이브의 스토리지 용량은 차지하지만, 일반적인 구글 드라이브 UI 화면에서는 폴더나 파일이 노출되지 않는다.
- 권한 범위: 해당 권한을 요청하고 승인받은 웹 애플리케이션만 이 숨김 폴더에 접근하여 데이터를 읽고 쓸 수 있다.
- 요구 Scope: [`https://www.googleapis.com/auth/drive.appdata`](https://www.googleapis.com/auth/drive.appdata)

## 일반 파일 저장 (`drive.file`)


JSON 포맷의 백업 데이터, 작업 결과물 등 사용자가 직접 확인하고 소유권 및 관리(공유, 삭제)를 행사해야 하는 데이터 저장에 적합하다.

- 특징: 드라이브의 최상단 경로 또는 지정된 폴더에 일반 파일 형태로 명시적으로 저장된다. 사용자가 실수로 파일을 수정하거나 삭제할 위험이 존재한다.
- 권한 범위: 사용자의 전체 드라이브에 접근하는 것이 아니라, 해당 웹 애플리케이션이 '직접 생성한 파일'에 한해서만 접근 권한을 갖는다.
- 요구 Scope: [`https://www.googleapis.com/auth/drive.file`](https://www.googleapis.com/auth/drive.file)

---


# 아키텍처 장단점


도입 전 프로젝트의 데이터 I/O 특성을 고려해야 한다.


## 장점

- 서버 및 스토리지 비용 Zero: 백엔드 DB 서버를 구축하고 유지할 필요가 없다.
- 개인정보 보호 리스크 최소화: 서비스 제공자가 중앙 서버에 사용자 데이터를 수집하지 않는다. 데이터의 소유와 보관이 전적으로 사용자에게 위임되므로 GDPR 등 개인정보 보호 규정 준수에 매우 유리하다.
- 디바이스 동기화: 구글 계정을 기반으로 하므로, 기기나 브라우저가 변경되어도 동일한 데이터에 접근하고 동기화할 수 있다.

## 단점

- 속도 저하: HTTP API 호출을 통해 파일을 통째로 읽고 쓰는 방식이므로, 일반적인 RDBMS나 NoSQL에 비해 응답 속도가 느리다.
- 데이터베이스 쿼리 불가: `JOIN` 연산이나 특정 조건의 데이터만 추출하는 복잡한 쿼리가 불가능하다. 전체 데이터를 로드한 뒤 프론트엔드 메모리 상에서 직접 파싱 및 필터링을 수행해야 한다.
- API 호출 제한 (Quota): Google API 자체의 호출 횟수 제한이 존재한다. 짧은 시간에 다량의 데이터 쓰기가 발생하는 서비스에는 부적합하다.

---


# 구현 과정


프론트엔드(React, Next.js, Vanilla JS 등) 환경에서 단독으로 처리할 수 있다.

- Google Cloud Console 설정: 새 프로젝트를 생성하고 `Google Drive API`를 활성화한다. 클라이언트 ID를 발급받는다.
- OAuth 2.0 권한 요청: 구글 로그인 구현 시 데이터 성격에 맞춰 `drive.appdata` 또는 `drive.file` Scope를 포함하여 사용자에게 권한을 요청한다.
- Client-Side API 호출: 로그인 성공 후 발급받은 `Access Token`을 HTTP Authorization 헤더에 담아 Drive API 엔드포인트([`https://www.googleapis.com/drive/v3/files`](https://www.googleapis.com/drive/v3/files))로 요청을 보낸다. 이를 통해 파일 생성(POST), 수정(PATCH), 읽기(GET) 작업을 수행한다.

복잡한 관계형 데이터가 필요 없고, 사용자별 설정값이나 JSON 형태의 데이터를 유지해야 하는 정적 웹사이트 혹은 클라이언트 사이드 렌더링 위주의 웹 툴에 적합한 방식이다.


## Next.js (React) 적용 예시


`@react-oauth/google` 라이브러리와 내장 `fetch` API를 사용하여 클라이언트 사이드에서 모든 로직을 처리하는 방법이다.


### 패키지 설치 및 환경 설정


먼저 구글 로그인 라이브러리를 설치한다.


```bash
npm install @react-oauth/google
```


`.env` 파일에 Google Cloud Console에서 발급받은 클라이언트 ID를 저장한다.


```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID.apps.googleusercontent.com
```


### 최상위 Provider 설정 (`layout.tsx`)


앱 전체에서 구글 로그인 기능을 사용할 수 있도록 `layout.tsx` (또는 `_app.tsx`)를 `GoogleOAuthProvider`로 감싸준다.


```typescript
// app/layout.tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
```


### 로그인 및 데이터 저장 컴포넌트 (`page.tsx`)


사용자 버튼 클릭 시 구글 로그인을 팝업으로 띄우고, 권한(scope)을 동의받아 토큰을 획득한다. 획득한 토큰으로 구글 드라이브에 `data.json` 파일을 생성하고 데이터를 쓰는 전체 로직이다.


```typescript
// app/page.tsx
"use client";

import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export default function DriveStoragePage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  // 1. 구글 로그인 및 권한 요청
  const login = useGoogleLogin({
    // drive.file: 앱이 생성한 파일에만 접근 가능한 권한
    // 숨김 폴더에 저장하려면 'https://www.googleapis.com/auth/drive.appdata' 사용
    scope: 'https://www.googleapis.com/auth/drive.file',
    onSuccess: (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      setStatus('로그인 성공! 드라이브 접근 권한을 얻었습니다.');
    },
    onError: () => setStatus('로그인에 실패했습니다.'),
  });

  // 2. 구글 드라이브에 데이터 저장 (Multipart Upload)
  const saveToDrive = async () => {
    if (!accessToken) return alert('먼저 로그인을 해주세요.');

    setStatus('드라이브에 저장 중...');

    // 저장할 예시 데이터 (웹 툴의 설정값 등)
    const myData = {
      theme: 'dark',
      lastPlayed: new Date().toISOString(),
      score: 999
    };

    // 파일 메타데이터 설정
    const metadata = {
      name: 'my_app_data.json', // 드라이브에 저장될 파일명
      mimeType: 'application/json',
      // parents: ['appDataFolder'] // appdata scope 사용 시 주석 해제하여 숨김 폴더에 지정
    };

    // FormData를 이용해 메타데이터와 실제 파일(Blob)을 함께 전송
    const form = new FormData();
    form.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    form.append(
      'file',
      new Blob([JSON.stringify(myData)], { type: 'application/json' })
    );

    try {
      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setStatus(`저장 완료! 파일 ID: ${result.id}`);
      } else {
        throw new Error('API 호출 에러');
      }
    } catch (error) {
      console.error(error);
      setStatus('저장에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>서버리스 드라이브 DB 예제</h1>
      
      {!accessToken ? (
        <button onClick={() => login()} style={btnStyle}>
          Google 계정으로 로그인 (Drive 권한 요청)
        </button>
      ) : (
        <button onClick={saveToDrive} style={{...btnStyle, background: '#4CAF50'}}>
          내 드라이브에 JSON 데이터 저장하기
        </button>
      )}

      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>상태: {status}</p>
    </div>
  );
}

const btnStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  background: '#4285F4',
  color: 'white',
  border: 'none',
  borderRadius: '4px'
};
```

- `useGoogleLogin` 훅을 사용할 때 반드시 `scope` 파라미터에 Drive API 권한을 명시해야 한다.
- 데이터를 저장할 때는 단순한 POST 요청 대신 `uploadType=multipart`를 사용하여 파일의 메타데이터(파일명, 저장 경로)와 실제 데이터(Blob)를 분리해서 전송하는 것이 가장 깔끔하다.
- 이후 데이터를 불러올 때(Read)는 저장 완료 시 응답으로 받은 파일 ID([`result.id`](http://result.id/))를 사용하여 GET [`https://www.googleapis.com/drive/v3/files/{파일ID}?alt=media`](https://www.googleapis.com/drive/v3/files/%7B%ED%8C%8C%EC%9D%BCID%7D?alt=media) 엔드포인트를 호출하면 된다.
