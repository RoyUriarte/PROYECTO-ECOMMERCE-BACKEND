const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

/**
 * Generar Access Token
 */
function generateAccessToken(payload, expiresIn = '15m') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Generar Refresh Token
 */
function generateRefreshToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_REFRESH_SECRET || JWT_SECRET, { expiresIn });
}

/**
 * Verificar token
 */
function verifyToken(token, isRefresh = false) {
  const secret = isRefresh ? (process.env.JWT_REFRESH_SECRET || JWT_SECRET) : JWT_SECRET;
  return jwt.verify(token, secret);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };