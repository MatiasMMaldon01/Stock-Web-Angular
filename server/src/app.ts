import dotenv from 'dotenv';

import express, {Application} from 'express';

//Middlewares
import morgan from 'morgan';
import cors from 'cors';

import db from './conexion/dbConexion';
import indexRoutes from './routes/indexRoutes';

// ============== Ubicaciones ============== //

import paisRoutes from './routes/paisRoutes';
import provinciaRoutes from './routes/provinciaRoutes';
import departamentoRoutes from './routes/departamentoRoutes';
import localidadRoutes from './routes/localidadRoutes';


// ============== Producto ============== //

import marcaRoutes from './routes/marcaRoutes';
import rubroRoutes from './routes/rubroRoutes';
import productoRoutes from './routes/productoRoutes';

// ============== Cliente ============== //

import clienteRoutes from './routes/clienteRoutes';
import usuarioRoutes from './routes/usuarioRoutes';

// ============== Configuracion ============== //

import configuracionRoutes from './routes/configuracionRoutes';

// ============== Ventas ============== //

import ventaRoutes from './routes/ventaRoutes';

class Server {
    public app: Application;

    constructor(){
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
        this.dbConnection();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes():void{
        this.app.get('/', indexRoutes);
        this.app.use('/api/pais', paisRoutes);
        this.app.use('/api/marca', marcaRoutes);
        this.app.use('/api/rubro', rubroRoutes);
        this.app.use('/api/productos', productoRoutes);
        this.app.use('/api/provincia', provinciaRoutes);
        this.app.use('/api/departamento', departamentoRoutes);
        this.app.use('/api/localidad', localidadRoutes);
        this.app.use('/api/configuracion', configuracionRoutes);
        this.app.use('/api/clientes', clienteRoutes);
        this.app.use('/api/usuarios', usuarioRoutes);
        this.app.use('/api/venta', ventaRoutes);
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Established Connection');
            
        } catch (error) {
            throw new Error(error);
        }
    }

    start(): void {
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();