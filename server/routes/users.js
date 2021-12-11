const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');

const { getCurTimeStamp } = require('./../utils/getTime');
const { createSixNum } = require('./../utils/random');
const { encrypt, decrypt } = require('./../utils/cryptpo');
const { mailSend } = require('./../utils/nodemailer');

// 使用中间件来检查登录状态
const checkLogin = (req, resp, next) => {
  // console.log(req.session)
  console.log('检查登录状态，req.session.mail', req.session.mail)
  if (req.session.mail) {
    return resp.json({
      'haslogin': false,
      'mail': req.session.mail,
      'msg': '您已登录',
      'type': 'error'
    });
  } else {
    next();
  }
}

// 检查登录状态
router.post('/checklogin', async (req, resp) => {
  console.log(req.session)
  console.log('检查登录')
  if (req.session.mail) {
    resp.json({ 'islogin': true, 'mail': req.session.mail })
  }
  else {
    resp.json({ 'islogin': false })
  }
  // resp.json({ 'islogin': true,'mail':'12' })
})


// 用户登录
router.post('/login', checkLogin);
router.post('/login', async (req, resp) => {
  let { mail, pwd } = req.body;
  let sql = ` select iv,content from users where mail = '${mail}'; `
  let sqlres = await dbs.QueryOne(sql);
  console.log(sqlres);
  if (typeof (sqlres) == "undefined") {
    resp.json({ 'msg': '该账号尚未注册', 'type': 'error' })
  }
  else if (pwd == decrypt({
    iv: sqlres.iv,
    content: sqlres.content
  })) {
    req.session.mail = mail;
    resp.json({ 'msg': '登录成功', 'type': 'success' });
  } else {
    resp.json({ 'msg': '输入的密码错误，请重试', 'type': 'error' });
  }
})

// 用户登出
router.post('/loginout', async (req, resp) => {
  req.session.mail = null;
  resp.json({ 'msg': '您已退出登录', 'type': 'info' })
})


// 用户注册
router.post('/reg', checkLogin)
router.post('/reg', async (req, resp) => {
  let { mail, code, pwd } = req.body;
  let sql = `select mail from users where mail = '${mail}' `
  let sqlres = await dbs.QueryOne(sql);
  if (typeof (sqlres) != "undefined") {
    resp.json({ 'msg': '该邮箱号码已注册', 'type': 'error' })
  } else {
    sql = ` select mail,code,postTime from ver where mail = '${mail}';`
    sqlres = await dbs.Query(sql);
    // 获取最新的一条验证码
    let mycode = sqlres[sqlres.length - 1].code
    let postTime = sqlres[sqlres.length - 1].time
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


// 注册发送验证码
router.post('/email', async (req, resp) => {
  let { mail } = req.body;

  // 生成随机的六位数字验证码
  let code = createSixNum();

  console.log(mail, code);

  try {
    // 邮件服务
    let info = await mailSend(
      mail,
      '注册EvaluationSystem测评系统验证码',
      `<h1>${code.toString()}</h1>`
    );

    console.log(info);

    // 获取收到验证码的时间
    let time = getCurTimeStamp();

    let sql = ` insert into ver(mail,code,time) values ('${mail}','${code}','${time}')`;
    let sqlres = await dbs.Run(sql);
    if (sqlres.success) {
      resp.json({
        'success': true
      })
    } else {
      resp.json({
        'success': false
      })
    }

  } catch (error) {
    console.log('promise reject error', error)
  }
})

// 忘记密码，找回
router.post('/forget', async (req, resp) => {
  try {
    let { mail } = req.body;
    let sql = `select mail,iv,content from users where mail = '${mail}' `;
    let sqlres = await dbs.QueryOne(sql);
    if (typeof (sqlres) == "undefined") {
      resp.json({ 'msg': '该邮箱号码尚未注册', 'type': 'error' });
    } else {
      let pwd = decrypt({
        iv: sqlres.iv,
        content: sqlres.content
      });
      console.log('mail',mail);
      console.log('pwd',pwd);
    
      // 通过邮件发送密码
      let info = await mailSend(mail,
        'EvaluationSystem测评系统密码找回',
        `<h1>本次找回密码，您的密码为 ${pwd}</h1>`);
      console.log(info);

      resp.json({ 'msg': '已通过邮件方式发送您的密码，请注意查收', 'type': 'success' });
    }
  } catch (error) {
    console.log('promise reject error', error)
  }
})

module.exports = router;
