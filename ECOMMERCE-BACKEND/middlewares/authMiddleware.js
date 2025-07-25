const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Verifica que el token JWT sea válido
exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para autorizar roles
exports.authorizeRoles = (...rolesPermitidos) => (req, res, next) => {
  if (!rolesPermitidos.includes(req.user.role)) {
    return res.status(403).json({ message: 'No tienes permiso para esta acción' });
  }
  next();
};
