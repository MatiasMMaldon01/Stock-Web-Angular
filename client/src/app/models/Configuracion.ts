export interface Configuracion{
    id? : number;
    nombre : string;
    apellido : string;
    domicilio : string;
    ult_nro_comprobante : number;
    direccion : string;
    celular : string;
    estaEliminado : boolean;
    pais_id : number;
    provincia_id : number;
    departamento_id : number;
    localidad_id : number;
    createdat? : Date;
    updatedat? : Date;
}