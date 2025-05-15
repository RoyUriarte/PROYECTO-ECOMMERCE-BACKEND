const express = require('express'); //Importa el paquete instalado de express
const  app = express();
require('dotenv').config();
const rutasProductos = require('./routes/rutasProductos');
const rutasUsuarios = require('./routes/rutasUsuarios');


const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Iniciando mi servidor");
})

app.use('/productos', rutasProductos);
app.use('/productos', rutasUsuarios);

app.listen(PORT, () => {
    console.log("Servidor va a salir por el puerto", PORT);
}) 