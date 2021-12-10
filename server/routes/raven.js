const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');

/**
 * @function begin 开始
 */
router.post('/begin', async (req, resp) => {
    console.log('session', req.session);
    let mail = req.session.mail;
    if (typeof (mail) == "undefined") {
        resp.json({
            'haslogin': false
        })
        return;
    }
    let sql = ` select save,time,testList,rightCount from raven where mail = '${mail}';`
    let sqlres = await dbs.QueryOne(sql);
    console.log('查询结果', sqlres);
    if (typeof (sqlres) == 'undefined') {
        resp.json({
            'save': 0,
            'time': 0,
            'testList': '',
            'rightCount': 0
        })
    }
    else {
        resp.json({
            'save': sqlres.save,
            'time': sqlres.time,
            'testList': sqlres.testList,
            'rightCount': sqlres.rightCount,
        })
    }
})


/**
 * @function save 保存进度
 */
router.post('/save', async (req, resp) => {
    console.log('session', req.session);
    let mail = req.session.mail;
    let { save, time,testList,rightCount } = req.body;

    let sql = ` select save,time from raven where mail = '${mail}';`
    let sqlres = await dbs.QueryOne(sql);
    if (typeof (sqlres) == 'undefined') {
        sql = ` insert into raven(save,time,mail,testList,rightCount) 
            values (${save},${time},'${mail}','${testList}',${rightCount}); `
    }
    else {
        sql = ` update raven set save = ${save},time=${time},
            testList='${testList}',rightCount = ${rightCount}
            where mail = '${mail}'`;
    }
    sqlres = await dbs.Run(sql);
    resp.json({
        'save': true
    })
})


module.exports = router;
