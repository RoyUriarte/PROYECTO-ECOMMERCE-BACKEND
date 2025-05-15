const productos = require('../productos.json');

const controllersProductos = (req, res) => {
    res.json(productos);
};

module.exports = controllersProductos;