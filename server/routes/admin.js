const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');

const { getCurTimeStamp } = require('./../utils/getTime');
const { createSixNum } = require('./../utils/random');
const { encrypt, decrypt } = require('./../utils/cryptpo');
const { mailSend } = require('./../utils/nodemailer');

// 检查是否登录
router.post('/checklogin',async (req,resp)=>{
    console.log(req.session);
    if(req.session.adminAccount) {
        resp.json({
            'islogin':true,
            'account':req.session.adminAccount,
            'name':req.session.name
        })
    } else {
        resp.json({
            'islogin':false
        })
    }
})


// 管理员登录
router.post('/login', async (req, resp) => {
    let { account, pwd } = req.body;
    let sql = ` select iv,content,username from admin where account = '${account}'; `
    let sqlres = await dbs.QueryOne(sql);
    console.log(sqlres);
    if (typeof (sqlres) == "undefined") {
        resp.json({ 'msg': '该账号无效', 'type': 'error' })
    }
    else if (pwd == decrypt({
        iv: sqlres.iv,
        content: sqlres.content
    })) {
        req.session.adminAccount = account;
        req.session.name = sqlres.username;
        resp.json({ 'msg': '管理员登录成功', 'type': 'success' });
    } else {
        resp.json({ 'msg': '输入的密码错误，请重试', 'type': 'error' });
    }
})


// 管理员登出
router.post('/loginout', async (req, resp) => {
    console.log('session',req.session);
    req.session.adminAccount = null;
    req.session.name = null;
    resp.json({ 'msg': '您已退出登录', 'type': 'info' });
})


module.exports = router;
