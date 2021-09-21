import {Router} from 'express';
import {obtener, crear, modificar, obtenerPorId, eliminar} from '../controllers/provinciaController';
class ProvinciaRoutes {

    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', crear);
        this.router.put('/:id', modificar);
        this.router.delete('/:id', eliminar);
        this.router.get('/:id', obtenerPorId);
        this.router.get('/', obtener);
    }
}

const provinciaRoutes = new ProvinciaRoutes();
export default provinciaRoutes.router;