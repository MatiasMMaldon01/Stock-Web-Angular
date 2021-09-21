import {Request, Response} from 'express';
import Marca from '../models/marcaModel';

export const insertar = async (req: Request, res: Response)=>{
    const {body} = req;

    const marca = await Marca.create({
        descripcion: body.descripcion,
    }).then(marca => {
        if (marca){
            res.json(marca);
        }else{
            res.status(404).send('La marca no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const{body} = req;

    const marca = await Marca.findByPk(id);
    if(!marca){
        return res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    }

    await marca.update(body)
    .then(marca=>{
        res.json({marca})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la actualizacion'
        });
    })
}

export const eliminar = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const marca = await Marca.findByPk(id);
    if(!marca){
        return res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    }

    await marca.update({
        estaEliminado : true
    })
    .then(marca=>{
        res.json({marca})
    })
        .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })
}

export const obtenerPorId = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const marca = await Marca.findByPk(id);

    if(!marca){
        res.status(404).json({
            msg: `No existe una marca con el id ${id}`
        });
    }else{
        
        res.json(marca);
    }
}

export const obtener = async(req: Request, res: Response)=>{
    const marcas = await Marca.findAll({
        where: { estaEliminado : false}
    });

    res.json(marcas);
}