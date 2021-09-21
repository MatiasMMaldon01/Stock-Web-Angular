import {Router} from 'express';
import {obtener, insertar, modificar, obtenerPorId, eliminar} from '../controllers/rubroController';
class RubroRoutes {

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

const rubroRoutes = new RubroRoutes();
export default rubroRoutes.router;