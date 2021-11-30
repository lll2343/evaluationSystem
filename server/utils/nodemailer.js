const nodemailer = require('nodemailer')


/**
 * @function mailSend 发送邮件服务
 * @param {String} mail 收件人
 * @param {String} subject 邮件主题
 * @param {String} strhtml 邮件正文内容
 * @returns 
 */
const mailSend = async (mail, subject, strhtml) => {
    return new Promise(async (resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.163.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'createsfortest@163.com', // generated ethereal user
                pass: 'WYVFQTELVUENCOVO' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'createsfortest@163.com', // sender address
            to: mail, // list of receivers
            subject: subject, // Subject line
            // html: '<b>您的验证码为</b>' // html body
            html: strhtml
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log('发送邮件错误',error);
                reject(error);
            } else {
                console.log('info',info);
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                resolve(info);
            }
        });
    })
}

module.exports = {
    mailSend
}