const express = require('express');
const router = express.Router();
const Medicamento = require('../models/Medicamento');

// Obtener todos los medicamentos
router.get('/', async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      include: [{ model: require('../models/TipoMedic') }]
    });
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un medicamento por ID
router.get('/:id', async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id, {
      include: [{ model: require('../models/TipoMedic') }]
    });
    if (!medicamento) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }
    res.json(medicamento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo medicamento
router.post('/', async (req, res) => {
  try {
    const medicamento = await Medicamento.create(req.body);
    res.status(201).json(medicamento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un medicamento
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Medicamento.update(req.body, {
      where: { CodMedicamento: req.params.id }
    });
    if (updated) {
      const updatedMedicamento = await Medicamento.findByPk(req.params.id);
      res.json(updatedMedicamento);
    } else {
      res.status(404).json({ message: 'Medicamento no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un medicamento
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Medicamento.destroy({
      where: { CodMedicamento: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Medicamento eliminado' });
    } else {
      res.status(404).json({ message: 'Medicamento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;