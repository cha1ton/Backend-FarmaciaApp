const express = require('express');
const router = express.Router();
const TipoMedic = require('../models/TipoMedic');

// Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const tipos = await TipoMedic.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un tipo por ID
router.get('/:id', async (req, res) => {
  try {
    const tipo = await TipoMedic.findByPk(req.params.id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo no encontrado' });
    }
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo tipo
router.post('/', async (req, res) => {
  try {
    const tipo = await TipoMedic.create(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un tipo
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await TipoMedic.update(req.body, {
      where: { CodTipoMed: req.params.id }
    });
    if (updated) {
      const updatedTipo = await TipoMedic.findByPk(req.params.id);
      res.json(updatedTipo);
    } else {
      res.status(404).json({ message: 'Tipo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un tipo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await TipoMedic.destroy({
      where: { CodTipoMed: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Tipo eliminado' });
    } else {
      res.status(404).json({ message: 'Tipo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;