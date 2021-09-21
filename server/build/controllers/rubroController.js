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
const rubroModel_1 = __importDefault(require("../models/rubroModel"));
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const rubro = yield rubroModel_1.default.create({
        descripcion: body.descripcion,
    }).then(rubro => {
        if (rubro) {
            res.json(rubro);
        }
        else {
            res.status(404).send('El rubro no se pudo crear');
        }
    });
});
exports.insertar = insertar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const rubro = yield rubroModel_1.default.findByPk(id);
    if (!rubro) {
        return res.status(404).json({
            msg: `No existe un rubro con el id ${id}`
        });
    }
    yield rubro.update(body)
        .then(rubro => {
        res.json({ rubro });
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
    const rubro = yield rubroModel_1.default.findByPk(id);
    if (!rubro) {
        return res.status(404).json({
            msg: `No existe un rubro con el id ${id}`
        });
    }
    yield rubro.update({
        estaEliminado: true
    })
        .then(rubro => {
        res.json({ rubro });
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
    const rubro = yield rubroModel_1.default.findByPk(id);
    if (!rubro) {
        res.status(404).json({
            msg: `No existe una rubro con el id ${id}`
        });
    }
    else {
        res.json(rubro);
    }
});
exports.obtenerPorId = obtenerPorId;
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rubros = yield rubroModel_1.default.findAll({
        where: { estaEliminado: false }
    });
    res.json(rubros);
});
exports.obtener = obtener;
