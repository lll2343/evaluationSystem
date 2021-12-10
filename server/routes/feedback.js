const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');

router.post('/',async(req,resp)=>{
    let {mail,content} = req.body;
    let sql = `insert into feedback(mail,content) values ('${mail}','${content}')`;
    let sqlres = await dbs.Run(sql);
    if(sqlres.success){
        resp.json({
            'success':true
        })
    } else {
        resp.json({
            'success':false
        })
    }
})

module.exports = router;