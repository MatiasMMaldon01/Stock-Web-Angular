"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const departamentoModel_1 = __importDefault(require("./departamentoModel"));
const localidadModel_1 = __importDefault(require("./localidadModel"));
const paisModel_1 = __importDefault(require("./paisModel"));
const provinciaModel_1 = __importDefault(require("./provinciaModel"));
const contadorModel_1 = __importDefault(require("./contadorModel"));
const Configuracion = dbConexion_1.default.define('Configuracion', {
    razonSocial: { type: sequelize_1.DataTypes.INTEGER },
    cuil: { type: sequelize_1.DataTypes.STRING },
    direccion: { type: sequelize_1.DataTypes.STRING },
    celular: { type: sequelize_1.DataTypes.STRING },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
Configuracion.belongsTo(contadorModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'contador_id' }
});
Configuracion.belongsTo(paisModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'pais_id' }
});
Configuracion.belongsTo(provinciaModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'provincia_id' }
});
Configuracion.belongsTo(departamentoModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'departamento_id' }
});
Configuracion.belongsTo(localidadModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'localidad_id' }
});
exports.default = Configuracion;
