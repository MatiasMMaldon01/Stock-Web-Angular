"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const provinciaModel_1 = __importDefault(require("./provinciaModel"));
const Departamento = dbConexion_1.default.define('Departamentos', {
    descripcion: { type: sequelize_1.DataTypes.STRING },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
Departamento.belongsTo(provinciaModel_1.default, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { name: 'provincia_id' }
});
exports.default = Departamento;
