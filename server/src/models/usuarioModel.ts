import { DataTypes, Model } from 'sequelize';
import db from '../conexion/dbConexion';

const Usuario = db.define('Usuarios',{
    email : {type : DataTypes.STRING},
    contrasena : {type : DataTypes.STRING},
    esAdmin : {type: DataTypes.BOOLEAN},
    estaEliminado : {type : DataTypes.BOOLEAN}
});

export default Usuario;


