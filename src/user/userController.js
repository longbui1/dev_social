const userService = require('./userService');
const roleError = require('../../lang/role.json').en;
const userError = require('../../lang/user.json').en;
const CryptoJS = require('crypto-js');
const { salt } = require('../../config/config.json').app;

module.exports = {
    createUser: async (req, res) => {
        let { email, password, passwordConfirm, fullName, roleId } = req.body;
        //check info null
        if (!email || !password || !passwordConfirm || !fullName || !roleId) {
            return res
                .status(403)
                .json({ status: false, data: userError.info_not_found });
        }
        //check password match passwordConfirm
        if (password !== passwordConfirm) {
            return res.status(403).json({
                status: false,
                data: userError.password_not_match_passwordConfirm,
            });
        }

        let resp = { status: true, data: {} };
        // hash password
        password = CryptoJS.AES.encrypt(password, salt).toString();

        let { data } = await userService.create({
            email,
            password,
            fullName,
            roleId,
        });
        resp.data = {
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            status: data.status,
        };
        res.json(resp);
    },
};
