"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtener = exports.obtenerPorId = exports.eliminar = exports.modificar = exports.insertar = void 0;
const marcaModel_1 = __importDefault(require("../models/marcaModel"));
const productosModel_1 = __importDefault(require("../models/productosModel"));
const rubroModel_1 = __importDefault(require("../models/rubroModel"));
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const producto = yield productosModel_1.default.create({
        codigo: body.codigo,
        descripcion: body.descripcion,
        cantidad: body.cantidad,
        marca_id: body.marca_id,
        rubro_id: body.rubro_id,
        precioCosto: body.precioCosto,
        precioVenta: body.precioVenta,
        imagen: body.imagen,
        stockMinimo: body.stockMinimo,
        stockNegativo: body.stockNegativo
    }).then(producto => {
        if (producto) {
            res.json(producto);
        }
        else {
            res.status(404).send('El producto no se pudo crear');
        }
    });
});
exports.insertar = insertar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const producto = yield productosModel_1.default.findByPk(id, {
            include: [{
                    model: marcaModel_1.default,
                    attributes: ['descripcion']
                }, {
                    model: rubroModel_1.default,
                    attributes: ['descripcion']
                }]
        });
        if (!producto) {
            return res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
        yield producto.update(body)
            .then(producto => {
            res.json({ producto });
        })
            .catch(error => {
            res.status(404).json({
                msg: 'No se pude realizar la actualizacion'
            });
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield productosModel_1.default.findByPk(id);
    if (!producto) {
        return res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
    yield producto.update({ estaEliminado: true })
        .then(producto => {
        res.json({ producto });
    })
        .catch(error => {
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    });
});
exports.eliminar = eliminar;
const obtenerPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield productosModel_1.default.findByPk(id, {
        include: [{
                model: marcaModel_1.default,
                attributes: ['descripcion']
            }, {
                model: rubroModel_1.default,
                attributes: ['descripcion']
            }]
    });
    if (!producto) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
    else {
        res.json(producto);
    }
});
exports.obtenerPorId = obtenerPorId;
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield productosModel_1.default.findAll({
        where: { estaEliminado: false },
        include: [{
                model: marcaModel_1.default,
                attributes: ['descripcion']
            }, {
                model: rubroModel_1.default,
                attributes: ['descripcion']
            }]
    });
    res.json(productos);
});
exports.obtener = obtener;
