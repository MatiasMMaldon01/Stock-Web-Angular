"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provinciaController_1 = require("../controllers/provinciaController");
class ProvinciaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', provinciaController_1.crear);
        this.router.put('/:id', provinciaController_1.modificar);
        this.router.delete('/:id', provinciaController_1.eliminar);
        this.router.get('/:id', provinciaController_1.obtenerPorId);
        this.router.get('/', provinciaController_1.obtener);
    }
}
const provinciaRoutes = new ProvinciaRoutes();
exports.default = provinciaRoutes.router;
