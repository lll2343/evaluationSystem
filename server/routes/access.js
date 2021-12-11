const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');

// 刚刚开始检测是否登录
router.post('/begin', async (req, resp) => {
    console.log('session', req.session);
    let mail = req.session.mail;

    if (typeof (mail) == "undefined" || mail==null) {
        resp.json({ 'msg': '您尚未登录', 'type': 'error' });
    } else {
        let sql = `select process from users where mail = '${mail}' `
        let sqlres = await dbs.QueryOne(sql)
        console.log(sqlres)  
        resp.json({
            'mail': mail,
            'process': sqlres.process
        });
    }
})

router.post('/info', async (req, resp) => {
    console.log('session', req.session);
    let sessionMail = req.session.mail;
    let { username, birth, mail, major } = req.body;
    console.log(req.body)
    if (sessionMail != mail) {
        resp.json({ 'msg': '当前所填写邮箱和注册邮箱不一致', 'type': 'error' });
        return;
    }
    let date = new Date(birth).getTime();

    let sql = ` update users set username = '${username}',birth=${date}, 
            marjor = '${major}',process = 2 where
            mail = '${mail}'; `;
    console.log(sql);
    let sqlres = await dbs.Run(sql);

    // 同时创建记录
    sql = `select mail from records where mail='${mail}';`
    sqlres = await dbs.QueryOne(sql);
    if(typeof(sqlres) == 'undefined'){
        sql = `insert into records (mail) values ('${mail}')`;
        sqlres = await dbs.Run(sql);
    } 
    
    if(sqlres.success){
        resp.json({ 'success': true });
    } else {
        resp.json({'success':false});
    }
})

/**
 * @function numRum 随机记数字的结果
 */
router.post('/numRum', async (req, resp) => {
    console.log('记数字结果记录');
    let sessionMail = req.session.mail;
    let { successTimes } = req.body;
    let sql = ` update records set remNum = ${successTimes} 
        where mail = '${sessionMail}' `;
    let sqlres = await dbs.Run(sql);
    let sql2 = ` update users set process = 3 where mail = '${sessionMail}'`
    let sqlres2 = await dbs.Run(sql2);
    if(sqlres.success && sqlres2.success){
        resp.json({ 'success': true });
    } else {
        resp.json({ 'success': false });
    }
})

router.post('/hanoi',async (req,resp) => {
    console.log('汉诺塔')
    let { hanoiSteps,hanoiSeconds } = req.body;
    let sessionMail = req.session.mail;

    let sql = ` update records set 
        hanoiSteps = ${hanoiSteps} ,
        hanoiSeconds = ${hanoiSeconds}
        where mail = '${sessionMail}' `;
    let sqlres = await dbs.Run(sql);
    let sql2 = ` update users set process = 4 where mail = '${sessionMail}'`
    let sqlres2 = await dbs.Run(sql2);
    if(sqlres.success && sqlres2.success){
        resp.json({ 'success': true });
    } else {
        resp.json({ 'success': false });
    }
})


router.post('/math',async (req,resp) => {
    console.log('数字逻辑题')
    let { mathQue } = req.body;
    let sessionMail = req.session.mail;

    let sql = ` update records set 
        mathQue = '${mathQue}'
        where mail = '${sessionMail}' `;
    let sqlres = await dbs.Run(sql);
    let sql2 = ` update users set process = 5 where mail = '${sessionMail}'`
    let sqlres2 = await dbs.Run(sql2);
    if(sqlres.success && sqlres2.success){
        resp.json({ 'success': true });
    } else {
        resp.json({ 'success': false });
    }
})

router.post('/card',async (req,resp)=>{
    console.log('卡牌游戏');
    let {star} = req.body;
    let sessionMail = req.session.mail;

    let sql = ` update records set 
        cardStar = '${star}'
        where mail = '${sessionMail}';`;
    let sqlres = await dbs.Run(sql);
    let sql2 = ` update users set process = 100 where mail = '${sessionMail}';`;
    let sqlres2 = await dbs.Run(sql2);
    if(sqlres.success && sqlres2.success){
        resp.json({ 'success': true });
    } else {
        resp.json({ 'success': false });
    }
})


module.exports = router;
