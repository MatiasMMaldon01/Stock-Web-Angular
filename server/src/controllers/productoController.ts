import {Request, Response} from 'express';

import Marca from '../models/marcaModel';
import Producto from '../models/productosModel';
import Rubro from '../models/rubroModel';

export const insertar = async (req: Request, res: Response)=>{
    const {body} = req;

    const producto = await Producto.create({
        codigo: body.codigo,
        descripcion : body.descripcion,
        cantidad : body.cantidad,
        marca_id : body.marca_id,
        rubro_id : body.rubro_id,
        precioCosto : body.precioCosto,
        precioVenta : body.precioVenta,
        imagen : body.imagen,
        stockMinimo : body.stockMinimo,
        stockNegativo: body.stockNegativo
    }).then(producto => {
        if (producto){
            res.json(producto);
        }else{
            res.status(404).send('El producto no se pudo crear');
        }
    })
}

export const modificar = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        const producto = await Producto.findByPk(id,{
            include: [{
                model: Marca,
                attributes : ['descripcion']
            }, {
                model : Rubro,
                attributes : ['descripcion']
            }]
        });
    
        if(!producto){
            return res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
    
        await producto.update(body)
        .then(producto=>{
            res.json({producto})
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

    const producto = await Producto.findByPk(id);
    
    if(!producto){
        return res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }

    await producto.update({ estaEliminado : true})
    .then(producto=>{
        res.json({producto})
    })
    .catch(error=>{
        res.status(404).json({
            msg: 'No se pude realizar la eliminacion'
        });
    })


}

export const obtenerPorId = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const producto = await Producto.findByPk(id,{
        include: [{
            model: Marca,
            attributes : ['descripcion']
        }, {
            model : Rubro,
            attributes : ['descripcion']
        }]
    });

    if(!producto){
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }else{
        
        res.json(producto);
    }
}

export const obtener = async(req: Request, res: Response)=>{
    const productos = await Producto.findAll({
        where: { estaEliminado : false},
        include: [{
            model: Marca,
            attributes : ['descripcion']
        }, {
            model : Rubro,
            attributes : ['descripcion']
        }]
    });
    res.json(productos);
}