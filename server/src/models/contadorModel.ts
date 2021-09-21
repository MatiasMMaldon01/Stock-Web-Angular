import {DataTypes} from 'sequelize';
import db from '../conexion/dbConexion';

const Contador = db.define('Contador',{
    contadorFacturas : {type : DataTypes.NUMBER},
});

export default Contador;