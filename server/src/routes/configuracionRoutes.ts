import {Router} from 'express';
import {obtener, insertar, modificar} from '../controllers/configuracionController';

class ConfiguracionRoutes {

    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', insertar);
        this.router.put('/:id', modificar);
        this.router.get('/', obtener);
    }
}

const configuracionRoutes = new ConfiguracionRoutes();
export default configuracionRoutes.router;
