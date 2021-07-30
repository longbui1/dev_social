// const tryCatch = require('../../utils/tryCatch');
const userService = require('../user/userService');
const roleService = require('../role/roleService');
// const authError = require('../../lang/user.json').en.auth;
const authError = require('../../lang/auth.json').en;
const { decryptString, issueToken } = require('../../utils/auth');

module.exports = {
    login: async (req, res) => {
        let { email, password } = req.body;
        let resp = { status: true, data: {} };
        // check null
        if (!email || !password) {
            return res
                .status(403)
                .json({ status: false, data: authError.info_not_found });
        }
        //check email is exit
        let { user } = await userService.getEmail(email);
        if (!user) {
            return res
                .status(403)
                .json({ status: false, data: authError.email_not_exist });
        }
        //decryptPassword and check
        let decryptPassword = decryptString(user.password);
        if (password !== decryptPassword) {
            return res
                .status(403)
                .json({ status: false, data: authError.wrong_password });
        }
        // check roleId
        let { role } = await roleService.getRoleId(user.roleId);
        if (!role) {
            return res
                .status(403)
                .json({ status: false, data: authError.role_not_exist });
        }
        // create token
        let jwt = issueToken(user.id, user.email, role.title);

        resp.data = {
            id: user.id,
            email: user.email,
            role: role.title,
            token: jwt,
        };
        res.status(200).json(resp);
    },
    register: async (req, res) => {
        let { email, password, passwordConfirm } = req.body;
        let resp = { status: true, data: {} };
        //check null
        if (!email || !password || !passwordConfirm) {
            return res.status(403).json({
                status: false,
                data: authError.info_not_found,
            });
        }
        //check pass and pass confirm
        if (password !== passwordConfirm) {
            return res.status(403).json({
                status: false,
                data: authError.password_not_match_passwordConfirm,
            });
        }
         //check email is exit
         let { user } = await userService.getEmail(email);
         if (user) {
             return res
                 .status(403)
                 .json({ status: false, data: authError.email_exist });
         }
        //  let { role } = await roleService.getRoleId(user.roleId);
        // if (!role) {
        //     return res
        //         .status(403)
        //         .json({ status: false, data: authError.role_not_exist });
        // }

        let { data } = await userService.create({
            email,
            password,
            // roleId: role[0].id,
            verifyAccount: false,
            status: true,
          });
          resp.data = {
            // checkEmail: errUser.register_success,
            userId: data.id,
            // tokenActive: tokenActive,
          };
          res.json(resp);

    },
};
