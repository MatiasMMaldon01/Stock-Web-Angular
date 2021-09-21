import { Request, Response } from 'express';
import Pais from '../models/paisModel';
import Provincia from '../models/provinciaModel';

export const crear = async (req: Request, res: Response) =>{
    const {body} = req;

    const provincia = await Provincia.create({
        descripcion: body.descripcion,
        pais_id: body.pais_id
    }).then(provincia => {
        if (provincia){
            res.json(provincia);
        }else{
            res.status(404).send('La provincia no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;

    const provincia = await Provincia.findByPk(id, {
        include: [{
            model: Pais,
            attributes : ['descripcion']
        }]
    });
    if(!provincia){
        return res.status(404).json({
            msg: `No existe una provincia con el id ${id}`
        });
    }

    await provincia.update(body)
    .then(provincia=>{
        res.json({provincia})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la actualizacion'
        });
    });

}

export const eliminar = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const provincia = await Provincia.findByPk(id, {
        include: [{
            model: Pais,
            attributes : ['descripcion']
        }]
    });

    if(!provincia){
        return res.status(404).json({
            msg: `No existe una provincia con el id ${id}`
        });
    }

    await provincia.update({
        estaEliminado : true
    })
    .then(provincia=>{
        res.json({provincia})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })
    
}

export const obtenerPorId = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const provincia = await Provincia.findByPk(id, {
        include: [{
            model: Pais,
            attributes : ['descripcion']
        }]});

    if(!provincia){
        res.status(404).json({
            msg: `No existe un provincia con el id ${id}`
        });
    }else{
        
        res.json(provincia);
    }
}

export const obtener = async (req: Request, res: Response) =>{
    const provincias = await Provincia.findAll({
        where: {estaEliminado : false},
        include: [{
            model: Pais,
            attributes : ['descripcion']
        }]
    });

    res.json(provincias);
}