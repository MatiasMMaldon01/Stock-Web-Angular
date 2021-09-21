"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventaController_1 = require("../controllers/ventaController");
class VentaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', ventaController_1.facturar);
        this.router.get('/obtenerPorCLiente/:id', ventaController_1.obtenerPorCliente);
        this.router.get('/', ventaController_1.obtener);
        this.router.get('/obtenerDetalleComprobante/:id', ventaController_1.obtenerDetalleComprobante);
    }
}
const ventaRoutes = new VentaRoutes();
exports.default = ventaRoutes.router;
