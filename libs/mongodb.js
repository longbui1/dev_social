const mongoose = require('mongoose');
// dotenv
require('dotenv').config({ path: __dirname + '/.env' });

function checkConnection() {
    try {
        mongoose.connect(
            process.env.CONNECT_DB,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            },
            () => {
                console.log('connect to db');
            }
        );
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    checkConnection,
};
