var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./lib.db');

/**
 * @function queryByPhone 根据手机号查询账号和密码
 * @param {String} phone 
 * @returns 
 */
const queryByPhone = async (phone) => {
    return new Promise(async (resolve, reject) => {
        let sql = `select phone,iv,content from users where phone = '${phone}' `
        console.log(sql)
        db.all(sql, function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

const insertUser = async (phone, iv, content) => {
    return new Promise(async (resolve, reject) => {
        let sql = `insert into users(phone,iv,content) values ('${phone}','${iv}','${content}') `
        console.log(sql)
        db.run(sql, (err) => {
            if (err == null)
                resolve(true)
            else
                reject(err)
        })
    })
}

module.exports = {
    queryByPhone,
    insertUser
}