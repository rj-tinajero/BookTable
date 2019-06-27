'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.NUMERIC(12,2),
      allowNull: true
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};