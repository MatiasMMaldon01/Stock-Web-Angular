import {Router} from 'express';
import {facturar, obtener, obtenerPorCliente, obtenerDetalleComprobante} from '../controllers/ventaController';

class VentaRoutes {

    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', facturar);
        this.router.get('/obtenerPorCLiente/:id', obtenerPorCliente);
        this.router.get('/', obtener);
        this.router.get('/obtenerDetalleComprobante/:id', obtenerDetalleComprobante)
    }
}

const ventaRoutes = new VentaRoutes();
export default ventaRoutes.router;