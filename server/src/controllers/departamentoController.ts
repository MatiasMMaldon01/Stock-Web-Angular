import { Request, Response } from 'express';

import Departamento from '../models/departamentoModel';
import Provincia from '../models/provinciaModel';

export const crear = async (req: Request, res: Response) =>{
    const {body} = req;

    const departamento = await Departamento.create({
        descripcion: body.descripcion,
        provincia_id: body.provincia_id
    }).then(departamento => {
        if (departamento){
            res.json(departamento);
        }else{
            res.status(404).send('El departamento no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;

    const departamento = await Departamento.findByPk(id, {
        include: [{
            model: Provincia,
            attributes : ['descripcion']
        }]
    });
    if(!departamento){
        return res.status(404).json({
            msg: `No existe un departamento con el id ${id}`
        });
    }

    await departamento.update(body)
    .then(departamento=>{
        res.json({departamento})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la actualizacion'
        });
    });

}

export const eliminar = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const departamento = await Departamento.findByPk(id, {
        include: [{
            model: Provincia,
            attributes : ['descripcion']
        }]
    });

    if(!departamento){
        return res.status(404).json({
            msg: `No existe un departamento con el id ${id}`
        });
    }

    await departamento.update({
        estaEliminado : true
    })
    .then(departamento=>{
        res.json({departamento})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })
    
}

export const obtenerPorId = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const departamento = await Departamento.findByPk(id, {
        include: [{
            model: Provincia,
            attributes : ['descripcion', 'Pai']
        }]});

    if(!departamento){
        res.status(404).json({
            msg: `No existe un departamento con el id ${id}`
        });
    }else{
        
        res.json(departamento);
    }
}

export const obtener = async (req: Request, res: Response) =>{
    const departamentos = await Departamento.findAll({
        where: {estaEliminado : false},
        include: [{
            model: Provincia,
            attributes : ['descripcion']
        }]
    });

    res.json(departamentos);
}