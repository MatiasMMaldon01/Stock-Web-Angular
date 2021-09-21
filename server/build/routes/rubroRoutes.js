"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rubroController_1 = require("../controllers/rubroController");
class RubroRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', rubroController_1.insertar);
        this.router.put('/:id', rubroController_1.modificar);
        this.router.delete('/:id', rubroController_1.eliminar);
        this.router.get('/:id', rubroController_1.obtenerPorId);
        this.router.get('/', rubroController_1.obtener);
    }
}
const rubroRoutes = new RubroRoutes();
exports.default = rubroRoutes.router;
