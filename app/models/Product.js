const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Product extends Sequelize.Model {}

  Product.init({
    ref :{
     type : DataTypes.STRING,
     allowNull : false
    },
    title: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false
    },
    image : {
      type : DataTypes.STRING,
      allowNull : false
    },
    price : {
      type : DataTypes.INTEGER,
      allowNull : false
    }    
  }, {
    sequelize,
    tableName: 'products'
  })
/**
 * Voici les champs nécessaires pour faire le Model
 * category_id int
 * ref string
 * attr string
 * image string
 * metaDescription string
 * title string
 * description text
 * excerpt string
 * priceHT number
 * tableName: 'products',
 */

module.exports = Product;
