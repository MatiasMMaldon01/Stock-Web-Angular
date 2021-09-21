import { Request, Response } from 'express';
import Pais from '../models/paisModel';

export const crear = async (req: Request, res: Response) =>{
    const {body} = req;

    const pais = await Pais.create({
        descripcion: body.descripcion,
    }).then(pais => {
        if (pais){
            res.json(pais);
        }else{
            res.status(404).send('El pais no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;

    const pais = await Pais.findByPk(id);
    if(!pais){
        return res.status(404).json({
            msg: `No existe un pais con el id ${id}`
        });
    }

    await pais.update(body)
    .then(pais=>{
        res.json({pais})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    });

}

export const eliminar = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const pais = await Pais.findByPk(id);
    if(!pais){
        return res.status(404).json({
            msg: `No existe un pais con el id ${id}`
        });
    }

    await pais.update({
        estaEliminado : true
    })
    .then(pais=>{
        res.json({pais})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })
    
}

export const obtenerPorId = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const pais = await Pais.findByPk(id);

    if(!pais){
        res.status(404).json({
            msg: `No existe un pais con el id ${id}`
        });
    }else{
        
        res.json(pais);
    }
}

export const obtener = async (req: Request, res: Response) =>{
    const paises = await Pais.findAll({
        where: {estaEliminado : false}
    });

    res.json(paises);
}
