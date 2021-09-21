import {Router} from 'express';
import {obtener, crear, modificar, obtenerPorId, eliminar} from '../controllers/departamentoController';

class DepartamentoRoutes {

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

const departamentoRoutes = new DepartamentoRoutes();
export default departamentoRoutes.router;