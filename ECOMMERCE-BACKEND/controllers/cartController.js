const Cart = require('../models/cartModel');
const inventoryModel = require('../models/inventoryModel');

/**
 * Crear un carrito vacío para un usuario
 * POST /api/cart
 */
exports.createCart = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    const cart = await Cart.createCart(usuario_id);
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Obtener el carrito de un usuario
 * GET /api/cart/user/:usuario_id
 */
exports.getCartByUser = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const cart = await Cart.getCartByUser(usuario_id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no existe' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Añadir un item al carrito
 * POST /api/cart/item
 */
exports.addItem = async (req, res) => {
  try {
    const { carrito_id, producto_id, cantidad, precio_unitario } = req.body;
    // Verificar stock disponible
    const stock = await inventoryModel.checkStock(producto_id);
    if (stock === null) {
      return res.status(404).json({ message: 'Producto no existe' });
    }
    if (stock < cantidad) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }
    const item = await Cart.addItemToCart(carrito_id, producto_id, cantidad, precio_unitario);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Actualizar cantidad de un item específico
 * PUT /api/cart/item
 */
exports.updateItemQuantity = async (req, res) => {
  try {
    const { carrito_id, producto_id, cantidad } = req.body;
    const updated = await Cart.updateItemQuantity(carrito_id, producto_id, cantidad);
    if (!updated) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Eliminar un item del carrito
 * DELETE /api/cart/item/:carrito_id/:producto_id
 */
exports.removeItem = async (req, res) => {
  try {
    const { carrito_id, producto_id } = req.params;
    const removed = await Cart.removeItemFromCart(parseInt(carrito_id), parseInt(producto_id));
    if (!removed) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    res.json(removed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Eliminar completamente el carrito
 * DELETE /api/cart/:carrito_id
 */
exports.deleteCart = async (req, res) => {
  try {
    const { carrito_id } = req.params;
    const deleted = await Cart.deleteCart(parseInt(carrito_id));
    if (!deleted) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json({ message: 'Carrito eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
