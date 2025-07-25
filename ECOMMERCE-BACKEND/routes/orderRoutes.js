const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Crear un nuevo pedido (checkout)
router.post('/', verifyToken, orderController.create);

// Obtener historial de pedidos del usuario autenticado
router.get('/', verifyToken, orderController.listByUser);

// Actualizar estado de pedido (solo admin)
router.put('/:id/status', verifyToken, authorizeRoles('admin'), orderController.updateStatus);

module.exports = router;