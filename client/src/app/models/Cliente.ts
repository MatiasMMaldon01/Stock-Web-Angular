export interface Cliente{
    id : number;
    nombre : string;
    apellido : string;
    direccion : string;
    celular : string;
    dni : string;
    estaEliminado : boolean;
    usuario_id : number;
    Usuario: {
        id? : number;
        email : string;
        contrasena : string;
        esAdmin : boolean;
        estaEliminado : boolean;
        createdat? : Date;
        updatedat? : Date;       
    }
    pais_id : number;
    provincia_id : number;
    departamento_id : number;
    localidad_id : number;
    createdat? : Date;
    updatedat? : Date;
}