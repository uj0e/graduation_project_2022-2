const express = require("express");
const path = require('path');

// express 설정 1
const app = express();

app.use(express.static(__dirname + '/'));

app.get("/",(req,res) => {
  res.sendFile(__dirname + "/login.html");
})

// 로그인
app.post("/login", (req, res) => {
  const id = "hi";
  const password = "1234";

  if(id == req.body.id && password == req.body.password){
    alert("회원가입 성공");
  } else {
    alert("회원가입 실패 다시 하세요");
  }

  
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
