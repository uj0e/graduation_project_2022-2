const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

// express 설정 1
const app = express();

// ejs 설정 4 html은 데이터베이스의 정보 가져올 수 없기에 ejs 확장자 사용
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// 정제 (미들웨어) 5 파일을 가져오면 깨질 수 있는데 그걸 방지
app.use(bodyParser.urlencoded({ extended: false }));

// 세션 (미들웨어) 6
app.use(
  session({
    secret: "loginData", // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    //store: new FileStore(), // 세션이 데이터를 저장하는 곳
  })
);

app.use(express.static(__dirname + "/"));

// 페이지 이동 라우터

app.use("/", main);

// 사업자
const productEdit = require("./productEditRouter");
const registration = require("./RegistrationAndmodificationRouter");

app.use("/productEdit", productEdit);
app.use("/RegistrationAndmodification", registration);

// 회원가입
const signup = require("./signupRouter");
const consumer = require("./consumerLoginRouter");
const business = require("./businessLoginRouter");

app.use("/signup", signup);
app.use("/consumer_login", consumer);
app.use("/business_login", business);

// 로그인 로그아웃
const login = require("./loginRouter");
const logout = require("./logoutRouter");
const mypage = require("./mypageRouter")(app);

app.use("/login", login);
app.use("/logout", logout);
app.use("/mypage", mypage);

// 사업자 회원가입
app.use(express.static("public"));

const businessSignup = require("./businessSignup");

app.post("/business_login", businessSignup);

// 소비자 회원가입
const consumerSignup = require("./consumerSignup");

app.post("/consumer_login", consumerSignup.consumerRouter);

// 로그인
const loginPostSignup = require("./loginPostRouter");

app.post("/login", loginPostSignup.loginRouter);

// 마이페이지 불러오기
const mypageRouter = require("./mypageRouter");

app.get("/mypage", mypageRouter);

// 마이페이지 수정
const updateRouter = require("./updateRouter");

app.post("/update", updateRouter.updateRouter);

// 상품등록수정
app.use(express.static("public"));

const multerRouter = require("./multerRouter");

app.post("/RegistrationAndmodification", multerRouter);

// // error
// app.use(function (req, res, next) {
//   res.status(404).send("라우터 에러");
// });

const port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`${port} is running`);
});
