# CHEQUER FE 사전과제 양하윤

<img src="asset/mov.gif" />

<br />

## 필수 요구 사항

개발 요구 사항 및 과제 요구 사항을 모두 준수했습니다.

- **HTML, CSS,** JavaScript(또는 **TypeScript**) 만 사용해 개발합니다
- 프레임워크, 라이브러리 사용을 제한합니다
- **webpack-dev-server** 등 파일서버를 사용할 수 있습니다.
- 모던 웹 브라우저(크롬, 사파리, 엣지 등) 중 두 개 이상의 브라우저에서 동작이
보장되어야 합니다.
    - **Chrome, Firefox**
- 공동으로 하나의 컨텐츠 생산이 가능한 텍스트 에디터를 구현합니다.
- 동일한 브라우저의 여러 창을 이용하여 기존 편집중인 에디터로 접근할 수 있어야
합니다.
- 데이터 통신(웹소켓 등)은 구현하지 않고 공통의 데이터를 브라우저에 저장하고
모든 사용자가 같이 사용합니다.
- 참여자가 추가될 때 메세지로 알려주고 참여자 목록을 업데이트 합니다.
- 편집내용은 브라우저에 저장되고 **리로드하면 동일한 상태**로 복구합니다. (선택사항)
- 편집기에서 상대방의 **커서 위치를 공유**합니다. (선택사항)
- 편집기에서 상대방의 **커서 위치에 닉네임**을 표시합니다. (선택사항)

<br />


## 추가 명세

요구 사항에 정의되어 있지 않은 부분은, 사용 조건을 가정하여 명세를 정의하고 개발했습니다.

### 공통 명세

- 방은 1개만 존재합니다.
- 방에는 같은 이름을 가진 유저가 존재할 수 없습니다.

### 홈 MainPage


- 방만들기를 클릭하면, `/enter-room` 화면으로 이동합니다.
- 이미 개설된 방이 있다면 추가로 방을 개설할 수 없으므로, `방이 이미 존재합니다. 닉네임 설정 페이지로 이동합니다.` 메세지창이 나타나고, `/enter-room` 화면으로 이동합니다.

### 입장하기 EnterRoomPage


- 이름 입력 후, 입장하기 버튼을 클릭하면 `/room` 화면으로 이동합니다.
- 이미 개설된 방이 있다면, 먼저 방에 입장한 유저와 동일한 이름으로는 입장할 수 없습니다. 만약 같은 이름을 입력하고 입장하기 버튼을 클릭 시, `이미 존재하는 이름입니다. 다시 생각해 주세요` 메세지창이 나타납니다.

### 방 RoomPage


`에디터`

- 어떤 유저가 에디터에 컨텐츠를 입력할 때, 모든 유저가 업데이트된 컨텐츠를 볼 수 있어야 합니다.
- 다른 유저가 숫자나 영어를 입력할 때, 화면에 상대 유저의 커서 위치와 유저의 이름이 보여집니다. 
(한글에는 대응이 안되어 있습니다.)
- 복수의 유저가 입력하더라도, 화면에 입력중인 모든 유저의 커서의 위치와 유저의 이름을 확인할 수 있습니다.

`유저목록`

- 유저목록에서 유저 본인의 이름은 바로 알 수 있도록, 이름이 볼드처리되어 보여집니다.
- 입장
    - 모든 유저의 화면의 유저목록 하단에 `000님이 입장했습니다` 메세지가 나타납니다.
    - 한 번 퇴장했다면, 방에 다시 입장할 때 이름을 다시 입력해야 합니다.
    - `/room` URL로 방에 직접 진입하려고 하는 경우, `/enter-room` 화면으로 이동됩니다. 
    이름을 설정해야만 방에 입장할 수 있습니다.
- 퇴장
    - 나가기 버튼을 클릭하면 방에서 퇴장하고, `/enter-room` 화면으로 이동합니다.
    - 방을 퇴장하더라도, 퇴장한 유저가 입력했던 컨텐츠는 에디터에 남아 있어야 합니다.
    - 유저목록이 업데이트됩니다. 업데이트된 목록엔 퇴장 유저의 이름이 없어야 합니다.
    - 다른 유저의 화면의 유저목록 하단에 `000님이 퇴장했습니다` 메세지가 나타납니다.
    - 마지막 남은 유저가 방을 퇴장하게 되면, 방은 사라집니다.

<br />


## Features

`입장`
<div><img src="asset/in.png" width="90%" /></div>

`커서 위치`
<div><img src="asset/edit.png" width="90%" /></div>


`퇴장`
<div><img src="asset/out.png" width="90%" /></div>


<br />


## Stack

- TypeScript
- Webpack-dev-server
- Prettier

<br />


## Installation


**실행환경**

- Node v16.13.1
- 최신 버전의 Chrome 과 Firefox 에서의 사용을 권장합니다.

**실행 방법**

- 프로젝트 내부에서 패키지를 설치합니다.
    
    ```
    $ yarn
    ```
    
- 로컬 환경에서 개발 서버를 실행합니다.
    
    🔗 URL : [http://localhost:3000](http://localhost:3000/)
    
    ```
    $ yarn dev
    ```
    
<br />


## About Development


### **Work Flow**


- 방의 contents 와 users 정보 및 cursor 정보는 LocalStroage에, user의 정보는 SessionStroage 에 저장했습니다.
- 에디터를 편집할 때마다 유저목록  컴포넌트가 리렌더링되지 않도록, UserList 컴포넌트를 메모아이징하고 props 를 비교하여 불필요한 리렌더링을 방지했습니다.
- 위계에 맞게 컴포넌트 및 파일 분리했습니다.
    <details>
    <summary>디렉토리 구조</summary>

    ```jsx
        src
         ┣ **api**
         ┃ ┣ handlers
         ┃ ┃ ┣ editor.ts
         ┃ ┃ ┣ room.ts
         ┃ ┃ ┗ user.ts
         ┃ ┗ storages
         ┃ ┃ ┣ client.ts
         ┃ ┃ ┣ server.ts
         ┃ ┃ ┗ stroageKey.ts
         ┃ **components**
         ┃ ┗ Room
         ┃ ┃ ┣ Editor.ts
         ┃ ┃ ┗ UserList.ts
         ┣ **pages**
         ┃ ┣ EnterRoom.ts
         ┃ ┣ Main.ts
         ┃ ┣ NotFound.ts
         ┃ ┗ Room.ts
         ┣ **types**
         ┃ ┗ index.ts
         ┣ **utils**
         ┃ ┣ createElement.ts
         ┃ ┣ createRoot.ts
         ┃ ┣ isPropsEqual.ts
         ┃ ┣ navigate.ts
         ┃ ┗ parse.ts
         ┣ **app.ts**
         ┣ **index.ts**
         ┗ **style.css**
        ```
    </details>
        
        
<br />

### **Single Page Application**


페이지별로 HTML 을 보여주는 방식이 아닌 TypeScript 를 사용하여 SPA로 만들었습니다. 그리고 React의 아키텍처와 유사하게 라우트와 컴포넌트를 분리하여 구조화했습니다. 그리고 React가 선언적으로 UI 를 구축하는 것처럼 뷰를 그리기 위해, 태그에 해당하는 속성·자식 요소를 전달하여 HTML 요소를 생성하는 createElement 함수를 만들었습니다. 요소를 만드는 함수를 추상화함으로써 요소를 선언적으로 만들 뿐만 아니라 가독성과 재사용성을 높일 수 있었습니다. 또한 불필요한 리렌더링을 최소화하기 위해, 동일한 props를 하위 컴포넌트에 전달할 때 같은 레퍼런스를 전달하고, 하위 컴포넌트에 메모이제이션을 적용했습니다.

<br />

### **Data Strategy**


브라우저의 웹스토리지 LocalStorage 와 SessionStroage 를 이용해서 데이터를 핸들링했습니다. 
에디터와 유저목록 정보는 새로고침할 때마다 유지가 되어야 하며, 다른 유저가 들어왔을 때에도 기존 데이터를 가져와야 하기 때문에, 서버의 DB 로 간주하고 LocalStorage 를 사용했습니다. 그래서 서버에 보내는 요청과 CRUD 기반의 핸들러들을 분리하여, 추후 실제 API 를 요청하는 로직으로 대체할 수 있게 확장성을 고려해서 작업했습니다. 그리고 유저의 정보는 탭에서만 유지할 수 있도록 클라이언트단의 세션으로 간주하고 SessionStroage 를 사용하여 관리했습니다. 

<br />
<br />

## Contact


**🖥 github : [https://github.com/mycolki](https://github.com/mycolki)**

**📩 email : [mycolki@gmail.com](mailto:mycolki@gmail.com)**

**📱 phone : 010-9922-0213**
