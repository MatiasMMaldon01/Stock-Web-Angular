"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const clienteModel_1 = __importDefault(require("./clienteModel"));
const Comprobante = dbConexion_1.default.define('Comprobantes', {
    fecha: { type: sequelize_1.DataTypes.DATE },
    numero: { type: sequelize_1.DataTypes.NUMBER },
    total: { type: sequelize_1.DataTypes.NUMBER },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
Comprobante.belongsTo(clienteModel_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: { name: 'cliente_id' }
});
exports.default = Comprobante;
