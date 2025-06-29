//models/Medicamento.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TipoMedic = require("./TipoMedic");

const Medicamento = sequelize.define(
  "Medicamento",
  {
    CodMedicamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcionMed: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    precioVentaUni: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "Medicamento",
    timestamps: false,
  }
);

Medicamento.belongsTo(TipoMedic, { foreignKey: "CodTipoMed" });

module.exports = Medicamento;
