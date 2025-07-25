const Order = require('../models/orderModel');
const OrderDetail = require('../models/orderDetailModel');
const Cart = require('../models/cartModel');
const inventoryModel = require('../models/inventoryModel');

/**
 * Crear un nuevo pedido para un usuario con sus items
 */
exports.create = async (req, res) => {
  const { usuario_id, items, carrito_id } = req.body;
  try {
    // 1) Crear pedido (estado por defecto 'pendiente')
    const order = await Order.create({ usuario_id });

    // 2) Agregar detalles y descontar stock por cada item
    for (const { producto_id, cantidad, precio_unitario } of items) {
      await OrderDetail.create({
        pedido_id: order.id,
        producto_id,
        cantidad,
        precio_unitario
      });
      await inventoryModel.decrementStock(producto_id, cantidad);
    }

    // 3) Vaciar carrito completo
    await Cart.deleteCart(carrito_id);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Listar todos los pedidos de un usuario: GET /api/orders/user/:usuario_id
 */
exports.listByUser = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { usuario_id: req.params.usuario_id },
      include: [{ model: OrderDetail, as: 'items' }]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Actualizar estado de un pedido: PUT /api/orders/:id/status
 */
exports.updateStatus = async (req, res) => {
  try {
    const [updatedCount, [updatedOrder]] = await Order.update(
      { estado: req.body.estado },
      { where: { id: req.params.id }, returning: true }
    );
    if (!updatedCount) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};