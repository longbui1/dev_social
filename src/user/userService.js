const User = require('../../models/user');
const crud = require('../../utils/crud');
const index = require('../../config/config.json').local.database.index.user;

module.exports = {
    create: async (body) => {
        let { data } = await crud.create(index, {
            ...body,
            createdAt: new Date().toISOString(),
            status: true,
        });
        return { data };
    },
    getEmail: async (email) => {
        try {
            const user = await User.findOne({ email: email });
            return { user };
        } catch (error) {
            console.log(error);
        }
    },
};
