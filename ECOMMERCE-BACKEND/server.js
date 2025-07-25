// server.js
require('dotenv').config();
const express = require("express");


// Importar rutas
const authRoutes       = require("./routes/authRoutes");
const productRoutes    = require("./routes/productRoutes");
const categoryRoutes   = require("./routes/categoryRoutes");
const cartRoutes       = require("./routes/cartRoutes");
const orderRoutes      = require("./routes/orderRoutes");
const inventoryRoutes  = require("./routes/inventoryRoutes"); 



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());



// sequelize.sync();

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
