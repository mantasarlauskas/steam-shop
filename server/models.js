const Sequelize = require('sequelize');
const sequelize = require('./connection');

exports.User = sequelize.define('user', {
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
    },
    role: {
      type: Sequelize.INTEGER
    },
    isBanned: {
      type: Sequelize.INTEGER
    }
  },
  { timestamps: false }
);

exports.Product = sequelize.define('product', {
    title: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    logo: {
      type: Sequelize.STRING
    },
    count: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  },
  { timestamps: false }
);

exports.Key = sequelize.define('steam-key', {
    game_id: {
      type: Sequelize.INTEGER
    },
    steam_key: {
      type: Sequelize.STRING
    }
  },
  { timestamps: false }
);