var express = require('express');
var router = express.Router();
const models = require("../models");

// 메인 페이지
router.get('/', function(req, res, next) {
  if(req.cookies){
    console.log(req.cookies);
  }

  res.send("환영합니다 ~");
});


// 회원가입 GET
router.get('/sign_up', function(req, res, next) {
  res.render("user/signup");
});

// 회원가입 POST
router.post("/sign_up", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt
  })

  res.redirect("/users/sign_up");
})

// 로그인 GET
router.get('/login', function(req, res, next) {
  res.render("user/login");
});

// 로그인 POST
router.post("/login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email : body.userEmail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치");
    // 쿠키 설정
    res.cookie("user", body.userEmail , {
      expires: new Date(Date.now() + 900000),
      httpOnly: true
    });
    res.redirect("/users");
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect("/users/login");
  }
});


module.exports = router;
