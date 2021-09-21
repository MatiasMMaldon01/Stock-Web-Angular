import { Request, Response } from "express";
import db from "../conexion/dbConexion";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


import Cliente from "../models/clienteModel";
import Departamento from "../models/departamentoModel";
import Localidad from "../models/localidadModel";
import Pais from "../models/paisModel";
import Provincia from "../models/provinciaModel";
import Usuario from "../models/usuarioModel";

export const insertar = async (req: Request, res: Response)=>{
    const t = await db.transaction();
    try {
        const {body} = req;

        const usuarioParam = body.usuario;
        const clienteParam = body.cliente;

        let usuarioExiste : any;

        let usuario : any = {
            id: 0,
            email: '',
            contrasena: '',
            esAdmin : false,
        };

        await Usuario.findOne({ where : {email : usuarioParam.email}, transaction: t})
        .then(res =>{

            usuarioExiste = res;
        },
        error => console.log(error));

        if (usuarioExiste !== null){ 
            
            res.status(400).json({ msg: "Ya existe un usuario con el email " + usuarioParam.email});

        }else{
            const user = await Usuario.create({
                email : usuarioParam.email,
                contrasena : await encriptarContrasena(usuarioParam.contrasena),
                esAdmin: usuarioParam.esAdmin,
            }, {transaction: t}).then(data => {
                if (data){
                    usuario = data;
                    const token:string = jwt.sign({id: usuario.id}, process.env.TOKEN || 'token');
                }else{
                    res.status(404).send('El usuario no se pudo crear');
                }
            })
        }

        await Usuario.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]],
            transaction : t
        })
        .then(result =>{
            if(result){
                usuario = result[0];
            }
        }); 

        const cliente = await Cliente.create({
            usuario_id : usuario.id,
            nombre : clienteParam.nombre,
            apellido : clienteParam.apellido,
            direccion : clienteParam.direccion,
            celular : clienteParam.celular,
            dni : clienteParam.dni,
            pais_id : clienteParam.pais_id,
            provincia_id : clienteParam.provincia_id,
            departamento_id : clienteParam.departamento_id,
            localidad_id : clienteParam.localidad_id
        }, {transaction : t}).then(cliente => {
            if (cliente){
                res.json(cliente);
            }else{
                res.status(404).send('El cliente no se pudo crear');
            }
        });

        await t.commit();

    } catch (error) {
        t.rollback();
    }
    
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        const cliente = await Cliente.findByPk(id,{
            include: [{
                model: Pais,
                attributes : ['descripcion']
            }, {
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
            },{
                model : Usuario
            }]
        });
    
        if(!cliente){
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }
    
        await cliente.update(body)
        .then(cliente=>{
            res.json({cliente})
        })
        .catch(error=>{
            res.status(404).json({
                msg: 'No se pude realizar la actualizacion'
            });
        })
    } catch (error) {
        throw new Error(error);
    }
    
}

export const eliminar = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const cliente = await Cliente.findByPk(id);
    
    if(!cliente){
        return res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }

    await cliente.update({ estaEliminado : true})
    .then(cliente=>{
        res.json({cliente})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })


}

export const obtenerPorUserId = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const cliente = await Cliente.findOne({
        where: {usuario_id: id},
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
            msg: `No existe un cliente con el id ${id}`
        });
    }else{
        
        res.json(cliente);
    }
}

export const obtener = async(req: Request, res: Response)=>{
    const clientes = await Cliente.findAll({
        where: { estaEliminado : false},
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
    res.json(clientes);
}

const encriptarContrasena = async(contrasena:string): Promise<string> =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(contrasena, salt);
}