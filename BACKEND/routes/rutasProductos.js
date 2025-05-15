const express = require('express');
const router = express.Router();
const controllersProductos = require('../controllers/controllersProductos');

/* router.get("/", (req, res) => {
    res.send(productos)
}); */

router.get("/", controllersProductos);

module.exports = router;