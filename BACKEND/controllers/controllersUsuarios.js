const usuarios = require('../usuarios.json');

const controllersUsuarios = (req, res) => {
    res.json(usuarios);
};

module.exports = controllersUsuarios;