import { Request, Response } from "express";

import Configuracion from "../models/configuracionModel";
import Contador from "../models/contadorModel";
import Departamento from "../models/departamentoModel";
import Localidad from "../models/localidadModel";
import Pais from "../models/paisModel";
import Provincia from "../models/provinciaModel";

export const insertar = async (req: Request, res: Response)=>{
    const {body} = req;

    const configuracion = await Configuracion.create({
        razonSocial : body.razonSocial,
        contador_id : body.contador_id,
        cuil : body.cuil,
        direccion : body.direccion,
        celular : body.celular,
        pais_id : body.pais_id,
        provincia_id : body.provincia_id,
        departamento_id : body.departamento_id,
        localidad_id : body.localidad_id

    }).then(configuracion => {
        if (configuracion){
            res.json(configuracion);
        }else{
            res.status(404).send('El configuracion no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        const configuracion = await Configuracion.findByPk(id,{
            include: [{
                model : Contador,
                attributes : ['contadorFacturas']
            },
            {
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
            }]
        });
    
        if(!configuracion){
            return res.status(404).json({
                msg: `No existe un configuracion con el id ${id}`
            });
        }
    
        await configuracion.update(body)
        .then(configuracion=>{
            res.json({configuracion})
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

export const obtener = async(req: Request, res: Response)=>{
    const configuraciones = await Configuracion.findAll({
        where: { estaEliminado : false},
        include: [{
            model : Contador,
            attributes : ['contadorFacturas']
        },
        {
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
        }]
    });
    res.json(configuraciones);
}