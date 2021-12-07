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

// router.post('/', checkLogin);

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

    let sql = ` select username,birth,marjor,process from users where mail='${mail}'; `;
    console.log(sql);

    let sqlres = await dbs.QueryOne(sql);
    console.log(sqlres);

    resp.json({
        "username":sqlres.username,
        "birth":sqlres.birth,
        "major":sqlres.marjor,
        "process":sqlres.process
    });
})


module.exports = router;
