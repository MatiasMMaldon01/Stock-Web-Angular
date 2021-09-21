"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localidadController_1 = require("../controllers/localidadController");
class LocalidadRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', localidadController_1.crear);
        this.router.put('/:id', localidadController_1.modificar);
        this.router.delete('/:id', localidadController_1.eliminar);
        this.router.get('/:id', localidadController_1.obtenerPorId);
        this.router.get('/', localidadController_1.obtener);
    }
}
const localidadRoutes = new LocalidadRoutes();
exports.default = localidadRoutes.router;
