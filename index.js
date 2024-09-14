const express = require("express"); // express 모듈을 가져오겠다
const app = express(); //새로운 express 앱을 만듦
const port = 5000; //port번호 지정
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://yuiky321:ehxhfl9090!!@cluster0.lx6ji.mongodb.net/", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("hello world");
}); //     /-->> 루트 디렉토리   : 루트 디렉토리에 오면 hello world를 실행 시키겠다
app.listen(port, () => {
  console.log(`example app listening on port ${port}!`);
}); // 포트 번호 실행
