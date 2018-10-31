const Sequelize = require('sequelize');

module.exports = new Sequelize({
  host: 'localhost',
  database: 'steamshop',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
  operatorsAliases: false
});