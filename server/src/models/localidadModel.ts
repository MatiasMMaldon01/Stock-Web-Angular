import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";
import Departamento from "./departamentoModel";


const Localidad = db.define('Localidades', {
    descripcion: {type: DataTypes.STRING},
    estaEliminado: {type: DataTypes.BOOLEAN}
});

Localidad.belongsTo(Departamento, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey : {name: 'departamento_id'}
});

export default Localidad;