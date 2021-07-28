const CryptoJS = require('crypto-js');
const { salt, sharedSecret } = require('../config/config.json').app;
const jwt = require('jsonwebtoken');

//CryptoJS
exports.encryptString = (string) => {
    CryptoJS.AES.encrypt(string, salt).toString();
};

exports.decryptString = (string) => {
    let bytes = CryptoJS.AES.decrypt(string, salt);
    return bytes.toString(CryptoJS.enc.Utf8);
};

// JWT
exports.issueToken = (accountId, email, role) => {
    const expireDuration = 60 * 60;
    var token = jwt.sign(
        {
            account_id: accountId,
            email: email,
            role: role,
        },
        sharedSecret,
        {
            expiresIn: expireDuration,
        }
    );
    return token;
};
