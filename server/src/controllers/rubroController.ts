import {Request, Response} from 'express';
import Rubro from '../models/rubroModel';

export const insertar = async (req: Request, res: Response)=>{
    const {body} = req;

    const rubro = await Rubro.create({
        descripcion: body.descripcion,
    }).then(rubro => {
        if (rubro){
            res.json(rubro);
        }else{
            res.status(404).send('El rubro no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const{body} = req;

    const rubro = await Rubro.findByPk(id);
    if(!rubro){
        return res.status(404).json({
            msg: `No existe un rubro con el id ${id}`
        });
    }

    await rubro.update(body)
    .then(rubro=>{
        res.json({rubro})
    })
        .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la actualizacion'
        });
    });
}

export const eliminar = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const rubro = await Rubro.findByPk(id);
    if(!rubro){
        return res.status(404).json({
            msg: `No existe un rubro con el id ${id}`
        });
    }

    await rubro.update({
        estaEliminado : true
    })
    .then(rubro=>{
        res.json({rubro})
    })
        .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })
}

export const obtenerPorId = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const rubro = await Rubro.findByPk(id);

    if(!rubro){
        res.status(404).json({
            msg: `No existe una rubro con el id ${id}`
        });
    }else{
        
        res.json(rubro);
    }
}

export const obtener = async(req: Request, res: Response)=>{
    const rubros = await Rubro.findAll({
        where: { estaEliminado : false}
    });
    res.json(rubros);
}