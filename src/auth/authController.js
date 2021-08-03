
const userService = require('../user/userService');
const roleService = require('../role/roleService');
// const authError = require('../../lang/user.json').en.auth;
const authError = require('../../lang/auth.json').en;
const {encryptString, decryptString, issueToken } = require('../../utils/auth');
const { sendMail } = require("../../utils/sendMail");

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
        let  role  = await roleService.getOne(user.roleId);
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
        let { fullName,email, password, passwordConfirm } = req.body;
        let resp = { status: true, data: {} };
        //check null
        if (!fullName||!email || !password || !passwordConfirm) {
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
        //  console.log(user.roleId)
        //  let  role  = await roleService.getOne(user.roleId);
        // if (!role) {
        //     return res
        //         .status(403)
        //         .json({ status: false, data: authError.role_not_exist });
        // }
        password = encryptString(password);
        let { data } = await userService.create({
            fullName,
            email,
            password,
            // roleId: role[2].id,
            verifyAccount: false,
            status: true,
          });
        let timeActive = (Date.now() + 600000).toString();
        let code = Math.floor(100000 + Math.random() * 900000);
        let tokenActive = encryptString(
        JSON.stringify({ code, expired: timeActive, userId:data.id })
        );
        // let urlActive =`${data.id}/TokenActive/${tokenActive}`;
        
        // // send email
        // sendMail(
        //     email,
        //     authError.subject_mail_active_account.message,
        //     urlActive,
        //     code
        //   );

          resp.data = {
            checkEmail: authError.register_success,
            userId: data.id,
            tokenActive: tokenActive,
            code
          };
          res.json(resp);

    },
};
