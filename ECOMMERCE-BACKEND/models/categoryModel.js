// models/categoryModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeClient');

// Definición del modelo Categoría
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
    }, {
    tableName: 'categorias',
    timestamps: false
    }
);

module.exports = Category;
