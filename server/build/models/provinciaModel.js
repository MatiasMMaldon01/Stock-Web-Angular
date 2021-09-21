"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const paisModel_1 = __importDefault(require("./paisModel"));
const Provincia = dbConexion_1.default.define('Provincias', {
    descripcion: { type: sequelize_1.DataTypes.STRING },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
Provincia.belongsTo(paisModel_1.default, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: { name: 'pais_id' }
});
exports.default = Provincia;
