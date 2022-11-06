const express = require("express");
const path = require('path');
const mySql = require('mysql');

// express 설정 1
const app = express();

app.use(express.static(__dirname + '/'));

app.get("/",(req,res) => {
  res.sendFile(__dirname + "/login.html");
})

const pool = mySql.createPool({
  connectionLimit: 10, // 접속을 10개 만들고 10개를 재사용
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'user',
  debug: false,
});

// 로그인
app.post('/login',(req,res)=>{
    const body = req.body;
    const id = body.id;
    const pw = body.pw;

    client.query('select * from userdata where id=?',[id],(err,data)=>{
        // 로그인 확인
        console.log(data[0]);
        console.log(id);
        console.log(data[0].id);
        console.log(data[0].pw);
        console.log(id == data[0].id);
        console.log(pw == data[0].pw);
        if(id == data[0].id && pw == data[0].pw){
            console.log('로그인 성공');
            res.render('/login');
        }else{
            console.log('로그인 실패');
            res.render('/login');
        }
    });
    
});

app.get("/singup", (req, res) => {
  console.log("회원가입페이지");
  res.sendFile(__dirname + "/signup.html");
})

app.get("/business_login", (req, res) => {
  console.log("사업자 회원가입");
  res.sendFile(__dirname + "/business_login.html");
});

app.get("/consumer_login", (req, res) => {
  console.log("소비자 회원가입");
  res.sendFile(__dirname + "/consumer_login.html");
});


const port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`${port} is running`);
});
