const User = require('../../models/user');

module.exports = {
    create: async (body) => {
        let user = await new User({
            ...body,
            createdAt: new Date().toISOString(),
            status: true,
        });
        try {
            const data = await user.save();
            return { data };
        } catch (error) {
            console.log(error);
        }
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
