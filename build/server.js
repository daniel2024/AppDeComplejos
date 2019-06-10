"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.app.use(express_1.default.json()); //el tranformado de json va antes de la config
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.config();
        this.routes();
    }
    config() {
        //settings
        this.app.set('port', process.env.PORT || 9000);
        //plantillas (vistas del view)
        this.app.set('Views', path_1.default.join(__dirname, 'Views'));
        this.app.engine(".hbs", express_handlebars_1.default({
            layoutsDir: path_1.default.join(this.app.get('views'), "layouts"),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set("view engine", '.hbs');
        //midelware
        this.app.use(morgan_1.default('dev'));
        this.app.use(helmet_1.default());
    }
    routes() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
        this.app.use('/', indexRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port: ' + this.app.get('port'));
        });
    }
}
const server = new Server;
server.start();
