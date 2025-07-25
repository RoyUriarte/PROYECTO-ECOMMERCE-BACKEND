const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeClient');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'categorias',
        key: 'id'
        }
    }
    }, 
    {
    tableName: 'productos',
    timestamps: false
    }
);

module.exports = Product;