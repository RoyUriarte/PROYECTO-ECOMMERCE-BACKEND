const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeClient');

// Definición del modelo Pedido
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'usuarios',
        key: 'id'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pendiente'
    }
    }, 
    {
    tableName: 'pedidos',
    timestamps: false
    }
);

module.exports = Order;