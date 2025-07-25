const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
//const { authorizeRoles } = require("../middlewares/roleMiddleware");

// Rutas públicas
router.get('/', productController.list);
router.get('/:id', productController.getOne);

// Rutas protegidas (solo admin puede crear, actualizar y eliminar productos)
router.post('/', verifyToken, authorizeRoles('admin'), productController.create);
router.put('/:id', verifyToken, authorizeRoles('admin'), productController.update);
router.delete('/:id', verifyToken, authorizeRoles('admin'), productController.remove);

module.exports = router;