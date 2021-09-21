import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";

import Departamento from "./departamentoModel";
import Localidad from "./localidadModel";
import Pais from "./paisModel";
import Provincia from "./provinciaModel";
import Contador from "./contadorModel";

const Configuracion = db.define('Configuracion',{
    razonSocial : {type : DataTypes.INTEGER},
    cuil : {type : DataTypes.STRING},
    direccion : {type : DataTypes.STRING},
    celular : {type : DataTypes.STRING},
    estaEliminado : {type : DataTypes.BOOLEAN}
})

Configuracion.belongsTo(Contador,{
    onDelete: 'cascade',
    onUpdate : 'cascade',
    foreignKey : {name : 'contador_id'}
})

Configuracion.belongsTo(Pais,{
    onDelete: 'cascade',
    onUpdate : 'cascade',
    foreignKey : {name : 'pais_id'}
})

Configuracion.belongsTo(Provincia,{
    onDelete : 'cascade',
    onUpdate: 'cascade',
    foreignKey : {name : 'provincia_id'}
})

Configuracion.belongsTo(Departamento,{
    onDelete : 'cascade',
    onUpdate: 'cascade',
    foreignKey : {name : 'departamento_id'}
})

Configuracion.belongsTo(Localidad,{
    onDelete: 'cascade',
    onUpdate : 'cascade',
    foreignKey : {name : 'localidad_id'}
})

export default Configuracion;
