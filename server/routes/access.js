const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');

// 刚刚开始检测是否登录
router.post('/begin', async (req, resp) => {
    console.log('session',req.session);
    let mail = req.session.mail
    if(typeof(mail) == "undefined"){
        resp.json({'msg':'您尚未登录','type':'error'});
    } else {
        resp.json({'mail':mail});
    }
})

router.post('/info', async (req, resp) => {
    console.log('session',req.session);
    let sessionMail = req.session.mail;
    let { username,birth,mail,major } = req.body;
    console.log(req.body)
    if(sessionMail != mail){
        resp.json({'msg':'当前所填写邮箱和注册邮箱不一致','type':'error'});
    }
    // 今日写到这，时间需要转换为时间戳
    let sql = ` update table set username = '${username}',birth=${birth}, major = '${major}'; `;
    console.log(sql);
    resp.json({'success':true});
})




module.exports = router;
