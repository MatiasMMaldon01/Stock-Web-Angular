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
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const marca = yield marcaModel_1.default.create({
        descripcion: body.descripcion,
    }).then(marca => {
        if (marca) {
            res.json(marca);
        }
        else {
            res.status(404).send('La marca no se pudo crear');
        }
    });
});
exports.insertar = insertar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const marca = yield marcaModel_1.default.findByPk(id);
    if (!marca) {
        return res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    }
    yield marca.update(body)
        .then(marca => {
        res.json({ marca });
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
    const marca = yield marcaModel_1.default.findByPk(id);
    if (!marca) {
        return res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    }
    yield marca.update({
        estaEliminado: true
    })
        .then(marca => {
        res.json({ marca });
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
    const marca = yield marcaModel_1.default.findByPk(id);
    if (!marca) {
        res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    }
    else {
        res.json(marca);
    }
});
exports.obtenerPorId = obtenerPorId;
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const marcas = yield marcaModel_1.default.findAll({
        where: { estaEliminado: false }
    });
    res.json(marcas);
});
exports.obtener = obtener;
