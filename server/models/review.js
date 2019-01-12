'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return Review;
};