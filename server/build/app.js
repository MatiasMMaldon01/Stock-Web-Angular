"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
//Middlewares
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dbConexion_1 = __importDefault(require("./conexion/dbConexion"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
// ============== Ubicaciones ============== //
const paisRoutes_1 = __importDefault(require("./routes/paisRoutes"));
const provinciaRoutes_1 = __importDefault(require("./routes/provinciaRoutes"));
const departamentoRoutes_1 = __importDefault(require("./routes/departamentoRoutes"));
const localidadRoutes_1 = __importDefault(require("./routes/localidadRoutes"));
// ============== Producto ============== //
const marcaRoutes_1 = __importDefault(require("./routes/marcaRoutes"));
const rubroRoutes_1 = __importDefault(require("./routes/rubroRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
// ============== Cliente ============== //
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
// ============== Configuracion ============== //
const configuracionRoutes_1 = __importDefault(require("./routes/configuracionRoutes"));
// ============== Ventas ============== //
const ventaRoutes_1 = __importDefault(require("./routes/ventaRoutes"));
class Server {
    constructor() {
        dotenv_1.default.config();
        this.app = express_1.default();
        this.config();
        this.routes();
        this.dbConnection();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.get('/', indexRoutes_1.default);
        this.app.use('/api/pais', paisRoutes_1.default);
        this.app.use('/api/marca', marcaRoutes_1.default);
        this.app.use('/api/rubro', rubroRoutes_1.default);
        this.app.use('/api/productos', productoRoutes_1.default);
        this.app.use('/api/provincia', provinciaRoutes_1.default);
        this.app.use('/api/departamento', departamentoRoutes_1.default);
        this.app.use('/api/localidad', localidadRoutes_1.default);
        this.app.use('/api/configuracion', configuracionRoutes_1.default);
        this.app.use('/api/clientes', clienteRoutes_1.default);
        this.app.use('/api/usuarios', usuarioRoutes_1.default);
        this.app.use('/api/venta', ventaRoutes_1.default);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConexion_1.default.authenticate();
                console.log('Established Connection');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
