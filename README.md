# graphql 테스트를 위한 예제 소스 코드 작성
[server 구동]
node mysql_test.js

[service 접속]
http://localhost:4000/graphql

[테스트]

(1) 

{
  getUser {
    id
    name
  }
}


(2)
{
  getUser(id:2) {
    id
    name
    company {
      corp_number
      name
    }
  }
}