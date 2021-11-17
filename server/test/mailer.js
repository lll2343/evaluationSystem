//引用 nodemailer
var nodemailer = require('nodemailer');

//  账号密码
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'createsfortest@gmail.com',
        pass: 'TEST1234'
    }
});

var options = {
    //寄件者
    from: 'createsfortest@gmail.com',
    //收件者
    to: '842072589@qq.com', 
    //副本
    cc: '842072589@qq.com',
    //密件副本
    bcc: '842072589@qq.com',
    //主旨
    subject: 'Verification Code TEST', // Subject line
    //純文字
    text: 'Hello world2', // plaintext body
    //嵌入 html 的內文
    html: '<h2>TEST FROM NODEJS</h2>', 
    //附件檔案
    attachments: [ {
        filename: 'ATTACHMENTTEST.txt',
        content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
    }]
};

//發送信件方法
transporter.sendMail(options, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('邮件发送: ' + info.response);
    }
});