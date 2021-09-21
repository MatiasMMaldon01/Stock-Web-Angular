"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const marcaModel_1 = __importDefault(require("./marcaModel"));
const rubroModel_1 = __importDefault(require("./rubroModel"));
const Producto = dbConexion_1.default.define('Productos', {
    codigo: { type: sequelize_1.DataTypes.INTEGER },
    descripcion: { type: sequelize_1.DataTypes.STRING },
    cantidad: { type: sequelize_1.DataTypes.INTEGER },
    precioCosto: { type: sequelize_1.DataTypes.INTEGER },
    precioVenta: { type: sequelize_1.DataTypes.INTEGER },
    stockMinimo: { type: sequelize_1.DataTypes.INTEGER },
    stockNegativo: { type: sequelize_1.DataTypes.BOOLEAN },
    imagen: { type: sequelize_1.DataTypes.STRING },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
Producto.belongsTo(marcaModel_1.default, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { name: 'marca_id' }
});
Producto.belongsTo(rubroModel_1.default, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { name: 'rubro_id' }
});
exports.default = Producto;
