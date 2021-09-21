"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const usuarioModel_1 = __importDefault(require("./usuarioModel"));
const departamentoModel_1 = __importDefault(require("./departamentoModel"));
const localidadModel_1 = __importDefault(require("./localidadModel"));
const paisModel_1 = __importDefault(require("./paisModel"));
const provinciaModel_1 = __importDefault(require("./provinciaModel"));
const Cliente = dbConexion_1.default.define('Clientes', {
    nombre: { type: sequelize_1.DataTypes.STRING },
    apellido: { type: sequelize_1.DataTypes.STRING },
    direccion: { type: sequelize_1.DataTypes.STRING },
    celular: { type: sequelize_1.DataTypes.STRING },
    dni: { type: sequelize_1.DataTypes.STRING },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
Cliente.belongsTo(usuarioModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'usuario_id' }
});
Cliente.belongsTo(paisModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'pais_id' }
});
Cliente.belongsTo(provinciaModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'provincia_id' }
});
Cliente.belongsTo(departamentoModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'departamento_id' }
});
Cliente.belongsTo(localidadModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'localidad_id' }
});
exports.default = Cliente;
