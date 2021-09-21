export interface Producto{
    id : number;
    codigo : number;
    descripcion : string
    cantidad : number;
    precioCosto : number;
    precioVenta : number;
    stockMinimo : number;
    imagen : string;
    stockNegativo: boolean;
    estaEliminado : boolean;
    createdat? : Date;
    updatedat? : Date;
    marca_id : number;
    rubro_id : number;
}