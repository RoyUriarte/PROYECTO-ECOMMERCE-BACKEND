// models/orderDetailModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeClient');

// Definición del modelo DetallePedido
const OrderDetail = sequelize.define('OrderDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'pedidos',
        key: 'id'
        }
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'productos',
        key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
    }, 
    {
    tableName: 'detalles_pedido',
    timestamps: false
    }
);

module.exports = OrderDetail;
