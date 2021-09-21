import {Router} from 'express';
import {obtener, crear, modificar, obtenerPorId, eliminar} from '../controllers/paisController';

class PaisRoutes {

    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', crear);
        this.router.put('/:id', modificar);
        this.router.get('/:id', obtenerPorId);
        this.router.delete('/:id', eliminar);
        this.router.get('/', obtener);
    }
}

const paisRoutes = new PaisRoutes();
export default paisRoutes.router;