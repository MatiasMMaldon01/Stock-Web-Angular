import {Router} from 'express';
import {obtener, insertar, modificar, obtenerPorUserId, eliminar} from '../controllers/clienteController';

class ClienteRoutes {

    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', insertar);
        this.router.put('/:id', modificar);
        this.router.get('/:id', obtenerPorUserId);
        this.router.delete('/:id', eliminar);
        this.router.get('/', obtener);
    }
}

const clienteRoutes = new ClienteRoutes();
export default clienteRoutes.router;