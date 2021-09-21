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
const paisModel_1 = __importDefault(require("../models/paisModel"));
const crear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const pais = yield paisModel_1.default.create({
        descripcion: body.descripcion,
    }).then(pais => {
        if (pais) {
            res.json(pais);
        }
        else {
            res.status(404).send('El pais no se pudo crear');
        }
    });
});
exports.crear = crear;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const pais = yield paisModel_1.default.findByPk(id);
    if (!pais) {
        return res.status(404).json({
            msg: `No existe un pais con el id ${id}`
        });
    }
    yield pais.update(body)
        .then(pais => {
        res.json({ pais });
    })
        .catch(error => {
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    });
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pais = yield paisModel_1.default.findByPk(id);
    if (!pais) {
        return res.status(404).json({
            msg: `No existe un pais con el id ${id}`
        });
    }
    yield pais.update({
        estaEliminado: true
    })
        .then(pais => {
        res.json({ pais });
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
    const pais = yield paisModel_1.default.findByPk(id);
    if (!pais) {
        res.status(404).json({
            msg: `No existe un pais con el id ${id}`
        });
    }
    else {
        res.json(pais);
    }
});
exports.obtenerPorId = obtenerPorId;
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paises = yield paisModel_1.default.findAll({
        where: { estaEliminado: false }
    });
    res.json(paises);
});
exports.obtener = obtener;
