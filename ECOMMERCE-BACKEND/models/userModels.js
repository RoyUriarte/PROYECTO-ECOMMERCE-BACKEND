const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeClient');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'password'
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'cliente'
    },
    creado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'creado_en'
    }
    }, 
    {
    tableName: 'usuarios',
    timestamps: false
    }
);

module.exports = User;