const Product = require('../models/productModel');

// Listar todos los productos: GET /api/products
exports.list = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un producto por ID: GET /api/products/:id
exports.getOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto: POST /api/products
exports.create = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    const newProduct = await Product.create({ nombre, descripcion, precio, stock, categoria_id });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto: PUT /api/products/:id
exports.update = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    const [updatedCount, [updatedProduct]] = await Product.update(
      { nombre, descripcion, precio, stock, categoria_id },
      { where: { id: req.params.id }, returning: true }
    );
    if (!updatedCount) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un producto: DELETE /api/products/:id
exports.remove = async (req, res) => {
  try {
    const deletedCount = await Product.destroy({ where: { id: req.params.id } });
    if (!deletedCount) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
