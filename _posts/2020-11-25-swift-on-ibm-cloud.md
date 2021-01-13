---
title: "IBM Cloud에서 Swift 사용하기"
comments: true
author-profile: true
categories: [CLOUDERs]
---

서비스디자인공학과에 입학한 이후, 모바일 애플리케이션 개발을 필수로 익혀야 미래산업을 주도할 수 있으리라는 생각이 계속해서 떠올랐다. 스마트폰 시장은 이미 레드오션이지만, '모바일(mobile)'이라는 단어에서 오는 '어딜 가나 누리는 서비스, 기능'은 죽지 않을 것이므로. 더군다나 전 세계를 휩쓴 중국 우한 출신 괴-바이러스 때문에 언택트(Untact) 개념이 빠르게 자리잡으며 제일 쉬운 창업 아이템이 모바일 앱으로 손꼽혔기 때문이다. 안드로이드 운영체제든 iOS든 가리지 않고 사용자 본인이 쓰는 기기를 활용할 수 있도록 프로그램 하나쯤은 만들 수 있어야 미래형 인간이라고 생각한다. 그렇지 않으면 기기의 편의성에 잠식당한 나머지, 현대인은 영화 '매트릭스' 속 아무 생각 없이 살아가는 인류 프로그램의 모습과 다르지 않을 것이다.<BR/><BR/>

[중소 개발사를 위해 앱스토어 수수료 15%로 인하-출처]("https://www.cnbc.com/2020/11/18/apple-will-cut-app-store-fees-by-half-to-15percent-for-small-developers.html#:~:text=Apple%20said%20Wednesday%20it%20will,purchases%20from%20the%20App%20Store.") <BR/>

최근 애플은 에픽게임즈와의 전면승부에서 유리한 패를 꺼내들었다. 중소 개발사(개발자)를 대상으로 앱스토어 수수료를 15%로 인하한다고 밝혔다. 이는 이전 수수료(30%)의 절반 수치라 트위터의 앱 개발자들은 다들 환영하는 분위기다. 나 또한 마찬가지였는데, 2021년도에는 지금까지 생각해 놓은 창업 아이템을 본격적으로 앱으로 옮길 계획이었기 때문이다. Apple Developer 금액(10만원)만 생각해도 부담스러운데 수수료를 낮춰 수익성을 높여 주다니. 이제 앱 뿐만 아니라 게임까지 수수료 30% 정책을 확대하겠다고 밝힌 구글 플레이 스토어가 어떻게 나올지 궁금하다.<BR/><BR/>
(+추가로 덧붙이는 내용: 구글 플레이 스토어는 30% 수수료를 내년으로 연기하기로 했다.)

각설하고, 위와 같은 이유들 때문에 오늘은 IBM Cloud상에서 Swift를 활용하여 어떻게 앱을 개발하며, 다양한 모델과 템플릿을 탑재할 수 있는지 다룰 것이다. 과거에 IBM과 애플은 앙숙이었기에 이 기능이 있다는 것을 발견한 필자는 조금 놀랐다. 역시 강산의 변화는 IT 공룡들끼리 교류하게 만든다.<BR/><BR/>

## 1단계. IBM Cloud 계정에 로그인하기
IBM Cloud를 사용하려면 당연히 IBMid가 있어야 한다. 로그인을 한 후 대시보드가 짠 하고 나타나면, 좌측 상단의 햄버거 메뉴를 클릭하라.
![이미지](https://user-images.githubusercontent.com/50163676/99897890-b7a0d780-2ce0-11eb-9b88-01e2b6b8a013.png "개인 데시보드")

삐죽 튀어나오는 메뉴에서 Apple을 선택하라.
![이미지](https://user-images.githubusercontent.com/50163676/99897930-ffbffa00-2ce0-11eb-9f6b-f3107496e1e8.png "햄버거 메뉴")

그러면 외부 사이트로 연결되며 새 탭이 열릴 것이다.
![이미지](https://user-images.githubusercontent.com/50163676/99897952-19f9d800-2ce1-11eb-9128-8be27dc250d5.png "Apple 메뉴")

이는 IBM Developer Console for Apple 페이지다. 이 페이지에서 다양한 템플릿을 활용할 수 있으며 직접 자신만의 앱을 만들고 파일을 관리할 수 있다.<BR/><BR/>

## 2단계: 여기서 잠깐!
잘 나가다가 왜 갑자기 제동을 거냐고?<BR/>
IBM Cloud에서 Swift로 개발하려면 여러 조건이 필요하기 때문이다. 우선 Xcode 최신 버전이 설치되어 있는지 꼭 확인하자. 현재(2020/11/25) 기준, 최신 Mac OS의 이름은 Big Sur이자 버전은 11.0.1, 이에 맞는 Xcode 버전은 12.2다. Xcode는 하위 버전일 시, 요구되는 패키지를 깔지 않으면 실행조차 되지 않으므로 이는 모두가 만족하리라고 생각한다. <BR/><BR/>

+ Native SDK 설치하기 <BR/>
종속성 관리를 위해 CocoaPods나 Carthage를 설치한다. 
```bash
sudo gem install cocoapods --pre
```

Cathage는 이렇게 설치한다. Mac OS에서는 신이 내린 Homebrew가 있으니 꿈만 같다.
```bash
brew install carthage
```

마지막으로, 우리가 만든 앱을 공식적으로 App Store에 등록하려면 Apple Developer 계정과 함께 멤버십이 필요하다(1년에 10만원). 지금은 튜토리얼이므로 건너뛰기로 하자. <BR/><BR/>

## 3단계. 앱을 위해 세팅하기
아까의 그 화면에서 좌측의 '스타터 킷'을 선택하면 이와 같은 화면이 뜰 것이다.
![이미지](https://user-images.githubusercontent.com/50163676/100230222-c7325180-2f68-11eb-8276-9e388e6c23c6.png "List of starter kit")
바로 앞에 보이는 '앱 작성'을 클릭한다.
![image](https://user-images.githubusercontent.com/50163676/100230267-d6b19a80-2f68-11eb-9b6b-85cff08ba3ec.png "앱 작성 화면") <BR/><BR/>

IBM Cloud에서 모바일 애플리케이션을 만들 경우 얻는 장점은 다음과 같다.
- 원하는 언어, 프레임워크, 앱 종류(백엔드 혹은 사용자용 앱)로 클라우드 네이티브 애플리케이션을 만들 수 있다. IBM Cloud CLI 개발자용 툴을 활용해 로컬 환경에서 실행하는 것도 가능하며 디버깅도 할 수 있다. 
- 기존의 앱에 새 서비스를 추가하는 것이 쉬워진다.(클라우드 컴퓨팅의 힘이다)
- 이미 로컬 환경에서 짜 놓은 코드 또한 개발자용 툴 명령어를 사용해 IBM Cloud에 배포할 수 있다.<BR/>

이외에도 많은 장점이 있다. 이제 '시작하기' 버튼을 눌러 보자.<BR/><BR/>

![이미지](https://user-images.githubusercontent.com/50163676/100231075-e087cd80-2f69-11eb-8d99-5b3a212bc606.png "'시작하기'를 누른 후 나오는 화면")
위와 같은 화면이 뜬다. 앱 이름에는 원하는 이름을 넣는다. 태그는 업무 편리상 넣으면 나중에 유용할 것이다.<BR/><BR/>

'시작 위치'에서는 아예 처음부터 작성할 것인지, 로컬에서 작성했던 코드를 가져올 것인지 선택할 수 있다. 필자가 짜놓은 코드는 없으므로 '새 앱 작성'을 고를 것이다.<BR/>
하단으로 스크롤을 내리면 언어를 선택할 수 있다. Android용 앱이면 Java를, iOS용 앱이면 Swift를 선택하자. 필자의 선택은 Swift다.<BR/><BR/>

![이미지](https://user-images.githubusercontent.com/50163676/100231578-8f2c0e00-2f6a-11eb-84d6-b0c92ecb6ca9.png "필자의 설정 완료 화면")<BR/>

이제 '작성'을 클릭한다.<BR/><BR/>

## 4단계. 로컬에서 앱 개발 환경 마련하기
'작성'을 클릭하면 아래와 같은 화면이 뜬다. 소스 부분에 '코드 다운로드'가 눈에 띈다. 다운로드 버튼을 보면 일단 눌러 보자.<BR/>
![이미지](https://user-images.githubusercontent.com/50163676/100231727-c5698d80-2f6a-11eb-9ede-f1c93deb926c.png "초기 화면")

초기 코드를 담은 압축파일이 다운로드된다. 코드를 열어보기 전에 거쳐야 할 관문이 또 있다.
<BR/><BR/>
![이미지](https://user-images.githubusercontent.com/50163676/100233419-14182700-2f6d-11eb-9b29-dd47f6c84819.png "코코아팟 설치하기")
앞에서 터미널을 통해 Cocoapods를 설치하는 모습이다. <BR/>
이 코드를 입력해 초기화를 해 주자.
```bash
pod setup
```
![이미지](https://user-images.githubusercontent.com/50163676/100233439-1aa69e80-2f6d-11eb-8036-c72f03f35757.png "pod setup")

이 이후에 방금 다운로드한 앱의 디렉토리로 가서 'Pods'를 설치해야 앱 개발을 시작할 수 있다. 터미널 사용법을 통해 다운로드한 위치로 가자. 필자는 {필자의 이름}/Downloads/{앱 이름}으로 향했다.
![이미지](https://user-images.githubusercontent.com/50163676/100233454-1d08f880-2f6d-11eb-8759-968a8fa5c3e8.png "Downloads 디렉토리에 들어간 모습")
![이미지](https://user-images.githubusercontent.com/50163676/100233461-1ed2bc00-2f6d-11eb-951b-728ba30cfa67.png "도착")
이번 학기 동안 리눅스 스터디를 해두길 잘했다.<BR/><BR/>

iosapp 디렉토리가 잘 있는지 확인하자. 지금부터 할 작업은 이 디렉토리가 존재하는 디렉토리에서 진행해야 하므로. <BR/>
잘 있으므로 콘솔에 이 명령어를 입력한다.
```bash
pod install
```
![image](https://user-images.githubusercontent.com/50163676/100233468-21351600-2f6d-11eb-9075-d3e0bedd83a8.png "pod install")
여기까지 마치면 새로운 파일이 하나 생긴다.
![image](https://user-images.githubusercontent.com/50163676/100233474-22fed980-2f6d-11eb-9a44-d71a20673104.png ".xcworkspace 파일의 등장")<BR/><BR/>

성공이다.

## 5단계. 앱 개발 시작하기
앞에서 생성된 iosapp.xcworkspace 파일을 더블클릭하고 Xcode의 응답을 기다리자.<BR/>
![이미지](https://user-images.githubusercontent.com/50163676/100235749-2182e080-2f70-11eb-8c35-ab35c5a55188.png "아름다운 코드")
아름다운 코드들도 볼 수 있고,
![이미지](https://user-images.githubusercontent.com/50163676/100235841-3c555500-2f70-11eb-9897-f74d42066743.png "아름다운 화면")
아름다운 화면도 볼 수 있다!<BR/><BR/>

#### '와, 재밌겠다!' 라는 소리가 절로 나온다.
종강 이후부터 필자는 Swift를 독학하며 창업 준비를 시작하려 한다. 이 글은 앞으로 Swift를 공부하며 시리즈처럼 연재할 생각이다.<BR/><BR/>

애플 자체 교재를 정독한 후 유튜브를 참고하면 머지않아 훌륭한 앱 개발자가 될 수 있으리라 생각한다. 그날까지 건승하고, 우선 종강하기 전까지 힘내자!

*질문, 댓글, 그리고 출처를 밝힌 공유는 언제나 환영입니다.*
