import { DataTypes } from "sequelize";
import db from '../conexion/dbConexion';
import Comprobante from "./comprobanteModel";
import Producto from "./productosModel";

const DetalleComprobante = db.define('detalleComprobantes',{
    descripcion : {type: DataTypes.STRING},
    precio : {type: DataTypes.DECIMAL},
    cantidad : {type: DataTypes.NUMBER},
    subtotal : {type: DataTypes.DECIMAL},
    estaEliminado : {type: DataTypes.BOOLEAN}
});

DetalleComprobante.belongsTo(Comprobante,{
    onDelete: "cascade",
    onUpdate: "cascade",
    foreignKey: {name: "comprobante_id"}
});

DetalleComprobante.belongsTo(Producto,{
    onDelete: "cascade",
    onUpdate: "cascade",
    foreignKey: {name: "producto_id"}
});

export default DetalleComprobante;