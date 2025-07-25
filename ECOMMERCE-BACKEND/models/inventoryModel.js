// models/inventoryModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeClient');

// No hay tabla separada para inventario; se basa en los productos
const Product = require('./productModel');

module.exports = {
  /**
   * Obtener todo el inventario: lista de productos con id, nombre y stock
   */
  getInventory: async () => {
    return await Product.findAll({
      attributes: ['id', 'nombre', 'stock']
    });
  },

  /**
   * Actualizar el stock de un producto
   * @param {number} productoId
   * @param {number} nuevoStock
   */
  updateStock: async (productoId, nuevoStock) => {
    const [affectedCount, [updatedProduct]] = await Product.update(
      { stock: nuevoStock },
      { where: { id: productoId }, returning: true }
    );
    return affectedCount ? updatedProduct : null;
  },

  /**
   * Descontar stock al confirmar un pedido
   * @param {number} productoId
   * @param {number} cantidad
   */
  decrementStock: async (productoId, cantidad) => {
    const product = await Product.findByPk(productoId);
    if (!product || product.stock < cantidad) return null;
    product.stock -= cantidad;
    await product.save();
    return product;
  },

  /**
   * Verificar stock disponible de un producto
   * @param {number} productoId
   */
  checkStock: async (productoId) => {
    const product = await Product.findByPk(productoId);
    return product ? product.stock : null;
  }
};
