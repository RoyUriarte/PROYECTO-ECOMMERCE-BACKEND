const { Pool } = require("pg");   // Importar la clase Pool de pg
require('dotenv').config();       // Para acceder a las variables de entorno

// Crear una nueva instancia de Pool para la conexión a la base de datos
const pgPool = new Pool({
    user: process.env.DB_USER,    // Usuario de la base de datos
    host: process.env.DB_HOST,    // Dirección del servidor de la base de datos
    database: process.env.DB_NAME, // Nombre de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos
    port: process.env.DB_PORT,    // Puerto de PostgreSQL (por defecto 5432)
});

module.exports = pgPool;  // Exportar para usarla en otros archivos
