import { DataTypes } from "sequelize";
import db from "../conexion/dbConexion";
import Marca from "./marcaModel";
import Rubro from "./rubroModel";


const Producto = db.define('Productos',{
    codigo: {type: DataTypes.INTEGER},
    descripcion : {type: DataTypes.STRING},
    cantidad : {type: DataTypes.INTEGER},
    precioCosto : {type: DataTypes.INTEGER},
    precioVenta : {type: DataTypes.INTEGER},
    stockMinimo : {type: DataTypes.INTEGER},
    stockNegativo: {type: DataTypes.BOOLEAN},
    imagen: {type: DataTypes.STRING},
    estaEliminado : {type: DataTypes.BOOLEAN}
});


Producto.belongsTo(Marca,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey : {name: 'marca_id'}
});


Producto.belongsTo(Rubro,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey : {name: 'rubro_id'}
});

export default Producto;