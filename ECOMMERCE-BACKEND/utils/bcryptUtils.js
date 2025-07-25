const bcrypt = require('bcrypt');

/**
 * Hashear una contraseña
 * @param {string} password
 * @returns {Promise<string>} hash
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Comparar texto plano con hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePassword };