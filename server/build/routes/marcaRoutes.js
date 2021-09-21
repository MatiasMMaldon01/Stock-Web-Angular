"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcaController_1 = require("../controllers/marcaController");
class MarcaRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', marcaController_1.insertar);
        this.router.put('/:id', marcaController_1.modificar);
        this.router.delete('/:id', marcaController_1.eliminar);
        this.router.get('/:id', marcaController_1.obtenerPorId);
        this.router.get('/', marcaController_1.obtener);
    }
}
const marcaRoutes = new MarcaRouter();
exports.default = marcaRoutes.router;
