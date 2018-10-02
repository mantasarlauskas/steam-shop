const Sequelize = require('sequelize');

module.exports = new Sequelize({
  host: 'www.db4free.net',
  database: 'steamshop',
  username: 'rootrootadminas',
  password: 'rootrootadminas',
  dialect: 'mysql',
  operatorsAliases: false
});