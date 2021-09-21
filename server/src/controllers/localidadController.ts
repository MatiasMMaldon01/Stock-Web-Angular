import { Request, Response } from 'express';

import Localidad from '../models/localidadModel';
import Departamento from '../models/departamentoModel';

export const crear = async (req: Request, res: Response) =>{
    const {body} = req;

    const localidad = await Localidad.create({
        descripcion: body.descripcion,
        departamento_id: body.departamento_id
    }).then(localidad => {
        if (localidad){
            res.json(localidad);
        }else{
            res.status(404).send('La localidad no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;

    const localidad = await Localidad.findByPk(id, {
        include: [{
            model: Departamento,
            attributes : ['descripcion']
        }]
    });
    if(!localidad){
        return res.status(404).json({
            msg: `No existe una localidad con el id ${id}`
        });
    }

    await localidad.update(body)
    .then(localidad=>{
        res.json({localidad})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la actualizacion'
        });
    });

}

export const eliminar = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const localidad = await Localidad.findByPk(id, {
        include: [{
            model: Departamento,
            attributes : ['descripcion']
        }]
    });

    if(!localidad){
        return res.status(404).json({
            msg: `No existe una localidad con el id ${id}`
        });
    }

    await localidad.update({
        estaEliminado : true
    })
    .then(localidad=>{
        res.json({localidad})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })
    
}

export const obtenerPorId = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const localidad = await Localidad.findByPk(id, {
        include: [{
            model: Departamento,
            attributes : ['descripcion']
        }]});

    if(!localidad){
        res.status(404).json({
            msg: `No existe un localidad con el id ${id}`
        });
    }else{
        
        res.json(localidad);
    }
}

export const obtener = async (req: Request, res: Response) =>{
    const localidades = await Localidad.findAll({
        where: {estaEliminado : false},
        include: [{
            model: Departamento,
            attributes : ['descripcion']
        }]
    });

    res.json(localidades);
}