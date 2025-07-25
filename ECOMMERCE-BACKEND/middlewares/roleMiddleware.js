/**
 * Middleware para verificar roles de usuario
 * @param  {...string} allowedRoles - Lista de roles permitidos
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
    }
    next();
  };
}

module.exports = { authorizeRoles };