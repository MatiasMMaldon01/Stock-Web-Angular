import { Request, Response } from "express";

import db from "../conexion/dbConexion";
import  Sequelize  from "sequelize";
import cls from 'cls-hooked';

import Comprobante from "../models/comprobanteModel";
import Cliente from "../models/clienteModel";
import Producto from "../models/productosModel";
import DetalleComprobante from "../models/detalleComprobanteModel";
import Contador from "../models/contadorModel";
import Configuracion from "../models/configuracionModel";
import Pais from "../models/paisModel";
import Provincia from "../models/provinciaModel";
import Departamento from "../models/departamentoModel";
import Localidad from "../models/localidadModel";


export const facturar = async (req: Request, res:Response) =>{

    const t = await db.transaction();
    
    try {
        const {body} = req;
        let respuesta: any = [];
        
        const comprobante = body.comprobante;
        const detalleComprobante = body.detalleComprobante;
    
        let producto: any = {
            id: 0,
            codigo: 0,
            descripcion : "",
            cantidad : 0,
            precioCosto : 0,
            precioVenta : 0,
            stockMinimo : 0,
            stockNegativo: false,
            imagen: "",
            marca_id: 0,
            rubro_id: 0
        };
        
        let contador: any = {
            id: 0,
            contadorFacturas: 0
        };
    
        let configuracion: any = {
            id : 0,
            razonSocial: '',
            cuil : '',
            contador_id : 0,
            direccion : '',
            celular : '',
            estaEliminado : false,
            createdat : new Date,
            updatedat : new Date,
            pais_id : 0,
            provincia_id : 0,
            departamento_id : 0,
            localidad_id : 0
        }
        
        await Contador.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]],
            transaction: t
        })
        .then(result =>{
            if(result){
                contador = result[0];
            }
        }); 
        
        
        contador.contadorFacturas++;
    
        await Comprobante.create({
            cliente_id : comprobante.cliente_id,
            fecha : new Date,
            numero : contador.contadorFacturas,
            total : comprobante.total       
        }, {transaction: t}).then(comprobante =>{
            if(comprobante){
                respuesta = comprobante;
            }else{
                res.status(404).send('El comprobante no se pudo crear');
            }
        });
    
        await Contador.create({
            contadorFacturas: contador.contadorFacturas
        }, {transaction: t}).then( result =>{
            if (!result){
                res.status(404).send('El contador no se pudo incrementar');
            }
        });
    
        await Configuracion.findByPk(1,{
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
            }],
            transaction : t
        }).then(result=>{
            configuracion = result;
        })
    
        if(!configuracion){
            return res.status(404).json({
                msg: `No hay una configuracion existente por parte del vendedor`
            });
        }
    
        await Contador.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]], 
            transaction: t
        })
        .then(result =>{
            if(result){
                contador = result[0];
            }
        }); 
        

        await Configuracion.update({contador_id: contador.id},
            { where: { 
                id: 1
            },
            transaction : t
        });

        var comprobante_id: any = { id: 1};
    
        await Comprobante.findAll({
            limit: 1,
            attributes: ['id'],
            order: [ [ 'createdAt', 'DESC' ]],
            transaction : t
          })
          .then(result =>{
            if(result){
                comprobante_id = result[0];
            }
        }); 


        for(let i=0; i< detalleComprobante.length; i++){
            await Producto.findByPk(detalleComprobante[i].id, {transaction : t})
               .then(result =>{
                   if(!result){
                       res.status(404).json({
                           msg: `No existe un producto con el id ${detalleComprobante[i].id}`
                       });
                   }else{
                       producto = result;
                   }
               });
       
               if(detalleComprobante[i].cantidad <= producto.cantidad){
                   producto.cantidad -= detalleComprobante[i].cantidad;
               }
       
               await Producto.update({cantidad: producto.cantidad},{
                   where: {
                       id: producto.id
                   },
                   transaction: t
               }); 
    
               await DetalleComprobante.create({
                   producto_id: detalleComprobante[i].id,
                   descripcion: detalleComprobante[i].descripcion,
                   cantidad: detalleComprobante[i].cantidad,
                   precio: detalleComprobante[i].precioVenta,
                   subtotal: detalleComprobante[i].subtotal,
                   comprobante_id : comprobante_id.id
               }, {transaction : t})
        }

        
        await t.commit();
        res.json("La venta se realizo con exito");  
               
    } catch (error) {
        await t.rollback();
    }
    
}

export const obtener = async (req: Request, res:Response) =>{
    const comprobantes = await Comprobante.findAll({
        where: { estaEliminado : false},
        include:{ 
            model: Cliente,
            attributes: ['nombre', 'apellido', 'dni'] 
        }
    });

    if(!comprobantes){
        res.status(404).json({
            msg: `No existen comprobantes todavia`
        });
    }else{
        res.json(comprobantes);
    }
}

export const obtenerPorCliente = async (req: Request, res:Response) =>{
    const {id} = req.params;

    const comprobante = await Comprobante.findAll({
        where: { cliente_id : id},
        include:{ 
            model: Cliente,
            attributes: ['nombre', 'apellido', 'dni'] 
        }
    });

    if(!comprobante){
        res.status(404).json({
            msg: `No existe un comprobante para este cliente`
        });
    }else{
        res.json(comprobante);
    }
}

export const obtenerDetalleComprobante = async (req: Request, res: Response) =>{
    const {id} = req.params;

    const detalleComprobante = await DetalleComprobante.findAll({
        where: { comprobante_id : id},
        include:{ 
            model: Producto,
            attributes: ['imagen'] 
        }
    });

    if(!detalleComprobante){
        res.status(404).json({
            msg: `No existe un detalle para ese comprobante`
        });
    }else{
        res.json(detalleComprobante);
    }
}