"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentoController_1 = require("../controllers/departamentoController");
class DepartamentoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', departamentoController_1.crear);
        this.router.put('/:id', departamentoController_1.modificar);
        this.router.delete('/:id', departamentoController_1.eliminar);
        this.router.get('/:id', departamentoController_1.obtenerPorId);
        this.router.get('/', departamentoController_1.obtener);
    }
}
const departamentoRoutes = new DepartamentoRoutes();
exports.default = departamentoRoutes.router;
