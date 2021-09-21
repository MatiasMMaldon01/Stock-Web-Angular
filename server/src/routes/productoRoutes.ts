import {Router} from 'express';
import {obtener, insertar, modificar, obtenerPorId, eliminar} from '../controllers/productoController';

class ProductoRoutes {

    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', insertar);
        this.router.put('/:id', modificar);
        this.router.delete('/:id', eliminar);
        this.router.get('/:id', obtenerPorId);
        this.router.get('/', obtener);
    }
}

const productoRoutes = new ProductoRoutes();
export default productoRoutes.router;