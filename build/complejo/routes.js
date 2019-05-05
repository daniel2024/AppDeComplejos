"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Complejo_1 = __importDefault(require("./Complejo"));
class IndexRoutesComplejos {
    constructor() {
        this.conversionesDeComplejoRecToPolar = (reques, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                let resultado;
                if (reques.body.tranformacion == 'polar') {
                    let { real, imag } = reques.body;
                    resultado = yield Complejo_1.default.rectangularToPolar(real, imag);
                }
                else {
                    let { mod, angle } = reques.body;
                    resultado = yield Complejo_1.default.polarToRectangular(mod, angle);
                }
                return response.render('complejosViews/mostrarResultados', { resultado });
            }
            catch (error) {
            }
        });
        this.operacionesAritmeticasDeComplejos = (reques, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(reques.body);
                let { element, operacion } = reques.body;
                let resultado;
                let z1 = (element[0].tipo == 'binomica') ? element[0] : yield Complejo_1.default.polarToRectangular(element[0].mod, element[0].angle);
                let z2 = (element[1].tipo == 'binomica') ? element[1] : yield Complejo_1.default.polarToRectangular(element[1].mod, element[1].angle);
                switch (operacion) {
                    case 'suma':
                        resultado = yield Complejo_1.default.suma(z1, z2);
                        break;
                    case 'resta':
                        resultado = yield Complejo_1.default.resta(z1, z2);
                        break;
                    case 'producto':
                        resultado = yield Complejo_1.default.producto(z1, z2);
                        break;
                    case 'cociente':
                        resultado = yield Complejo_1.default.cociente(z1, z2);
                        break;
                    default: break;
                }
                return response.render('complejosViews/mostrarResultados', { resultado });
            }
            catch (error) {
            }
        });
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', this.prevPolar);
        this.router.get('/operaciones', this.prevOperaciones);
        this.router.post('/tranformar', this.conversionesDeComplejoRecToPolar);
        this.router.post('/operaciones/realizar', this.operacionesAritmeticasDeComplejos);
    }
    prevPolar(reques, response) {
        response.render('complejosViews/pasajes');
    }
    prevOperaciones(reques, response) {
        response.render('complejosViews/operaciones');
    }
}
const indexRouter = new IndexRoutesComplejos();
indexRouter.routes();
exports.default = indexRouter.router;
