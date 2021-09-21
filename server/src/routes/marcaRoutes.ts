import {Router} from 'express';
import {insertar, modificar, eliminar, obtenerPorId, obtener} from '../controllers/marcaController';

class MarcaRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config(){
        this.router.post('/', insertar);
        this.router.put('/:id', modificar);
        this.router.delete('/:id', eliminar);
        this.router.get('/:id', obtenerPorId);
        this.router.get('/', obtener);
    }
}

const marcaRoutes = new MarcaRouter();
export default marcaRoutes.router;