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
exports.obtener = exports.modificar = exports.insertar = void 0;
const configuracionModel_1 = __importDefault(require("../models/configuracionModel"));
const contadorModel_1 = __importDefault(require("../models/contadorModel"));
const departamentoModel_1 = __importDefault(require("../models/departamentoModel"));
const localidadModel_1 = __importDefault(require("../models/localidadModel"));
const paisModel_1 = __importDefault(require("../models/paisModel"));
const provinciaModel_1 = __importDefault(require("../models/provinciaModel"));
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const configuracion = yield configuracionModel_1.default.create({
        razonSocial: body.razonSocial,
        contador_id: body.contador_id,
        cuil: body.cuil,
        direccion: body.direccion,
        celular: body.celular,
        pais_id: body.pais_id,
        provincia_id: body.provincia_id,
        departamento_id: body.departamento_id,
        localidad_id: body.localidad_id
    }).then(configuracion => {
        if (configuracion) {
            res.json(configuracion);
        }
        else {
            res.status(404).send('El configuracion no se pudo crear');
        }
    });
});
exports.insertar = insertar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const configuracion = yield configuracionModel_1.default.findByPk(id, {
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
                }]
        });
        if (!configuracion) {
            return res.status(404).json({
                msg: `No existe un configuracion con el id ${id}`
            });
        }
        yield configuracion.update(body)
            .then(configuracion => {
            res.json({ configuracion });
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
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const configuraciones = yield configuracionModel_1.default.findAll({
        where: { estaEliminado: false },
        include: [{
                model: contadorModel_1.default,
                attributes: ['contadorFacturas']
            },
            {
                model: paisModel_1.default,
                attributes: ['descripcion']
            },
            {
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
            }]
    });
    res.json(configuraciones);
});
exports.obtener = obtener;
