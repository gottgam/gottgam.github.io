---
title: "[IBM Cloud] 쿠버네티스에 컨테이너 이미지를 deploy하기"
categories: [CLOUDERs]
---

IBM 클라우더스(C:LOUDERs)로 활동하면서 새롭게 내 흥미를 불러일으킨 것은 __쿠버네티스(Kubernetes, 줄여서 K8s)__ 였다. Developer Advocate께서 선물해 주신 쿠버네티스 랩탑 스티커 때문만이 아니라 18세기 범선의 키 같은 파란색 아이콘이 눈에 띄었기 때문이다. Google Cloud를 통해 쿠버네티스를 어떻게 다루는지 공부하고 있었으나, 자랑스러운 IBM Cloud로도 쿠버네티스를 다루는 방법을 안내해야겠다는 사명을 띠고 이 글을 작성한다.    

## 쿠버네티스는 무엇인가?  
*쿠버네티스는 여러 기종 간 이동이 가능하며 시스템 확장 가능한 오픈소스 프로그램이며, 선언적 구성과 자동화 모두를 돕고 컨테이너화한 워크로드와 서비를 관리할 수 있도록 한다.* (공식 홈페이지에 올라온 대표 문구를 그대로 번역했다.)  
놀랍게도 쿠버네티스는 15년 동안 구글이 연구하던 프로젝트였다. 소프트웨어를 효과적으로 관리, 배포하며 유지, 보수 또한 용이하게 하려는 의도가 잘 통한 것 같다. 지금은 응용프로그래머의 채용 조건에서 쿠버네티스를 다룰 줄 아는 능력을 거의 필수적으로 요하고 있으니 말이다. 영화 속에 등장하는 컴퓨터광처럼 터미널을 열고 키보드를 쉴 새 없이 누르는 멋드러진 모습을 보여주면 인상에 남을 것이다.  
그 전에 기초부터 터득하기로 한다. 이번 글에서는 제일 기본적으로 __컨테이너 이미지를 쿠버네티스에 deploy하는 방법을 연습해 보자.__    

<https://developer.ibm.com/openlabs/cloudlabs/containers-and-kubernetes-essentials>  
필자는 이 링크를 참조했다. IBM Cloud에서 자체적으로 제공하는, 상호작용하며 연습할 수 있도록 하는 랩의 입구다. 연습 시간은 기본 4시간으로 넉넉하게 주어진다. 덕분에 마음의 여유를 갖고 유튜브 영상도 참고하며 직접 코드를 입력해 볼 수 있었다.  
![image](https://user-images.githubusercontent.com/50163676/91160115-fafca180-e703-11ea-8c29-906b8aa4d786.png "인터랙티브 랩 입구") 
![이미지](https://user-images.githubusercontent.com/50163676/91160174-09e35400-e704-11ea-9e84-eae9ec849fcd.png "랩 시작 환경") 
링크를 타고 이 홈페이지에 도달했으면 'Launch Lab'을 누르자.   
맨 왼쪽에는 실습 순서가 나열되어 있고 중간에는 설명이 나와 있다. 우측에는 코드를 입력하는 CLI(Command Line Interface, 맥으로 치자면 터미널, 윈도우로 치자면 명령 프롬프트) 환경이 갖춰져 있다. 설명을 읽으며 이곳에 코드를 입력하면 된다.    

## 1단계: IBM Cloud 계정으로 로그인하기  
당연한 소리지만 IBM Cloud 계정이 있어야 한다. 미리 로그인해 이 페이지에서 오류가 뜨지 않도록 하자.(필자는 랩에서 일차적으로 로그인을 해야 한다는 것을 모른 채 입장해서 오류를 겪었다.)  
로그인을 끝냈다면 CLI에 이 명령어를 입력하자.   
``` bash
Ibmcloud login --sso -a cloud.ibm.com -r us-south --apikey bc493e50b2f206dc0b4ada2dc5b61328
```
![이미지](https://user-images.githubusercontent.com/50163676/91159962-c852a900-e703-11ea-8275-8c16008a03cc.png "클라우드 로그인 결과창")  
여기서의 API 키는 인터랙티브 랩 측에서 제공하는 것이다. 개인 컴퓨터에서 실습을 진행한다면 IBM Cloud와 쿠버네티스 CLI를 설치한 상태여야 하지만, 이 랩 안에 존재하는 터미널에는 기본적으로 깔려 있으므로 설치할 필요 없다. 로컬 컴퓨터에 설치하는 방법은 다른 게시물을 통해 설명할 것이다.    

## 2단계: IKS(IBM Kubernetes Service)에 접속하기 위해 CLI 설정하기  
터미널에 이 코드를 입력하라.  
``` bash
ibmcloud ks cluster config --cluster bt270f7d0mh61g4iactg
```
![이미지](https://user-images.githubusercontent.com/50163676/91159990-d0aae400-e703-11ea-9d6b-7a1b4e97c7d7.png "쿠버네티스 개발환경 설정하기")  
IBM 클라우드에서 설정 파일을 다운받고 쿠버네티스 클러스터를 사용하기 위한 문맥을 다운로드하는 작업이다. kubeconfig 명령어를 사용하면 로컬 환경에서 설치할 수 있다. 이는 kubectl 클라이언트가 우리의 클러스터를 가리키도록 설정한다.  
이 랩에서는 guestbook이라는 샘플 응용프로그램을 사용할 수 있다.    

## 3단계: 컨테이너 이미지를 deploy하기  
Deploy라는 단어가 하도 많이 등장해서 그러려니 하고 넘겼는데 한국어 뜻도 궁금해졌다.  
>de-ploy (verb)  
>> move (troops or equipment) into position for military action.  
>> bring into effective action; utilise.  
>> 전개하다, 전개시키다    

찾아보지 않는 편이 나았다. 느낌상, 어딘가에 배정해서 작동 또는 활동할 수 있도록 하는 의미 같으므로 그렇게 생각하련다.(기술 용어는 한국어 번역본이 전무하다시피 해서, 스스로 판단하는 편이 더 낫다고 생각한다.)    

+ *아까의 guestbook을 작동시킨다.*    
``` bash
Kubectl create deployment guestbook --image=ibmcom/guestbook:v1
```
create 명령어는 단순히 애플리케이션 컨테이너를 갖고 있는 포드만 출력하지 않고 포드의 생명줄을 관리하는 deployment 리소스들도 함께 보여준다.
![이미지](https://user-images.githubusercontent.com/50163676/91160018-da344c00-e703-11ea-8511-aecdaee3d651.png "게스트북 작동!")    
 
+ *잘 작동되는지 확인해 보자.*
``` bash
Kubectl get pods
```
![이미지](https://user-images.githubusercontent.com/50163676/91160023-ddc7d300-e703-11ea-9e87-d386f3cd6d03.png "예시 애플리케이션 작동시키기")  
리눅스 명령어는 직관적이어서 편한 것 같다.(배우지 않았기에 이런 말을 할 수 있을지도 모른다.) 이 명령어까지 출력하면 guestbook 어쩌고저쩌고가 running 상태라고 출력할 것이다.    

애플리케이션 상태가 '작동 중'으로 잘 출력됐다면 *deployment를 웹상에 공개할 때* 가 왔다. 아래의 코드를 입력하라.  
``` bash
kubectl expose deployment guestbook --type="NodePort" --port=3000
```
![이미지](https://user-images.githubusercontent.com/50163676/91160035-e15b5a00-e703-11ea-828b-f359444bc291.png "만천하에 공개하기")  
왜 하필 노드 포트가 3000이냐면, 이 랩에서 예시로 제고하는 guestbook이 포트 3000에서 작동해서 그렇다.  

이제 *워커 노드에서 사용되는 포트를 찾으려면 이 서비스를 테스트해야 한다.*  
``` bash
Kubectl get service guestbook
```
![이미지](https://user-images.githubusercontent.com/50163676/91160041-e3bdb400-e703-11ea-9498-06c33a3cf232.png "노드 포트 번호 찾기")  
출력창의 PORT(S)에서 노드 포트의 번호를 찾을 수 있다. 내 결과 같은 경우에는 31208이다. 이는 실행하는 사람에 따라 다르므로 그대로 출력되지 않았다고 해서 불안해할 필요는 없다.    

여기까지 따라했으면 모든 준비가 끝났다. 이제 IP 주소를 파악하기만 하면 된다.  
``` bash
ibmcloud ks workers --cluster cldlabs-iks-yzw5k0
```
![이미지](https://user-images.githubusercontent.com/50163676/91160054-e6200e00-e703-11ea-8c49-1856604096e7.png "IP주소 찾기")  
출력 결과에서 Public IP 아래에 있는 항목을 복사한 후 주소창에 붙여넣기한다. 주의할 점은 주소 뒤에 ':노드 포트 번호'를 붙여야 한다는 것이다. 예를 들어, 위에서 파악한 노드 포트 31208을 데려다가 주소창에 입력해야 하는 항목을 만들자면:  
*173.193.99.136:31208* 이다.(173.193.99.136은 가상의 주소)   

##4단계: deploy 결과 확인하기  
![이미지](https://user-images.githubusercontent.com/50163676/91160062-e8826800-e703-11ea-9cb7-646cf4611503.png "최종 결과")  
IP 주소로 이동하면 위와 같은 창이 뜨는 것을 볼 수 있다!    

지금까지 쿠버네티스 활용 기초 단계인 '컨테이너 이미지 deploy하기'를 진행했다. 다음 포스트에서는 로컬 환경에서 IBM Cloud를 사용하는 방법과 쿠버네티스 개발환경을 설치하는 절차를 설명하겠다.  

*질문, 댓글, 그리고 출처를 밝힌 공유는 언제나 환영입니다.*  
