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
exports.perfil = exports.signIn = exports.obtenerPorEmail = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
const clienteModel_1 = __importDefault(require("../models/clienteModel"));
const paisModel_1 = __importDefault(require("../models/paisModel"));
const provinciaModel_1 = __importDefault(require("../models/provinciaModel"));
const departamentoModel_1 = __importDefault(require("../models/departamentoModel"));
const localidadModel_1 = __importDefault(require("../models/localidadModel"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeUsuario = usuarioModel_1.default.findOne({ where: { email: body.email } });
        if (Object.keys(existeUsuario).length !== 0) {
            res.status(400).json({ msg: "Ya existe un usuario con el email " + body.email });
        }
        else {
            let usuario = {
                id: 0,
                email: '',
                contrasena: '',
                esAdmin: false,
            };
            const user = yield usuarioModel_1.default.create({
                email: body.email,
                contrasena: yield encriptarContrasena(body.contrasena),
                esAdmin: body.esAdmin,
            }).then(data => {
                if (data) {
                    usuario = data;
                    const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.TOKEN || 'token');
                    res.header('usuario-token', token).json(usuario);
                }
                else {
                    res.status(404).send('El usuario no se pudo crear');
                }
            });
        }
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.signUp = signUp;
const obtenerPorEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    let usuario = {
        id: 0,
        email: '',
        contrasena: '',
        esAdmin: false,
    };
    const user = yield usuarioModel_1.default.findOne({ where: { email: email } })
        .then(usuario => {
        if (usuario)
            return res.json(usuario);
    })
        .catch(error => console.log(error));
});
exports.obtenerPorEmail = obtenerPorEmail;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.body;
    let usuario = {
        id: 0,
        email: '',
        contrasena: '',
        esAdmin: false,
    };
    const user = yield usuarioModel_1.default.findOne({ where: { email: email } });
    usuario = user;
    if (!usuario) {
        res.status(401).send("El usuario no existe");
    }
    validarContrasena(contrasena, usuario.contrasena)
        .then(result => {
        if (result) {
            const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.TOKEN || 'token');
            if (usuario.esAdmin) {
                res.status(200).json('admin ' + token);
            }
            else {
                res.status(200).json('usuario ' + token);
            }
        }
        else {
            res.status(401).send("La contrasena es incorrecta");
        }
    });
});
exports.signIn = signIn;
const perfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = yield clienteModel_1.default.findOne({
        where: { usuario_id: req.clienteId },
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
            msg: `No existe un cliente con el id ${req.clienteId}`
        });
    }
    else {
        res.json(cliente);
    }
});
exports.perfil = perfil;
const encriptarContrasena = (contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hashSync(contrasena, salt);
});
const validarContrasena = (contrasena, usuarioContrasena) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compareSync(contrasena, usuarioContrasena);
});
