// const tryCatch = require('../../utils/tryCatch');
const userService = require('../user/userService');
const roleService = require('../role/roleService');
const userError = require('../../lang/user.json').en.auth;
const { decryptString, issueToken } = require('../../utils/auth');

module.exports = {
    login: async (req, res) => {
        let { email, password } = req.body;
        let resp = { status: true, data: {} };
        // check null
        if (!email || !password) {
            return res
                .status(403)
                .json({ status: false, data: userError.info_not_found });
        }
        //check email is exit
        let { user } = await userService.getEmail(email);
        if (!user) {
            return res
                .status(403)
                .json({ status: false, data: userError.email_not_exist });
        }
        //decryptPassword and check
        let decryptPassword = decryptString(user.password);
        if (password !== decryptPassword) {
            return res
                .status(403)
                .json({ status: false, data: userError.wrong_password });
        }
        // check roleId
        let { role } = await roleService.getRoleId(user.roleId);
        if (!role) {
            return res
                .status(403)
                .json({ status: false, data: userError.role_not_exist });
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
};
