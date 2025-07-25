// routes/orderRoutes.js
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/inventoryController'); // tu controller de pedidos
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// 1) Crear un nuevo pedido (POST /api/orders)
router.post('/', verifyToken, orderController.create);

// 2) Listar todos los pedidos de un usuario (GET /api/orders/user/:usuario_id)
router.get('/user/:usuario_id', verifyToken, orderController.listByUser);

// 3) Actualizar estado de un pedido (PUT /api/orders/:id/status)
router.put('/:id/status', verifyToken, authorizeRoles('admin'), orderController.updateStatus);

module.exports = router;
