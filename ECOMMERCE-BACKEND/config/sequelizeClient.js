// config/sequelizeClient.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nombre de la BD
  process.env.DB_USER,       // Usuario
  process.env.DB_PASSWORD,   // Contraseña
  {
    host: process.env.DB_HOST,   // Host (localhost o IP)
    port: process.env.DB_PORT,   // Puerto (5432 por defecto)
    dialect: 'postgres',
    logging: false,              // Desactivar logs SQL en consola
    define: {
      timestamps: false,         // No agregar campos createdAt/updatedAt automáticamente
      underscored: true          // Usar snake_case en lugar de camelCase
    }
  }
);

module.exports = sequelize;
