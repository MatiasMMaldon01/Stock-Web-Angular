"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paisController_1 = require("../controllers/paisController");
class PaisRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', paisController_1.crear);
        this.router.put('/:id', paisController_1.modificar);
        this.router.get('/:id', paisController_1.obtenerPorId);
        this.router.delete('/:id', paisController_1.eliminar);
        this.router.get('/', paisController_1.obtener);
    }
}
const paisRoutes = new PaisRoutes();
exports.default = paisRoutes.router;
