import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";

import Usuario from "./usuarioModel";
import Departamento from "./departamentoModel";
import Localidad from "./localidadModel";
import Pais from "./paisModel";
import Provincia from "./provinciaModel";

const Cliente = db.define('Clientes',{
    nombre : {type : DataTypes.STRING},
    apellido :  {type : DataTypes.STRING},
    direccion :  {type : DataTypes.STRING},
    celular :  {type : DataTypes.STRING},
    dni :  {type : DataTypes.STRING},
    estaEliminado : {type : DataTypes.BOOLEAN}
})


Cliente.belongsTo(Usuario,{
    onDelete: 'cascade',
    onUpdate : 'cascade',
    foreignKey : {name : 'usuario_id'}
})

Cliente.belongsTo(Pais,{
    onDelete: 'cascade',
    onUpdate : 'cascade',
    foreignKey : {name : 'pais_id'}
})

Cliente.belongsTo(Provincia,{
    onDelete : 'cascade',
    onUpdate: 'cascade',
    foreignKey : {name : 'provincia_id'}
})

Cliente.belongsTo(Departamento,{
    onDelete : 'cascade',
    onUpdate: 'cascade',
    foreignKey : {name : 'departamento_id'}
})

Cliente.belongsTo(Localidad,{
    onDelete: 'cascade',
    onUpdate : 'cascade',
    foreignKey : {name : 'localidad_id'}
})

export default Cliente;