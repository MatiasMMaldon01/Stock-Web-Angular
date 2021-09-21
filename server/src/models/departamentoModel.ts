import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";
import Provincia from "./provinciaModel";


const Departamento = db.define('Departamentos', {
    descripcion: {type: DataTypes.STRING},
    estaEliminado: {type: DataTypes.BOOLEAN}
});

Departamento.belongsTo(Provincia, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey : {name: 'provincia_id'}
});

export default Departamento;