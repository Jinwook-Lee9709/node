//모듈
const express = require("express");
const session = require('express-session');
const dotenv = require("dotenv");
const MemoryStore = require('memorystore')(session);
const app = express();
dotenv.config();

//오브젝트 설정
const maxAge = 1000 * 60 * 5;

const sessionObj = {
  secret: 'wegf6124@#$@#!',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge,
  },
};

 
//라우팅
const home = require("./src/routes/home");
const { urlencoded } = require("express");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(session(sessionObj));


app.use("/",home); // use -> 미들 웨어를 등록해주는 메서드.

module.exports = app;




