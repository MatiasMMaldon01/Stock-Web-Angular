import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";
import Producto from "./productosModel";


const Marca = db.define('Marcas', {
    descripcion: {type: DataTypes.STRING},
    estaEliminado: {type: DataTypes.BOOLEAN}
});


export default Marca;

