const userService = require('./userService');
const roleError = require('../../lang/role.json').en;
const authError = require('../../lang/auth.json').en;
const userError = require('../../lang/user.json').en;
const CryptoJS = require('crypto-js');
const { salt } = require('../../config/config.json').app;
const { decryptString,encryptString } = require('../../utils/auth');
const User=require('../../models/user')

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
    updateUser:async(req,res)=>{
      let {id}=req.params;
      let { fullname, status, roleId } = req.body;
    },
    activeUser: async (req, res) => {
        let { id: userId } = req.params;
        let { code, tokenActive } = req.body;
    
        let user = await userService.getOne(userId);
        if (!user) {
          return res
            .status(400)
            .json({ status: false, data: authError.account_not_found });
        }
        if (!user.status) {
          return res
            .status(400)
            .json({ status: false, data: authError.account_block });
        }
        if (user.verifyAccount) {
          return res.status(400).json({ status: false, data: authError.account_active });
        }
    
        let decyptApiKey = decryptString(tokenActive);
        if (!decyptApiKey) {
          return res.status(400).json({ status: false, data: authError.wrong_token });
        }
        decyptApiKey = JSON.parse(decyptApiKey);
        if (decyptApiKey.expired < Date.now()) {
          return res
            .status(400)
            .json({ status: false, data: authError.expired_token });
        }
        if (decyptApiKey.code != code) {
          return res
            .status(400)
            .json({ status: false, data:authError.wrong_code });
        }
        if (decyptApiKey.userId != userId) {
          return res
            .status(400)
            .json({ status: false, data: authError.not_id_account_active });
        }
    
        await userService.update(userId, { verifyAccount: true });
        res.status(204).json();
      },
      activeUserAgain: async (req, res) => {
        let { email } = req.params;
        let resp = { status: true, data: {} };
    
        let { user } = await userService.getEmail(email);
        if (!user) {
          return res
            .status(400)
            .json({ status: false, data: authError.email_not_exist });
        }
        if (!user.status) {
          return res
            .status(400)
            .json({ status: false, data: authError.account_block});
        }
        if (user.verifyAccount) {
          //check account active and send message
          return res.status(400).json({ status: false, data: authError.account_active });
        }
    
        let timeActive = (Date.now() + 600000).toString();
        let code = Math.floor(100000 + Math.random() * 900000);
        let tokenActive = encryptString(
          JSON.stringify({ code, expired: timeActive ,userId:user.id})
        );
    
        // let urlActive = `${req.protocol}://${domainFE}/users/${user.id}/verify-account/${tokenActive}`;
        // sendMail(
        //   email,
        //   errUser.subject_mail_active_account.message,
        //   urlActive,
        //   code
        // );
        //send message check email and send new response userId and tokenActive
        resp.data = {
          checkEmail: authError.register_success,
          userId: user.id,
          tokenActive: tokenActive,
          code
        };
        res.status(200).json(resp);
      },
      deleteUser:async(req,res)=>{
        try {
          const removeUser=await User.deleteOne({_id:req.params.id});
          res.json(removeUser)
        } catch (error) {
          console.log(error)
        }
      }
};
