import {Router} from 'express';
import {obtenerPorEmail, signUp, signIn, perfil} from '../controllers/usuarioController';
import {validacionToken} from '../libs/verificarToken'
class UsuarioRoutes {

    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/signup', signUp);
        this.router.post('/signin', signIn);
        this.router.post('/obtenerUsuario', obtenerPorEmail);
        this.router.get('/perfil', validacionToken, perfil)
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;