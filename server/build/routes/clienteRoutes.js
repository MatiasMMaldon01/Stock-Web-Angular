"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
class ClienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', clienteController_1.insertar);
        this.router.put('/:id', clienteController_1.modificar);
        this.router.get('/:id', clienteController_1.obtenerPorUserId);
        this.router.delete('/:id', clienteController_1.eliminar);
        this.router.get('/', clienteController_1.obtener);
    }
}
const clienteRoutes = new ClienteRoutes();
exports.default = clienteRoutes.router;
