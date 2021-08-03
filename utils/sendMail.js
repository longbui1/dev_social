'use strict';

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host:process.env. HOST_MAIL,
    port: process.env.PORT_MAIL,
    secure: false,
    tls:{
        rejectUnauthorized:false
    },
    auth: {
        // type: 'OAuth2',
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD_EMAIL, // generated ethereal password
    },
});

exports.sendMail = async function (to, subject, urlVerify, code) {
    // console.log(subject+"\n"+ urlVerify+"\n"+code)
    await transporter.sendMail({
        from: 'HUHA APP',
        to,
        // subject,
        // html: `
        // <p>Mail này được sử dụng để kích hoạt tài khoản. Mail này chỉ có giá trị trong 10 phút</p>
        // <h1>${code}</h1>
        // <a href="${urlVerify}" target="_blank">            
        //         Active
        // </a>`,
    });
};
