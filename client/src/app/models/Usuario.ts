export interface Usuario{
    id? : number;
    email : string;
    contrasena : string;
    esAdmin : boolean;
    estaEliminado : boolean;
    createdat? : Date;
    updatedat? : Date;
}