//引用 nodemailer
var nodemailer = require('nodemailer');

//  账号密码
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ruchencreatefortest@gmail.com',
        pass: 'RUCHENtest'
    }
});

//發送信件方法 
const mailTrans = async (options) => {
    return new Promise(async (resolve,reject)=>{
        transporter.sendMail(options, function(error, info){
            if(error){
                reject(error)
            }else{
                resolve(info.response)
            }
        });
    })
};

module.exports = {
    mailTrans
}
