const Sequlize = require('sequelize');
require('dotenv').config();
// Let's define a sequlize instance to connect to our database.
const sequelize = new Sequlize(process.env.DB_NAME || "result_management","root","root",{
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306'
});

module.exports = sequelize;
