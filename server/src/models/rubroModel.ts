import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";
import Producto from "./productosModel";


const Rubro = db.define('Rubros', {
    descripcion: {type: DataTypes.STRING},
    estaEliminado: {type: DataTypes.BOOLEAN}
});

export default Rubro;