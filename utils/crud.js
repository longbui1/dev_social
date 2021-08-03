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

exports.update=async(index,id,body)=>{
    try {
        let data=await  model[index].updateOne(
            {_id:id},
            {...body}
        )
        return {data}
    } catch (error) {
        console.log('error', error);
        return false;
    }
}

exports.getDetail=async (index,id)=>{
    try {
        let data=await model[index].findById(id);
        return data
    } catch (error) {
        console.log('error', error);
        return false;
    }
}
