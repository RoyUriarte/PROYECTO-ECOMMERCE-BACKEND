const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeClient');
const OrderDetail = require('./orderDetailModel');

// Definición del modelo Carrito
const Cart = sequelize.define('Cart', {
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
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
    }, 
    {
    tableName: 'carrito',
    timestamps: false
    }
);

// Métodos estáticos para gestión del carrito

/**
 * Crear un carrito vacío para un usuario
 */
Cart.createCart = async (usuario_id) => {
  return await Cart.create({ usuario_id });
};

/**
 * Obtener el carrito de un usuario, junto a sus items
 */
Cart.getCartByUser = async (usuario_id) => {
  return await Cart.findOne({
    where: { usuario_id },
    include: [{ model: OrderDetail, as: 'items' }]
  });
};

/**
 * Añadir un producto o actualizar cantidad si ya existe
 */
Cart.addItemToCart = async (carrito_id, producto_id, cantidad, precio_unitario) => {
  let item = await OrderDetail.findOne({
    where: { pedido_id: carrito_id, producto_id }
  });
  if (item) {
    item.cantidad += cantidad;
    item.precio_unitario = precio_unitario;
    await item.save();
    return item;
  }
  return await OrderDetail.create({ pedido_id: carrito_id, producto_id, cantidad, precio_unitario });
};

/**
 * Actualizar solo la cantidad de un item específico
 */
Cart.updateItemQuantity = async (carrito_id, producto_id, cantidad) => {
  const [_, [updated]] = await OrderDetail.update(
    { cantidad },
    { where: { pedido_id: carrito_id, producto_id }, returning: true }
  );
  return updated || null;
};

/**
 * Eliminar un item del carrito
 */
Cart.removeItemFromCart = async (carrito_id, producto_id) => {
  const item = await OrderDetail.findOne({
    where: { pedido_id: carrito_id, producto_id }
  });
  if (!item) return null;
  await item.destroy();
  return item;
};

/**
 * Eliminar completamente el carrito y sus items
 */
Cart.deleteCart = async (carrito_id) => {
  // Eliminar items primero
  await OrderDetail.destroy({ where: { pedido_id: carrito_id } });
  // Luego eliminar carrito
  const cart = await Cart.findByPk(carrito_id);
  if (!cart) return null;
  await cart.destroy();
  return cart;
};

module.exports = Cart;