const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');


/**
 * @function getRavenScore 瑞文测试计算得分
 * @param {Number} rightCount 答对的题目数量
 * @param {Number} age 生日
 * @returns {Number} 最后得分
 */
const getRavenScore = (rightCount, age) => {
    let score = 0;
    // age = Math.round(age*2)/2;
    var scores = [
        [34, 29, 25, 16, 13, 12, 9,],
        [36, 31, 25, 17, 13, 12, 9,],
        [37, 31, 25, 18, 13, 12, 10,],
        [43, 36, 25, 19, 13, 12, 10,],
        [44, 38, 31, 21, 13, 12, 10,],
        [44, 39, 31, 23, 15, 13, 10,],
        [45, 40, 33, 29, 20, 14, 12,],
        [47, 43, 37, 33, 25, 14, 12,],
        [50, 47, 39, 35, 27, 17, 13,],
        [50, 48, 42, 35, 27, 17, 13,],
        [50, 49, 42, 39, 32, 25, 18,],
        [52, 50, 43, 39, 33, 25, 19,],
        [53, 50, 45, 42, 35, 25, 19,],
        [53, 50, 46, 42, 37, 27, 21,],
        [53, 52, 50, 45, 40, 33, 28,],
        [53, 52, 50, 45, 40, 35, 30,],
        [54, 52, 50, 46, 42, 35, 32,],
        [55, 52, 50, 48, 43, 36, 34,],
        [55, 53, 51, 48, 43, 36, 34,],
        [57, 54, 51, 48, 43, 36, 34,],
        [57, 55, 52, 49, 43, 41, 34,],
        [57, 56, 53, 49, 44, 41, 36,],
        [57, 56, 53, 49, 45, 41, 37,],
        [58, 57, 55, 52, 47, 40, 37,],
        [57, 56, 54, 50, 44, 38, 33,],
        [57, 55, 52, 48, 34, 37, 28,],
        [57, 54, 50, 47, 41, 31, 28,],
        [54, 52, 48, 42, 34, 24, 21,],
        [54, 52, 46, 37, 30, 22, 19,],
        [52, 49, 44, 33, 26, 18, 17,]
    ]
    var standradScores = [
        95, 90, 75, 50, 25, 10, 5
    ]
    var ages = [
        5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 20, 30, 40, 50, 60, 70,
    ]
    for (n = ages.length - 1; n >= 0; n--) {
        if (ages[n] <= age) {
            break;
        }
    }
    if (n < 0) {
        throw ("Wrong Age")
    } else {
        var len = scores[n].length;
        var i;
        for (i = 0; i < len; i++) {
            if (scores[n][i] <= rightCount) {
                break;
            }
        }
        score = standradScores[i]
    }
    return score;
}
// console.log(getRavenScore(53, 50))


/**
 * @function getAge 根据出生日期计算年龄
 * @param {Date} 出生日期
 * @returns {NUmber} 年龄
 */
const getAge = (date) => {
    let birthDay = new Date(date)
    let nowDate = new Date()
    let date1 = Date.parse(birthDay)
    let date2 = Date.parse(nowDate)
    let day = Math.ceil((date2 - date1) / (60 * 60 * 1000 * 24))
    let year = Math.floor(day / 365)
    let y = day % 365
    let month = Math.floor(y / 30)
    if (month > 6) {
        return year + 0.5
    } else {
        return year
    }
}

/**
 * @function ghetLevel 计算最后等级
 * @param {Number} score 得分
 * @returns {String} 等级
 */
const getLevel = (score) => {
    if (score >= 95) {
        return '优秀'
    } else if (score >= 75 && score < 95) {
        return '良好'
    } else if (score >= 25 && score < 75) {
        return '中等'
    } else if (score >= 5 && score < 24) {
        return '中下'
    } else {
        return '低下'
    }
}

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
    let { save, time, testList, rightCount } = req.body;

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

/**
 * @function score 最后的得分
 */
router.post('/getscore', async (req, resp) => {
    let mail = req.session.mail;
    let { save, time, testList, rightCount, birth } = req.body;
    let date = new Date(birth).getTime();
    let sql = ` select save,time from raven where mail = '${mail}';`
    let sqlres = await dbs.QueryOne(sql);
    if (typeof (sqlres) == 'undefined') {
        sql = ` insert into raven(save,time,mail,testList,rightCount) 
            values (${save},${time},'${mail}','${testList}',${rightCount}); `
    }
    else {
        sql = ` update raven set save = ${save},time=${time},
            testList='${testList}',rightCount = ${rightCount},birth='${date}'
            where mail = '${mail}'`;
    }
    sqlres = await dbs.Run(sql);

    let age = getAge(date)
    console.log(age)
    console.log(rightCount)
    let score = getRavenScore(rightCount, age);
    console.log('得分', score);
    sql = `update users set ravenScore = ${score} 
        where mail='${mail}'`;
    await dbs.Run(sql);
    let level = getLevel(score);
    console.log(level)
    resp.json({
        'success': true,
        score: score,
        level: level
    })
})


module.exports = router;
