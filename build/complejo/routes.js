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
                console.log(reques.body);
                if (reques.body.tranformacion == 'polar') {
                    let { real, imag } = reques.body;
                    resultado = yield Complejo_1.default.rectangularToPolar(real, imag);
                }
                else {
                    let { mod, angle } = reques.body;
                    resultado = yield Complejo_1.default.polarToRectangular(mod, angle);
                }
                console.log(resultado);
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
        this.router.post('/tranformar', this.conversionesDeComplejoRecToPolar);
    }
    prevPolar(reques, response) {
        response.render('complejosViews/pasajes');
    }
}
const indexRouter = new IndexRoutesComplejos();
indexRouter.routes();
exports.default = indexRouter.router;
