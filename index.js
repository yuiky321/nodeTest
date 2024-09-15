const express = require("express"); // express 모듈을 가져오겠다
const app = express(); //새로운 express 앱을 만듦
const port = 5000; //port번호 지정
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

//데이터를 분석해서 가져올 수 있게 해 줌(타입은 여러가지->경우에 따라 분석해 주어야 함)
//타입이 application/x-www-form-urlencoded 경우의 분석
app.use(bodyParser.urlencoded({ extended: true }));
//타입이 application/json 의 경우의 분석
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
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
app.post("/register", (req, res) => {
  const user = new User(req.body); //body-parser가 읽어올 수 있는 키 값으로 전달된 값을 바꿔줌

  user.save((err, userInfo) => {
    //save메서드는 mongoDB의 메서드임
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  }); //
});
app.listen(port, () => {
  console.log(`example app listening on port ${port}!`);
}); // 포트 번호 실행
