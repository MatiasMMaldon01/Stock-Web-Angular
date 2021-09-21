import {Router} from 'express';

class IndexRoutes {

    public router: Router;
    
    constructor(){
        this.router = Router();
        this.config();
    }

    config(): void{
        this.router.get('/', (req, res) => res.send("Bienvenidos al Sistema de Stock con Angular"));
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;