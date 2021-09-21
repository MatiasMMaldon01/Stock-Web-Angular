import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";


const Pais = db.define('Pais', {
    descripcion: {type: DataTypes.STRING},
    estaEliminado: {type: DataTypes.BOOLEAN}
});


export default Pais;