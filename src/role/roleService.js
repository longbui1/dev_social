const Role = require('../../models/role');
const crud = require('../../utils/crud');
const index = require('../../config/config.json').local.database.index.role;

module.exports = {
    create: async (body) => {
        let { data } = await crud.create(index, {
            ...body,
            createdAt: new Date().toISOString(),
            status: true,
        });
        return { data };
    },
    getRoleId: async (roleId) => {
        try {
            const role = await Role.findOne({ _id: roleId });
            return { role };
        } catch (error) {
            console.log(error);
        }
    },
};
