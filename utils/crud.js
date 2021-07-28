// const Role = require('../models/role');
const models = require('../models');

exports.create = async (index, body) => {
    console.log(index + '//' + body);
    const role = await new Role({
        body,
    });
    try {
        const data = await role.save();
        console.log(data);
        return { data };
    } catch (error) {
        console.log(error);
    }
};
