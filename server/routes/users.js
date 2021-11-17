var express = require('express');
var router = express.Router();
var dbusers = require('./../db/dbuser')
var dbver = require('./../db/dbver')
var randomNum = require('./../utils/random')
const { encrypt, decrypt } = require('./../utils/cryptpo');
var nodemailer = require('./../utils/nodemailer')
var timer = require('./../utils/getTime')

// 使用中间件来检查登录状态
const checkLogin = (req, resp, next) => {
  if (!req.session.phone) {
    return resp.json({
      'haslogin': false,
      'msg': '未登录',
      'type': 'error'
    })
  }
  next()
}

/* GET users listing. */
router.get('/', async function (req, resp, next) {
  resp.send('成功')
});

// router.post('/login',checkLogin)
router.post('/login', async (req, resp) => {
  let { phone, pwd } = req.body
  let rows = await dbusers.queryByPhone(phone)
  console.log(rows)
  if (rows.length == 0) {
    resp.json({ 'msg': '该邮箱号码尚未注册', 'type': 'error' })
  }
  else if (pwd == decrypt({
    iv: rows[0].iv,
    content: rows[0].content
  })) {
    req.session.phone = phone
    resp.json({ 'msg': '登录成功', 'type': 'success' })
  } else {
    resp.json({ 'msg': '密码错误，请重试', 'type': 'error' })
  }
})

router.post('/reg', async (req, resp) => {
  console.log('点击了注册')
  let { phone, code, pwd } = req.body
  console.log(phone)
  let rows = await dbusers.queryByPhone(phone)
  console.log(rows)
  if (rows.length > 0) {
    resp.json({ 'msg': '该邮箱号码已注册', 'type': 'error' })
  }

  let selRes = await dbver.selectVer(phone)
  console.log(selRes)
  if (selRes.length == 0) {
    resp.json({ 'msg': '该邮箱尚未发送验证码', 'type': 'error' })
  } else {
    console.log(selRes)
    let mycode = selRes[selRes.length - 1].code
    let postTime = selRes[selRes.length - 1].time
    if (mycode == code && postTime + 60000 < timer.getCurTimeStamp()) {
      let { iv, content } = encrypt(pwd)
      let res = await dbusers.insertUser(phone, iv, content)
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

router.post('/email', async (req, resp) => {
  console.log(req.body)
  let { mail } = req.body
  let code = randomNum.createSixNum() // 随机生成的验证码
  console.log(code)
  let sqlres = await dbver.insertVer(mail, code)
  console.log(sqlres)
  resp.json({
    'success': true
  })
})

router.post('/loginout', async (req, resp) => {
  req.session.phone = null;
  resp.json({ 'msg': '您已退出登录', 'type': 'info' })
})

module.exports = router;
