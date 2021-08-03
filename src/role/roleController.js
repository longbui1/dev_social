const roleService = require('./roleService');
const roleError = require('../../lang/role.json').en;
const authError=require('../../lang/auth.json').en;

const Role = require('../../models/role');

module.exports = {
    createRole: async (req, res) => {
        let { title, level } = req.body;
        if (!title || !level) {
            return res
                .status(403)
                .json({ status: false, data: roleError.info_not_found });
        }
        let resp = { status: true, data: {} };
        let { data } = await roleService.create({
            title,
            level,
        });

        resp.data = {
            title: data.title,
            level: data.level,
            status: data.status,
        };
        res.json(resp);
    },
    getRole: async (req, res) => {
        // try {
        //     const role = await Role.findById(req.params.roleId);
        //     res.json(role);
        // } catch (error) {
        //     console.log(error);
        // }
    },
    getListRole: async (req, res) => {
        let { title, status, limit, offset } = req.query;
        let resp = { status: true, data: {} };

        let { total, list } = await roleService.getAll({
            title,
            status,
            limit,
            offset,
        });

        resp.data = { total, list };
        res.status(200).json(resp);
    },
    updateRole:async (req,res)=>{
        let  {id}  = req.params;
        let { title, level, status } = req.body;
        if (!title || !level || !status) {
            return res
              .status(403)
              .json({ status: false, data: roleError.info_update_not_found });
          }

        let role = await roleService.getOne(id);
            if (!role) {
            return (
                res
                .status(400)
                .json({ status: false, data:roleError.role_not_found })
            );
            }

          let result = await roleService.update(id, {
            title,
            level,
            status,
            // updatedBy: req.auth.account_id,
          });
          if (!result) {
            return (
              res
                .status(400)
                .json({ status: false, data:authError.account_not_found })
            );
          }
      res.status(204).json();
    }
};
