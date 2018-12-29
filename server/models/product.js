'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    logo: DataTypes.STRING,
    description: DataTypes.STRING,
    likeCount: DataTypes.INTEGER,
    dislikeCount: DataTypes.INTEGER,
    timesBought: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Key, {
      foreignKey: 'game_id',
      sourceKey: 'id'
    });
  };
  return Product;
};