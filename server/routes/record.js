const { response } = require('express');
const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');


// 使用中间件来检查登录状态
const checkLogin = (req, resp, next) => {
    // console.log(req.session)
    console.log('检查登录状态，req.session.mail', req.session.adminAccount)
    if (!req.session.adminAccount) {
        return resp.json({
            'admin': false
        });
    } else {
        next();
    }
}


/**
 * @function query 查询用户列表
 */
router.post('/query', async (req, resp) => {
    console.log('查询');
    let { input, type } = req.body;
    console.log(req.body);

    let sql;
    if (type == 'mail') {
        sql = `select mail,username,process from users
            where mail like '%${input}%'; `;
    } else if (type == 'username') {
        sql = `select mail,username,process from users
            where username like '%${input}%'; `;
    } else {
        sql = `select mail,username,process from users; `;
    }
    console.log(sql);

    let sqlres = await dbs.Query(sql);
    console.log(sqlres);

    resp.json({
        'empty': sqlres.length === 0,
        'userlist': sqlres
    });
})


/**
 * @function detail 查询详细的用户信息
 */
router.post('/detail', async (req, resp) => {
    console.log('详细用户信息');
    let { mail } = req.body;

    let sql = ` select username,birth,marjor,process,ravenScore
        from users where mail='${mail}'; `;
    console.log(sql);
    let sqlres = await dbs.QueryOne(sql);
    console.log(sqlres);
    
    let recordsres;
    if(sqlres.process==100){
        // 查询
        sql = ` select remNum,hanoiSteps,hanoiSeconds,mathQue,cardStar 
            from users records 
            where mail = '${mail}'; `
        recordsres = await dbs.QueryOne(sql);
        let mathQue = 0;
        for(let i=0;i<recordsres.mathQue.length;i++){
            if(recordsres.mathQue[i] == '1'){
                mathQue += 1;
            }
        }
        resp.json({
            "username":sqlres.username,
            "birth":sqlres.birth,
            "major":sqlres.marjor,
            "process":sqlres.process,
            "ravenScore": sqlres.ravenScore,
           
            "remNum": recordsres.remNum,
            "hanoiSteps": recordsres.hanoiSteps,
            "hanoiSeconds": recordsres.hanoiSeconds,
            "mathQue": mathQue,
            "cardStar": response.cardStar
        });
    } else {
        resp.json({
            "username":sqlres.username,
            "birth":sqlres.birth,
            "major":sqlres.marjor,
            "process":sqlres.process,
            "ravenScore": sqlres.ravenScore
        });
    }  
})


module.exports = router;
