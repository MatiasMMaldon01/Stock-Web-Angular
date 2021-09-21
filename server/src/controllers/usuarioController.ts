import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Usuario from "../models/usuarioModel";
import Cliente from "../models/clienteModel";
import Pais from "../models/paisModel";
import Provincia from "../models/provinciaModel";
import Departamento from "../models/departamentoModel";
import Localidad from "../models/localidadModel";


export const signUp = async (req: Request, res: Response)=>{
    const {body} = req;

    try {
        const existeUsuario = Usuario.findOne({ where : {email : body.email}});
        if (Object.keys(existeUsuario).length !== 0){ 
            
            res.status(400).json({ msg: "Ya existe un usuario con el email " + body.email});

        }else{
            let usuario : any = {
                id: 0,
                email: '',
                contrasena: '',
                esAdmin : false,
            };
            
            const user = await Usuario.create({
                email : body.email,
                contrasena : await encriptarContrasena(body.contrasena),
                esAdmin: body.esAdmin,
            }).then(data => {
                if (data){
                    usuario = data;
                    const token:string = jwt.sign({id: usuario.id}, process.env.TOKEN || 'token');
                    res.header('usuario-token', token).json(usuario);
                }else{
                    res.status(404).send('El usuario no se pudo crear');
                }
            })
        }

    } catch (error) {
        throw new Error(error);
    }
}



export const obtenerPorEmail = async(req: Request, res: Response)=>{
    const {email} = req.body;
    let usuario : any = {
        id: 0,
        email: '',
        contrasena: '',
        esAdmin : false,
    };

    const user = await Usuario.findOne({ where : {email : email}})
    .then( usuario =>{
        if(usuario) return res.json(usuario);
    })
    .catch(error => console.log(error))
}

export const signIn = async (req: Request, res: Response) => {
    const {email, contrasena} = req.body;
    let usuario : any = {
        id: 0,
        email: '',
        contrasena: '',
        esAdmin : false,
    };

    const user = await Usuario.findOne({ where : {email : email}});
    usuario = user;
    if(!usuario){
        res.status(401).send("El usuario no existe");
    }

    validarContrasena(contrasena, usuario.contrasena)
    .then(result =>{
        if(result){
            const token:string = jwt.sign({id: usuario.id}, process.env.TOKEN || 'token');
            if(usuario.esAdmin){
                res.status(200).json('admin ' + token); 
            }else{
                res.status(200).json('usuario ' + token); 
            }
        }else{
            res.status(401).send("La contrasena es incorrecta");
        }
    })  
    
    
}

export const perfil = async (req:Request, res:Response) =>{

    const cliente = await Cliente.findOne({
        where: {usuario_id: req.clienteId},
        include: [{
            model: Pais,
            attributes : ['descripcion']
        }, 
        {
            model : Provincia,
            attributes : ['descripcion']
        },
        {
            model : Departamento,
            attributes : ['descripcion']
        },
        {
            model : Localidad,
            attributes : ['descripcion']
        },
        {
            model : Usuario
        }]
    });

    if(!cliente){
        res.status(404).json({
            msg: `No existe un cliente con el id ${req.clienteId}`
        });
    }else{
        
        res.json(cliente);
    }
}

const encriptarContrasena = async(contrasena:string): Promise<string> =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(contrasena, salt);
}

const validarContrasena = async (contrasena: string, usuarioContrasena: string): Promise<boolean> => {
    return bcrypt.compareSync(contrasena, usuarioContrasena);
}