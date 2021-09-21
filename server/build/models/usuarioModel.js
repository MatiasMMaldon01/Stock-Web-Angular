"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const Usuario = dbConexion_1.default.define('Usuarios', {
    email: { type: sequelize_1.DataTypes.STRING },
    contrasena: { type: sequelize_1.DataTypes.STRING },
    esAdmin: { type: sequelize_1.DataTypes.BOOLEAN },
    estaEliminado: { type: sequelize_1.DataTypes.BOOLEAN }
});
exports.default = Usuario;
