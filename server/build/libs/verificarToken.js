"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacionToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validacionToken = (req, res, next) => {
    var token = req.header('usuario-token');
    if (!token)
        return res.status(401).json({ msg: 'No hay Token, permiso no válido' });
    try {
        const cifrado = jsonwebtoken_1.default.verify(token, process.env.TOKEN || "token");
        req.clienteId = cifrado.id;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};
exports.validacionToken = validacionToken;
