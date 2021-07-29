const model = require('../models/index');

exports.create = async (index, body) => {
    const role = await new model[index]({
        ...body,
    });
    try {
        const data = await role.save();
        return { data };
    } catch (error) {
        console.log(error);
    }
};
