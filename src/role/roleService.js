const Role = require('../../models/role');

module.exports = {
    create: async (body) => {
        let role = await new Role({
            ...body,
            createdAt: new Date().toISOString(),
            status: true,
        });
        try {
            const data = await role.save();
            return { data };
        } catch (error) {
            console.log(error);
        }
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
