const roleService = require('./roleService');
const roleError = require('../../lang/role.json').en;

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
    //
    getRole: async (req, res) => {
        try {
            const role = await Role.findById(req.params.roleId);
            res.json(role);
        } catch (error) {
            console.log(error);
        }
    },
};
