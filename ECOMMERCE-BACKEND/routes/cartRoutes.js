const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Crear un carrito vacío para el usuario autenticado
router.post('/', verifyToken, cartController.createCart);

// Obtener el carrito del usuario autenticado
router.get('/', verifyToken, cartController.getCartByUser);

// Añadir un producto al carrito
router.post('/item', verifyToken, cartController.addItem);

// Actualizar la cantidad de un producto en el carrito
router.put('/item', verifyToken, cartController.updateItemQuantity);

// Eliminar un producto del carrito
router.delete('/item/:producto_id', verifyToken, cartController.removeItem);

// Vaciar o eliminar completamente el carrito
router.delete('/', verifyToken, cartController.deleteCart);

module.exports = router;