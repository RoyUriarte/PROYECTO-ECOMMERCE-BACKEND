const express = require('express');
const router = express.Router();
const controllersUsuarios = require('../controllers/controllersUsuarios');

/* router.get("/", (req, res) => {
    res.send(usuarios)
}); */

router.get("/", controllersUsuarios);

module.exports = router;