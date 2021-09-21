"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configuracionController_1 = require("../controllers/configuracionController");
class ConfiguracionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', configuracionController_1.insertar);
        this.router.put('/:id', configuracionController_1.modificar);
        this.router.get('/', configuracionController_1.obtener);
    }
}
const configuracionRoutes = new ConfiguracionRoutes();
exports.default = configuracionRoutes.router;
