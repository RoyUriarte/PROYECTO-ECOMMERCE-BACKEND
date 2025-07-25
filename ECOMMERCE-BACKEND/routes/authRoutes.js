const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/authMiddleware');


// Rutas públicas
router.post('/register', authController.register);
router.post('/login',    authController.login);
router.post('/refresh',  authController.refreshToken);
router.post('/logout',   authController.logout);

// Rutas protegidas
router.get('/profile',  verifyToken, authController.getProfile);
router.put('/profile',  verifyToken, authController.updateProfile);
router.delete('/profile', verifyToken, authController.deleteAccount);

module.exports = router;