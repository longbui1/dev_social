'use strict';

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: HOST_MAIL,
    port: PORT_MAIL,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
});

exports.sendMail = async (to, subject, urlVerify, code) => {
    await transporter.sendMail({
        from: 'HUHA APP',
        to,
        subject,
        html: `
        <p>Mail này được sử dụng để kích hoạt tài khoản. Mail này chỉ có giá trị trong 10 phút</p>
        <h1>${code}</h1>
        <a href="${urlVerify}" target="_blank">            
                Active
        </a>`,
    });
};
