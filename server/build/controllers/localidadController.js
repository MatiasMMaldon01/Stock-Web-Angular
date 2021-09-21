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
exports.obtener = exports.obtenerPorId = exports.eliminar = exports.modificar = exports.crear = void 0;
const localidadModel_1 = __importDefault(require("../models/localidadModel"));
const departamentoModel_1 = __importDefault(require("../models/departamentoModel"));
const crear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const localidad = yield localidadModel_1.default.create({
        descripcion: body.descripcion,
        departamento_id: body.departamento_id
    }).then(localidad => {
        if (localidad) {
            res.json(localidad);
        }
        else {
            res.status(404).send('La localidad no se pudo crear');
        }
    });
});
exports.crear = crear;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const localidad = yield localidadModel_1.default.findByPk(id, {
        include: [{
                model: departamentoModel_1.default,
                attributes: ['descripcion']
            }]
    });
    if (!localidad) {
        return res.status(404).json({
            msg: `No existe una localidad con el id ${id}`
        });
    }
    yield localidad.update(body)
        .then(localidad => {
        res.json({ localidad });
    })
        .catch(error => {
        res.status(404).json({
            msg: 'No se pude realizar la actualizacion'
        });
    });
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const localidad = yield localidadModel_1.default.findByPk(id, {
        include: [{
                model: departamentoModel_1.default,
                attributes: ['descripcion']
            }]
    });
    if (!localidad) {
        return res.status(404).json({
            msg: `No existe una localidad con el id ${id}`
        });
    }
    yield localidad.update({
        estaEliminado: true
    })
        .then(localidad => {
        res.json({ localidad });
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
    const localidad = yield localidadModel_1.default.findByPk(id, {
        include: [{
                model: departamentoModel_1.default,
                attributes: ['descripcion']
            }]
    });
    if (!localidad) {
        res.status(404).json({
            msg: `No existe un localidad con el id ${id}`
        });
    }
    else {
        res.json(localidad);
    }
});
exports.obtenerPorId = obtenerPorId;
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const localidades = yield localidadModel_1.default.findAll({
        where: { estaEliminado: false },
        include: [{
                model: departamentoModel_1.default,
                attributes: ['descripcion']
            }]
    });
    res.json(localidades);
});
exports.obtener = obtener;
