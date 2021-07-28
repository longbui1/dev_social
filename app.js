const express = require('express');
const app = express();
// port
require('dotenv').config({ path: __dirname + '/.env' });
// mongodb
const mongodb = require('./libs/mongodb');
mongodb.checkConnection();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//using router
app.use('/auth', require('./src/auth'));
app.use('/role', require('./src/role'));
app.use('/user', require('./src/user'));

app.listen(process.env.PORT || 3000, () => {
    console.log('app listen port:' + process.env.PORT || 3000);
});
