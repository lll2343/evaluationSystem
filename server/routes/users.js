var express = require('express');
var router = express.Router();
var dbs = require('./../db/dbs')
var randomNum = require('./../utils/random')
const { encrypt, decrypt } = require('./../utils/cryptpo');
var mailsend = require('./../utils/nodemailer')
var timer = require('./../utils/getTime')

// 使用中间件来检查登录状态
const checkLogin = (req, resp, next) => {
  console.log(req.session)
  console.log('检查登录状态，req.session.mail', req.session.mail)
  if (req.session.mail) {
    return resp.json({
      'haslogin': false,
      'msg': '您已登录',
      'type': 'error'
    })
  }
  next()
}

router.post('/checklogin', async (req, resp) => {
  console.log(req.session)
  console.log('检查登录')
  if (req.session.mail) {
    resp.json({ 'islogin': true,'mail':req.session.mail })
  }
  else {
    resp.json({ 'islogin': false })
  }
  // resp.json({ 'islogin': true,'mail':'12' })
})


/**
 * 登录
 */
router.post('/login', checkLogin)
router.post('/login', async (req, resp) => {
  let { mail, pwd } = req.body
  let sql = `select mail,iv,content from users where mail = '${mail}' `
  let sqlres = await dbs.QueryOne(sql)
  console.log(sqlres)
  if (typeof (sqlres) == "undefined") {
    resp.json({ 'msg': '该邮箱号码尚未注册', 'type': 'error' })
  }
  else if (pwd == decrypt({
    iv: sqlres.iv,
    content: sqlres.content
  })) {
    req.session.mail = mail
    console.log(req.session)
    resp.json({ 'msg': '登录成功', 'type': 'success' })
  } else {
    resp.json({ 'msg': '密码错误，请重试', 'type': 'error' })
  }

})


/**
 * 注册
 */
 router.post('/reg', checkLogin)
router.post('/reg', async (req, resp) => {
  let { mail, code, pwd } = req.body
  console.log(mail)
  let sql = `select mail from users where mail = '${mail}' `
  let sqlres = await dbs.QueryOne(sql)
  console.log(sqlres)
  if (typeof (sqlres) != "undefined") {
    resp.json({ 'msg': '该邮箱号码已注册', 'type': 'error' })
  }

  // 查询验证码
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
    // 判断条件 mycode == code && postTime + 60000 < timer.getCurTimeStamp()
    if (mycode == code) {
      let { iv, content } = encrypt(pwd)
      sql = `insert into users(mail,iv,content) values ('${mail}','${iv}','${content}') `
      let res = await dbs.Run(sql)

      if (res.success) {
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
  let { mail } = req.body
  // 随机生成的验证码
  let code = randomNum.createSixNum()
  // 调用发送邮件服务
  let info = await mailsend.mailSend(mail, 
      '注册EvaluationSystem测评系统验证码',
       `<h1>${code.toString()}</h1>`)
  console.log(info)

  let sql = ` insert into ver(mail,code) values ('${mail}','${code}'); `
  let sqlres = await dbs.Run(sql)
  if (sqlres.success) {
    resp.json({
      'success': true
    })
  }
  else {
    resp.json({
      'success': false
    })
  }
})

/**
 * 退出登录
 */
router.post('/loginout', async (req, resp) => {
  req.session.mail = null;
  resp.json({ 'msg': '您已退出登录', 'type': 'info' })
})

module.exports = router;
