const Sequlize = require('sequelize');
require('dotenv').config();
// Let's define a sequlize instance to connect to our database.
const sequelize = new Sequlize("node_app_01","root","root",{
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306'
});

module.exports = sequelize;