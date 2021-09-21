"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const comprobanteModel_1 = __importDefault(require("./comprobanteModel"));
const productosModel_1 = __importDefault(require("./productosModel"));
const DetalleComprobante = dbConexion_1.default.define('detalleComprobantes', {
    descripcion: { type: sequelize_1.DataTypes.STRING },
    precio: { type: sequelize_1.DataTypes.DECIMAL },
    cantidad: { type: sequelize_1.DataTypes.NUMBER },
    subtotal: { type: sequelize_1.DataTypes.DECIMAL },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
DetalleComprobante.belongsTo(comprobanteModel_1.default, {
    onDelete: "cascade",
    onUpdate: "cascade",
    foreignKey: { name: "comprobante_id" }
});
DetalleComprobante.belongsTo(productosModel_1.default, {
    onDelete: "cascade",
    onUpdate: "cascade",
    foreignKey: { name: "producto_id" }
});
exports.default = DetalleComprobante;
