var express = require('express');
var router = express.Router();
var dbs = require('./../db/dbs')
var randomNum = require('./../utils/random')
const { encrypt, decrypt } = require('./../utils/cryptpo');
var nodemailer = require('./../utils/nodemailer')
var timer = require('./../utils/getTime')
var nodemailer = require('nodemailer');

// 使用中间件来检查登录状态
const checkLogin = (req, resp, next) => {
  console.log(req.session)
  console.log('检查登录状态，req.session.mail',req.session.mail)
  if (req.session.mail) {
    return resp.json({
      'haslogin': false,
      'msg': '您已登录',
      'type': 'error'
    })
  }
  next()
}

/* GET users listing. */
router.get('/', async function (req, resp, next) {
  resp.send('成功')
});

router.post('/checklogin',async (req,resp)=>{
  console.log(req.session)
  console.log('检查登录')
  if(req.session.mail){
    resp.json({'islogin':true})
  }
  else{
    resp.json({'islogin':false})
  }
})


/**
 * 登录
 */
router.post('/login', checkLogin)
router.post('/login', async (req, resp) => {
  console.log('登录')
  let { mail, pwd } = req.body
  let sql = `select mail,iv,content from users where mail = '${mail}' `
  let rows = await dbs.Query(sql)
  if (rows.length == 0) {
    resp.json({ 'msg': '该邮箱号码尚未注册', 'type': 'error' })
  }
  else if (pwd == decrypt({
    iv: rows[0].iv,
    content: rows[0].content
  })) {
    // 用session来标识该用户已成功登录
    req.session.mail = mail
    console.log(req.session)
    console.log(req.session.mail)
    resp.json({ 'msg': '登录成功', 'type': 'success' })
  } else {
    resp.json({ 'msg': '密码错误，请重试', 'type': 'error' })
  }
})

/**
 * 注册
 */
router.post('/reg', async (req, resp) => {
  console.log('点击了注册')
  let { mail, code, pwd } = req.body
  console.log(mail)
  let sql = `select mail from users where mail = '${mail}' `
  let rows = await dbs.Query(sql)
  console.log(rows)
  if (rows.length > 0) {
    resp.json({ 'msg': '该邮箱号码已注册', 'type': 'error' })
  }
  sql = ` select * from ver where mail = '${mail}' `
  let selRes = await dbs.Query(sql)
  console.log(selRes)
  if (selRes.length == 0) {
    resp.json({ 'msg': '该邮箱尚未发送验证码', 'type': 'error' })
  } else {
    console.log(selRes)
    // 获取最新的一条验证码
    let mycode = selRes[selRes.length - 1].code
    let postTime = selRes[selRes.length - 1].time
    if (mycode == code && postTime + 60000 < timer.getCurTimeStamp()) {
      let { iv, content } = encrypt(pwd)
      sql = `insert into users(mail,iv,content) values ('${mail}','${iv}','${content}') `
      let res = await dbs.Run(sql)
      console.log(res)
      if (res) {
        resp.json({ 'msg': '注册成功', 'type': 'success' })
      }
      else {
        resp.json({ 'msg': '注册失败，请重试', 'type': 'error' })
      }
    } else {
      resp.json({ 'msg': '验证码错误或已过期', 'type': 'error' })
    }
  }
})


/**
 * 发送验证码
 */
router.post('/email', async (req, resp) => {
  console.log(req.body)
  let { mail } = req.body
  let code = randomNum.createSixNum() // 随机生成的验证码
  console.log(code)

  // await mailer.sendMail(mail, code);
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'createsfortest@163.com', // generated ethereal user
        pass: 'WYVFQTELVUENCOVO' // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'createsfortest@163.com', // sender address
      to: mail, // list of receivers
      subject: '注册EvaluationSystem测评系统验证码', // Subject line
      // text: '你好吗?', // plain text body
      // html: '<b>您的验证码为</b>' // html body
      html: `<h1>${code.toString()}</h1> `
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions,async (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      let time = timer.getCurTimeStamp()
      let sql = ` insert into ver(mail,code,time) values ('${mail}','${code}', '${time}')`
      let res = await dbs.Run(sql)
      console.log(res)
      resp.json({
        'success': true
      })
    });
  });

  resp.json({
    'success': false
  })
})

/**
 * 退出登录
 */
router.post('/loginout', async (req, resp) => {
  req.session.mail = null;
  resp.json({ 'msg': '您已退出登录', 'type': 'info' })
})

module.exports = router;
