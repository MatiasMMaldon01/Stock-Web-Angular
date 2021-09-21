import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface ICifrado {
    id: number;
    iat:number;
    exp:number;
}

export const validacionToken = (req:Request, res:Response, next:NextFunction) => {
    var token = req.header('usuario-token');
    if (!token) return res.status(401).json({ msg: 'No hay Token, permiso no válido' });
    

    try {
        const cifrado = jwt.verify(token, process.env.TOKEN || "token") as ICifrado;
        req.clienteId = cifrado.id;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}