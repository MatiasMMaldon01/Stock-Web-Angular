import { DataTypes } from "sequelize";
import db from '../conexion/dbConexion';

import Cliente from "./clienteModel";

const Comprobante = db.define('Comprobantes',{
    fecha : {type: DataTypes.DATE},
    numero : {type: DataTypes.NUMBER},
    total : {type: DataTypes.NUMBER},
    estaEliminado : {type: DataTypes.BOOLEAN}
});


Comprobante.belongsTo(Cliente, {
    onDelete: 'cascade',
    onUpdate : 'cascade',
    foreignKey : {name : 'cliente_id'}
});

export default Comprobante;