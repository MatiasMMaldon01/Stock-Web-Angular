"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const verificarToken_1 = require("../libs/verificarToken");
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/signup', usuarioController_1.signUp);
        this.router.post('/signin', usuarioController_1.signIn);
        this.router.post('/obtenerUsuario', usuarioController_1.obtenerPorEmail);
        this.router.get('/perfil', verificarToken_1.validacionToken, usuarioController_1.perfil);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
