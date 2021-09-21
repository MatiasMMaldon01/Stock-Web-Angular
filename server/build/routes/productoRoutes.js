"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
class ProductoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', productoController_1.insertar);
        this.router.put('/:id', productoController_1.modificar);
        this.router.delete('/:id', productoController_1.eliminar);
        this.router.get('/:id', productoController_1.obtenerPorId);
        this.router.get('/', productoController_1.obtener);
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
