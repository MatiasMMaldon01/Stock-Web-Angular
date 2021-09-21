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
exports.obtenerDetalleComprobante = exports.obtenerPorCliente = exports.obtener = exports.facturar = void 0;
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const comprobanteModel_1 = __importDefault(require("../models/comprobanteModel"));
const clienteModel_1 = __importDefault(require("../models/clienteModel"));
const productosModel_1 = __importDefault(require("../models/productosModel"));
const detalleComprobanteModel_1 = __importDefault(require("../models/detalleComprobanteModel"));
const contadorModel_1 = __importDefault(require("../models/contadorModel"));
const configuracionModel_1 = __importDefault(require("../models/configuracionModel"));
const paisModel_1 = __importDefault(require("../models/paisModel"));
const provinciaModel_1 = __importDefault(require("../models/provinciaModel"));
const departamentoModel_1 = __importDefault(require("../models/departamentoModel"));
const localidadModel_1 = __importDefault(require("../models/localidadModel"));
const facturar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield dbConexion_1.default.transaction();
    try {
        const { body } = req;
        let respuesta = [];
        const comprobante = body.comprobante;
        const detalleComprobante = body.detalleComprobante;
        let producto = {
            id: 0,
            codigo: 0,
            descripcion: "",
            cantidad: 0,
            precioCosto: 0,
            precioVenta: 0,
            stockMinimo: 0,
            stockNegativo: false,
            imagen: "",
            marca_id: 0,
            rubro_id: 0
        };
        let contador = {
            id: 0,
            contadorFacturas: 0
        };
        let configuracion = {
            id: 0,
            razonSocial: '',
            cuil: '',
            contador_id: 0,
            direccion: '',
            celular: '',
            estaEliminado: false,
            createdat: new Date,
            updatedat: new Date,
            pais_id: 0,
            provincia_id: 0,
            departamento_id: 0,
            localidad_id: 0
        };
        yield contadorModel_1.default.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']],
            transaction: t
        })
            .then(result => {
            if (result) {
                contador = result[0];
            }
        });
        contador.contadorFacturas++;
        yield comprobanteModel_1.default.create({
            cliente_id: comprobante.cliente_id,
            fecha: new Date,
            numero: contador.contadorFacturas,
            total: comprobante.total
        }, { transaction: t }).then(comprobante => {
            if (comprobante) {
                respuesta = comprobante;
            }
            else {
                res.status(404).send('El comprobante no se pudo crear');
            }
        });
        yield contadorModel_1.default.create({
            contadorFacturas: contador.contadorFacturas
        }, { transaction: t }).then(result => {
            if (!result) {
                res.status(404).send('El contador no se pudo incrementar');
            }
        });
        yield configuracionModel_1.default.findByPk(1, {
            include: [{
                    model: contadorModel_1.default,
                    attributes: ['contadorFacturas']
                },
                {
                    model: paisModel_1.default,
                    attributes: ['descripcion']
                }, {
                    model: provinciaModel_1.default,
                    attributes: ['descripcion']
                },
                {
                    model: departamentoModel_1.default,
                    attributes: ['descripcion']
                },
                {
                    model: localidadModel_1.default,
                    attributes: ['descripcion']
                }],
            transaction: t
        }).then(result => {
            configuracion = result;
        });
        if (!configuracion) {
            return res.status(404).json({
                msg: `No hay una configuracion existente por parte del vendedor`
            });
        }
        yield contadorModel_1.default.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']],
            transaction: t
        })
            .then(result => {
            if (result) {
                contador = result[0];
            }
        });
        yield configuracionModel_1.default.update({ contador_id: contador.id }, { where: {
                id: 1
            },
            transaction: t
        });
        var comprobante_id = { id: 1 };
        yield comprobanteModel_1.default.findAll({
            limit: 1,
            attributes: ['id'],
            order: [['createdAt', 'DESC']],
            transaction: t
        })
            .then(result => {
            if (result) {
                comprobante_id = result[0];
            }
        });
        for (let i = 0; i < detalleComprobante.length; i++) {
            yield productosModel_1.default.findByPk(detalleComprobante[i].id, { transaction: t })
                .then(result => {
                if (!result) {
                    res.status(404).json({
                        msg: `No existe un producto con el id ${detalleComprobante[i].id}`
                    });
                }
                else {
                    producto = result;
                }
            });
            if (detalleComprobante[i].cantidad <= producto.cantidad) {
                producto.cantidad -= detalleComprobante[i].cantidad;
            }
            yield productosModel_1.default.update({ cantidad: producto.cantidad }, {
                where: {
                    id: producto.id
                },
                transaction: t
            });
            yield detalleComprobanteModel_1.default.create({
                producto_id: detalleComprobante[i].id,
                descripcion: detalleComprobante[i].descripcion,
                cantidad: detalleComprobante[i].cantidad,
                precio: detalleComprobante[i].precioVenta,
                subtotal: detalleComprobante[i].subtotal,
                comprobante_id: comprobante_id.id
            }, { transaction: t });
        }
        yield t.commit();
        res.json("La venta se realizo con exito");
    }
    catch (error) {
        yield t.rollback();
    }
});
exports.facturar = facturar;
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comprobantes = yield comprobanteModel_1.default.findAll({
        where: { estaEliminado: false },
        include: {
            model: clienteModel_1.default,
            attributes: ['nombre', 'apellido', 'dni']
        }
    });
    if (!comprobantes) {
        res.status(404).json({
            msg: `No existen comprobantes todavia`
        });
    }
    else {
        res.json(comprobantes);
    }
});
exports.obtener = obtener;
const obtenerPorCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const comprobante = yield comprobanteModel_1.default.findAll({
        where: { cliente_id: id },
        include: {
            model: clienteModel_1.default,
            attributes: ['nombre', 'apellido', 'dni']
        }
    });
    if (!comprobante) {
        res.status(404).json({
            msg: `No existe un comprobante para este cliente`
        });
    }
    else {
        res.json(comprobante);
    }
});
exports.obtenerPorCliente = obtenerPorCliente;
const obtenerDetalleComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalleComprobante = yield detalleComprobanteModel_1.default.findAll({
        where: { comprobante_id: id },
        include: {
            model: productosModel_1.default,
            attributes: ['imagen']
        }
    });
    if (!detalleComprobante) {
        res.status(404).json({
            msg: `No existe un detalle para ese comprobante`
        });
    }
    else {
        res.json(detalleComprobante);
    }
});
exports.obtenerDetalleComprobante = obtenerDetalleComprobante;
