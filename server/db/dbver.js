var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./lib.db');
var timer = require('./../utils/getTime')

const insertVer = async (mail,code) => {
    return new Promise( async (resolve,reject)=>{
        let time = timer.getCurTimeStamp()
        let sql = ` insert into ver(mail,code,time) values ('${mail}','${code}', '${time}')`
        db.run(sql,(err)=>{
            if(err == null)
                resolve(true)
            else
                reject(err)
        })
    })
}

const selectVer = async (mail) => {
    return new Promise(async (resolve,reject)=>{
        let sql = ` select * from ver where mail = '${mail}' `
        console.log(sql)
        db.all(sql,(err,rows)=>{
            if(err)
                reject(err)
            else
                resolve(rows)
        })
    })
}

module.exports = {
    insertVer,
    selectVer
}