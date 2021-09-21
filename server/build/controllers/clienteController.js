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
exports.obtener = exports.obtenerPorUserId = exports.eliminar = exports.modificar = exports.insertar = void 0;
const dbConexion_1 = __importDefault(require("../conexion/dbConexion"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const clienteModel_1 = __importDefault(require("../models/clienteModel"));
const departamentoModel_1 = __importDefault(require("../models/departamentoModel"));
const localidadModel_1 = __importDefault(require("../models/localidadModel"));
const paisModel_1 = __importDefault(require("../models/paisModel"));
const provinciaModel_1 = __importDefault(require("../models/provinciaModel"));
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield dbConexion_1.default.transaction();
    try {
        const { body } = req;
        const usuarioParam = body.usuario;
        const clienteParam = body.cliente;
        let usuarioExiste;
        let usuario = {
            id: 0,
            email: '',
            contrasena: '',
            esAdmin: false,
        };
        yield usuarioModel_1.default.findOne({ where: { email: usuarioParam.email }, transaction: t })
            .then(res => {
            usuarioExiste = res;
        }, error => console.log(error));
        if (usuarioExiste !== null) {
            res.status(400).json({ msg: "Ya existe un usuario con el email " + usuarioParam.email });
        }
        else {
            const user = yield usuarioModel_1.default.create({
                email: usuarioParam.email,
                contrasena: yield encriptarContrasena(usuarioParam.contrasena),
                esAdmin: usuarioParam.esAdmin,
            }, { transaction: t }).then(data => {
                if (data) {
                    usuario = data;
                    const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.TOKEN || 'token');
                }
                else {
                    res.status(404).send('El usuario no se pudo crear');
                }
            });
        }
        yield usuarioModel_1.default.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']],
            transaction: t
        })
            .then(result => {
            if (result) {
                usuario = result[0];
            }
        });
        const cliente = yield clienteModel_1.default.create({
            usuario_id: usuario.id,
            nombre: clienteParam.nombre,
            apellido: clienteParam.apellido,
            direccion: clienteParam.direccion,
            celular: clienteParam.celular,
            dni: clienteParam.dni,
            pais_id: clienteParam.pais_id,
            provincia_id: clienteParam.provincia_id,
            departamento_id: clienteParam.departamento_id,
            localidad_id: clienteParam.localidad_id
        }, { transaction: t }).then(cliente => {
            if (cliente) {
                res.json(cliente);
            }
            else {
                res.status(404).send('El cliente no se pudo crear');
            }
        });
        yield t.commit();
    }
    catch (error) {
        t.rollback();
    }
});
exports.insertar = insertar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const cliente = yield clienteModel_1.default.findByPk(id, {
            include: [{
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
                }, {
                    model: usuarioModel_1.default
                }]
        });
        if (!cliente) {
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }
        yield cliente.update(body)
            .then(cliente => {
            res.json({ cliente });
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
    const cliente = yield clienteModel_1.default.findByPk(id);
    if (!cliente) {
        return res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }
    yield cliente.update({ estaEliminado: true })
        .then(cliente => {
        res.json({ cliente });
    })
        .catch(error => {
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    });
});
exports.eliminar = eliminar;
const obtenerPorUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield clienteModel_1.default.findOne({
        where: { usuario_id: id },
        include: [{
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
            },
            {
                model: usuarioModel_1.default
            }]
    });
    if (!cliente) {
        res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }
    else {
        res.json(cliente);
    }
});
exports.obtenerPorUserId = obtenerPorUserId;
const obtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clienteModel_1.default.findAll({
        where: { estaEliminado: false },
        include: [{
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
            },
            {
                model: usuarioModel_1.default
            }]
    });
    res.json(clientes);
});
exports.obtener = obtener;
const encriptarContrasena = (contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hashSync(contrasena, salt);
});
