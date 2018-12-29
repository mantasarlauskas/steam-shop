'use strict';
module.exports = (sequelize, DataTypes) => {
  const Key = sequelize.define('Key', {
    game_id: DataTypes.INTEGER,
    steam_key: DataTypes.STRING,
    isUsed:  {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Key.associate = function(models) {
    // associations can be defined here
  };
  return Key;
};