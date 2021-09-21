import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";
import Pais from "./paisModel";


const Provincia = db.define('Provincias', {
    descripcion: {type: DataTypes.STRING},
    estaEliminado: {type: DataTypes.BOOLEAN}
});

Provincia.belongsTo(Pais, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey : {name: 'pais_id'}
});

export default Provincia;