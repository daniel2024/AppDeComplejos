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
                //console.log(reques.body)
                let { operacion } = reques.body;
                let resultado;
                let { z1, z2 } = yield Complejo_1.default.filtrarDatos(reques.body);
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
                console.log(resultado);
                return response.render('complejosViews/mostrarResultadosOperacionesBasicas', { resultado });
            }
            catch (error) {
            }
        });
        this.operacionesDeComplejosAvanzadas = (reques, response) => __awaiter(this, void 0, void 0, function* () {
            let { operacion, exponente } = reques.body;
            let { z1 } = yield Complejo_1.default.filtrarDatos(reques.body);
            let resultado;
            if (operacion == 'potencia') {
                resultado = yield Complejo_1.default.potenciaToReal(z1, exponente);
            }
            else {
                resultado = yield Complejo_1.default.radicacionToReal(z1, exponente);
            }
            console.log(resultado);
            response.render('complejosViews/mostrarResultadosOperacionesAvanzadas', { resultado });
        });
        this.operacionesSumaDeFasores = (reques, response) => __awaiter(this, void 0, void 0, function* () {
            console.log(JSON.stringify(reques.body, null, 2));
            let f1;
            let f2;
            let resultados = [];
            let aux_resultado;
            f1 = {
                tipo: reques.body.tipo_F1,
                w: reques.body.w_F1,
                Amp: reques.body.amp_F1,
                faseInicial: reques.body.faseInicial_F1
            };
            f2 = {
                tipo: reques.body.tipo_F2,
                w: reques.body.w_F2,
                Amp: reques.body.amp_F2,
                faseInicial: reques.body.faseInicial_F2
            };
            //let { z1, z2, tipo, w } = reques.body
            let resultado = yield Complejo_1.default.sumaDeFasores(yield Complejo_1.default.funcToFasor(f1), yield Complejo_1.default.funcToFasor(f2));
            console.log(JSON.stringify(resultado, null, 2));
            aux_resultado = {
                amp: resultado.mod,
                w: f1.w,
                faseInicial: resultado.angle,
                tipo: "Cos"
            };
            resultados.push(aux_resultado);
            aux_resultado = {
                amp: resultado.mod,
                w: f1.w,
                faseInicial: resultado.angle + (1 / 2),
                tipo: "Sen"
            };
            resultados.push(aux_resultado);
            console.log(JSON.stringify(resultados, null, 2));
            response.render('complejosViews/mostrarResultadosFasores', { resultados });
        });
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', this.prevPolar);
        this.router.get('/operaciones', this.prevOperaciones);
        this.router.get('/operacionesAvanzadas', this.prevOperacionesAvanzadas);
        this.router.get('/fasores', this.prevFasores);
        this.router.post('/tranformar', this.conversionesDeComplejoRecToPolar);
        this.router.post('/operaciones/realizar', this.operacionesAritmeticasDeComplejos);
        this.router.post('/operacionesAvanzadas/realizar', this.operacionesDeComplejosAvanzadas);
        this.router.post('/operaciones/sumarfasores', this.operacionesSumaDeFasores);
    }
    prevPolar(reques, response) {
        response.render('complejosViews/pasajes');
    }
    prevOperaciones(reques, response) {
        response.render('complejosViews/operaciones');
    }
    prevOperacionesAvanzadas(reques, response) {
        response.render('complejosViews/operacionesAvanzadas');
    }
    prevFasores(reques, response) {
        response.render('complejosViews/fasores');
    }
}
const indexRouter = new IndexRoutesComplejos();
indexRouter.routes();
exports.default = indexRouter.router;
