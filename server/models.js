const Sequelize = require('sequelize');
const sequelize = require('./connection');

module.exports = {
  User: sequelize.define('user', {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      registration_date: {
        type: Sequelize.DATE
      }
    },
    { timestamps: false }
  ),
  sequelize
}