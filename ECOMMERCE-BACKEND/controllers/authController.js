require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels'); // Sequelize model

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || JWT_SECRET;
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';


let refreshTokens = [];
/**
 * Registro de usuario
 */
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    // Verificar email único
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }
    // Hashear contraseña
    const hash = await bcrypt.hash(password, 10);
    // Crear usuario
    const user = await User.create({ nombre, email, password: hash, rol });

    // Generar tokens incluyendo el rol en el payload
    const accessToken = jwt.sign(
      { id: user.id, role: user.rol },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.rol },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_EXPIRES_IN }
    );
    refreshTokens.push(refreshToken);

    res.status(201).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Login de usuario
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    // Comparar contraseñas
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar tokens incluyendo el rol en el payload
    const accessToken = jwt.sign(
      { id: user.id, role: user.rol },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.rol },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_EXPIRES_IN }
    );
    refreshTokens.push(refreshToken);

    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Obtener perfil de usuario (protegido)
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Actualizar perfil de usuario
 */
exports.updateProfile = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const hash = password ? await bcrypt.hash(password, 10) : user.password;
    const [count, [updated]] = await User.update(
      { nombre: nombre || user.nombre, email: email || user.email, password: hash },
      { where: { id: user.id }, returning: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Eliminar cuenta de usuario
 */
exports.deleteAccount = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.user.id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Cuenta eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Renovar Access Token usando Refresh Token
 */
exports.refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(401).json({ message: 'Refresh token no válido' });
  }
  try {
    const { id } = jwt.verify(token, JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: 'Refresh token expirado o inválido' });
  }
};

/**
 * Logout: revocar Refresh Token
 */
exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(rt => rt !== token);
  res.json({ message: 'Logout exitoso' });
};