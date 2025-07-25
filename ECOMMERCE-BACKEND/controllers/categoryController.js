const Category = require('../models/categoryModel');

/**
 * Listar todas las categorías: GET /api/categories
 */
exports.list = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Obtener una categoría por ID: GET /api/categories/:id
 */
exports.getOne = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Crear una nueva categoría: POST /api/categories
 */
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const newCategory = await Category.create({ nombre });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Actualizar una categoría: PUT /api/categories/:id
 */
exports.update = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [updatedCount, [updatedCategory]] = await Category.update(
      { nombre },
      { where: { id: req.params.id }, returning: true }
    );
    if (!updatedCount) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Eliminar una categoría: DELETE /api/categories/:id
 */
exports.remove = async (req, res) => {
  try {
    const deletedCount = await Category.destroy({ where: { id: req.params.id } });
    if (!deletedCount) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};