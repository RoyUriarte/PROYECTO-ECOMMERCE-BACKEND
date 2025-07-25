// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', categoryController.list);
router.get('/:id', categoryController.getOne);

// Rutas protegidas (solo admin puede modificar categorías)
router.post('/', verifyToken, authorizeRoles('admin'), categoryController.create);
router.put('/:id', verifyToken, authorizeRoles('admin'), categoryController.update);
router.delete('/:id', verifyToken, authorizeRoles('admin'), categoryController.remove);

module.exports = router;