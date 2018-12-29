'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    key_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.Order, {foreignKey: 'order_id'});
  };
  return Cart;
};