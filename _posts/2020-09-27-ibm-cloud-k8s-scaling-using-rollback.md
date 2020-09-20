---
title: "IBM Cloud에서 쿠버네티스 사용하기 2탄"
categories: [CLOUDERs]
---

[이전 편](https://gottgam.github.io/clouders/ibm-cloud-k8s-deploying/)에서는 IBM 클라우드 환경에서 쿠버네티스를 사용하여 애플리케이션을 배포하는 것을 진행했다면, 이번 포스트에서는 쿠버네티스의 레플리카(Replica)를 사용해 앱을 스케일링하는 과정을 보일 것이다.    

## 레플리카(A replica)는 무엇인가?  
쿠버네티스 환경에서의 레플리카는 현재 운영중인 서비스를 포함하는 포드(pod)의 복사본이라 칭할 수 있다. 단독으로 쓰이는 경우보다 다수로(그래서 replica's'라고 부른다) 사용하는 경우가 잦다. 왜냐하면, 애플리케이션에 사용자가 몰려 로드가 증가하면 유도리있게 다룰 줄 아는 조수가 필요하기 때문이다. 조수 역할을 착실하게 수행하는 것이 바로 레플리카다.    

## 쿠버네티스에서 레플리카 사용하기  
쿠버네티스에서 배포 수를 조절하려면 'scale' 명령어를 사용하면 된다.  

```bash
kubectl scale --replicas=10 deployment guestbook
```    

앞에서 만들었던 우리의 첫 서비스 'guestbook'에 레플리카를 10개 만들었다. 이는 원래 가지고 있던 하나의 포드에 9개의 새 포드를 만든다는 뜻이다. 이제 각 포드들에 우리의 서비스를 출시하자.  
```bash
kubectl rollout status deployment guestbook
```    

출시되는 과정을 나타내는 출력 결과가 재빠르게 지나가므로 눈에 보이지도 않을 것이다. 출력 결과는 이렇다.  
```bash
Waiting for rollout to finish: 1 of 10 updated replicas are available...
Waiting for rollout to finish: 2 of 10 updated replicas are available...
Waiting for rollout to finish: 3 of 10 updated replicas are available...
Waiting for rollout to finish: 4 of 10 updated replicas are available...
Waiting for rollout to finish: 5 of 10 updated replicas are available...
Waiting for rollout to finish: 6 of 10 updated replicas are available...
Waiting for rollout to finish: 7 of 10 updated replicas are available...
Waiting for rollout to finish: 8 of 10 updated replicas are available...
Waiting for rollout to finish: 9 of 10 updated replicas are available...
deployment "guestbook" successfully rolled out
```  
  
출시가 끝났다면 현재 우리가 갖고 있는 포드의 개수를 알아볼 수 있다.  
```bash
kubectl get pods
```
![image](https://user-images.githubusercontent.com/50163676/93704982-5fb8e980-fb54-11ea-807c-99ef81da380c.png "포드들의 목록 출력")  
레플리카들이 10개 출력되는 것을 확인할 수 있다.    

## 배포된 상태에서 애플리케이션 수정, 혹은 취하하기  
서비스를 출시한 다음, 열심히 수정 및 보완 작업을 거쳐 두 번째 버전을 만들었다고 가정해 보자. 'guestbook' 버전 2를 배포할 차례다.
```bash
kubectl set image deployment/guestbook guestbook=ibmcom/guestbook:v2
```  
이 포스트는 지난번에 밝혔다시피 IBM CloudLab Interactive Training에서 실습을 위해 만들어 둔 guestbook 이미지를 사용하고 있다. 개인이 만든 서비스에 적용하고자 할 때는 뒷부분을 형식에 맞게 살짝 수정하면 될 것이다.    

kubectl 명령어는 set 서브 명령어를 통해 현재 존재하는 리소스의 세부사항을 수정할 수 있도록 돕는다.  
여기서 알아두면 좋은 것은, 하나의 포드는 다수의 컨테이너를 가질 수 있다는 점이며 이름 또한 달리할 수 있다는 사실이다. 각각의 이미지는 한꺼번에 수정할 수 있지만 따로따로 수정 작업을 거칠 수도 있다. 지금 guestbook 예시에서는 컨테이너의 이름 또한 guestbook으로 정한 상태다.    

출시 상태를 확인하기 위해 아까의 rollout 구문을 다시 입력해 준다.  
```bash
kubectl rollout status deployment/guestbook
```  
마찬가지로 쭈루룩 지나가는 출력 결과에 정신을 차리지 못할 것이다. 하지만 수정된 버전 2 이미지가 성공적으로 배포된다는 긍정적인 생각을 갖자.  
이제 지난 시간에 했던 대로 주소창에 우리 서비스의 <public-IP>:<nodeport>를 입력해 접속하면 guestbook의 "v2"가 서비스되고 있음을 알 수 있다.  
![이미지](https://user-images.githubusercontent.com/50163676/93705140-d7d3df00-fb55-11ea-8c23-b65cd99768c6.png "게스트북 버전 2")    

## 제일 최근의 출시 취소하기  
쥐구멍으로 뒤구르기를 하며 내빼는 생쥐를 떠올리면 편하다.  
```bash
kubectl rollout undo deployment guestbook
```  
이 명령어를 입력한 후,  
```bash
kubectl rollout status deployment/guestbook
```  
이 명령어를 입력하면  
![이미지](https://user-images.githubusercontent.com/50163676/93705354-7ad92880-fb57-11ea-9ed2-bcbfa81b1184.png "rollback 취소 결과")  
이와 같은 결과를 얻는다.    

롤아웃을 하는 동안, '구형' 레플리카들과 '신형' 레플리카들의 속성을 볼 수 있다. '구형' 레플리카들은 우리가 맨 앞에서 설치한 10개의 포드들이다. '신형' 레플리카들은 v2라는 완전히 다른 애플리케이션 이미지를 다루는 새로운 녀석들이다. 이들 모두의 명줄을 배포관리자가 쥐고 있다. 배포관리자는 __ReplicaSet__ 라는 이름 아래에서 모든 포드들을 관리한다.  
```bash
kubectl get replicates
```  
이 명령어를 입력하면 현재의 레플리카셋을 보여 준다.  
```bash
NAME                   DESIRED   CURRENT   READY     AGE
guestbook-5f5548d4f    10        10        10        21m
guestbook-768cc55c78   0         0         0         3h
```  
  
이제 포드들에는 게스트북 버전 2의 이미지만 남게 된다.    

## 배포 멈추기  
이제 애플리케이션 배포를 멈추고 싶다면?  
```bash
kubectl delete deployment guestbook
```  
배포를 취소했다. 이제 서비스를 삭제한다.  
```bash
kubectl delete service guestbook
```  
![이미지](https://user-images.githubusercontent.com/50163676/93705152-e4583780-fb55-11ea-93b0-597a19664f29.png "안녕~")    

게스트북 안녕! 그동안 수고해 줘서 고맙다.  
다음 편에서는 앞에서 진행했던 배포법 외 다른 방법을 시도할 것이다.    

*질문, 댓글, 그리고 출처를 밝힌 공유는 언제나 환영입니다.*