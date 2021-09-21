"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioAutenticado = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarioAutenticado = (req, res, next) => {
    // Leer el token del header
    var token = req.header('x-auth-token');
    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no válido' });
    }
    // validar el token
    try {
        const cifrado = jsonwebtoken_1.default.verify(token, process.env.TOKEN || "token");
        req.client = cifrado.client;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};
exports.usuarioAutenticado = usuarioAutenticado;
