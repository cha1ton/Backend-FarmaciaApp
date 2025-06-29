//backend/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const tipoMedicRoutes = require('./routes/tipoMedicRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/tipos-medicamento', tipoMedicRoutes);

// Conexión a la base de datos
sequelize.sync()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = app;