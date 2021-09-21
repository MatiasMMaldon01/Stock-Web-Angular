"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const Marca = dbConexion_1.default.define('Marcas', {
    descripcion: { type: sequelize_1.DataTypes.STRING },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
exports.default = Marca;
