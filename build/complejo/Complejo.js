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
const mathjs_1 = __importDefault(require("mathjs"));
class Complejo {
    constructor(real, imaginario, mod, angle) {
        this.real = real;
        this.imaginario = imaginario;
        this.mod = mod;
        this.angle = angle;
    }
    rectangularToPolar(real, imaginario) {
        return __awaiter(this, void 0, void 0, function* () {
            let modulo = yield this.modulo(real, imaginario);
            let angle = yield this.argumento(real, imaginario);
            return new Complejo(real, imaginario, modulo, angle);
        });
    }
    polarToRectangular(mod, arg) {
        return __awaiter(this, void 0, void 0, function* () {
            let real = yield this.re(mod, arg);
            let imaginario = yield this.im(mod, arg);
            return new Complejo(real, imaginario, mod, arg);
        });
    }
    ;
    modulo(re, im) {
        return mathjs_1.default.sqrt(re * re + im * im);
    }
    ;
    argumento(re, im) {
        return (mathjs_1.default.atan2(im, re) < 0 ? mathjs_1.default.atan2(im, re) + 2 * mathjs_1.default.pi : mathjs_1.default.atan2(im, re)) / mathjs_1.default.pi;
    }
    ;
    re(mod, arg) {
        return mod * parseFloat(mathjs_1.default.cos(arg * mathjs_1.default.pi).toFixed(10));
        ;
    }
    ;
    im(mod, arg) {
        return mod * parseFloat(mathjs_1.default.sin(arg * mathjs_1.default.pi).toFixed(10));
    }
    ;
    //-----------operaciones de Complejos-----------------
    //suma de dos números complejos
    suma(z1, z2) {
        return __awaiter(this, void 0, void 0, function* () {
            let x = Number(z1.real) + Number(z2.real);
            let y = Number(z1.imaginario) + Number(z2.imaginario);
            return yield this.rectangularToPolar(x, y);
        });
    }
    //resta de dos números complejos
    resta(z1, z2) {
        return __awaiter(this, void 0, void 0, function* () {
            let x = Number(z1.real) - Number(z2.real);
            let y = Number(z1.imaginario) - Number(z2.imaginario);
            return yield this.rectangularToPolar(x, y);
        });
    }
    //producto de dos números complejos
    producto(z1, z2) {
        return __awaiter(this, void 0, void 0, function* () {
            let x = Number(z1.real) * Number(z2.real) - Number(z1.imaginario) * Number(z2.imaginario);
            let y = Number(z1.real) * Number(z2.imaginario) + Number(z2.real) * Number(z1.imaginario);
            return yield this.rectangularToPolar(x, y);
        });
    }
    //cociente de dos números complejos
    //excepción cuando el complejo denominador es cero
    cociente(z1, z2) {
        return __awaiter(this, void 0, void 0, function* () {
            let denominador = Number(z2.real) * Number(z2.real) + Number(z2.imaginario) * Number(z2.imaginario);
            let x = (Number(z1.real) * Number(z2.real) + (Number(z1.imaginario) * (z2.imaginario))) / denominador;
            let y = (z1.imaginario * Number(z2.real) + Number(z1.real) * (-z2.imaginario)) / denominador;
            return yield this.rectangularToPolar(x, y);
        });
    }
    filtrarDatos(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let z1 = (body.formaZ1 == 'binomica') ? yield this.rectangularToPolar(body.realZ1, body.imaginarioZ1) : yield this.polarToRectangular(body.modZ1, body.angleZ1);
            let z2 = (body.formaZ2 == 'binomica') ? yield this.rectangularToPolar(body.realZ2, body.imaginarioZ2) : yield this.polarToRectangular(body.modZ2, body.angleZ2);
            return { z1, z2 };
        });
    }
    //Operaciones Avanzadas
    //Potencia de un complejo elevado a un real
    potenciaToReal(z1, num) {
        return __awaiter(this, void 0, void 0, function* () {
            let mod;
            let tita;
            if (z1.tipo == 'binomica') {
                mod = yield mathjs_1.default.pow(this.modulo(z1.real, z1.imaginario), num);
                tita = (yield this.argumento(z1.real, z1.imaginario)) * num;
            }
            else {
                mod = yield mathjs_1.default.pow(z1.mod, num);
                tita = z1.angle * num;
            }
            return yield this.polarToRectangular(Number(mod), tita);
        });
    }
    potenciaToComplejo(z1, z2) {
        return __awaiter(this, void 0, void 0, function* () {
            let Z1_elevado = this.rectangularToPolar(Number(yield mathjs_1.default.log(yield this.modulo(z1.real, z1.imaginario))), yield this.argumento(z1.real, z1.imaginario));
            let resultado = yield this.producto(z2, Z1_elevado);
            return this.polarToRectangular(mathjs_1.default.exp(resultado.real), resultado.imaginario);
        });
    }
    radicacionToReal(z1, num) {
        return __awaiter(this, void 0, void 0, function* () {
            let mod = yield mathjs_1.default.pow(this.modulo(z1.real, z1.imaginario), 1 / num);
            let angulos = [];
            let fase_inicial = yield this.argumento(z1.real, z1.imaginario);
            let aux;
            for (let k = 0; k < num; k++) {
                if (mod == 1) {
                    aux = {
                        w: (fase_inicial + (2 * k * mathjs_1.default.pi)) / num,
                        primitiva: (yield this.MCD(k, num)) == 1 ? true : false
                    };
                }
                else {
                    aux = (fase_inicial + (2 * k * mathjs_1.default.pi)) / num;
                }
                angulos.push(aux);
            }
            return { mod, angulos };
        });
    }
    //funciones axuliares
    divisores(numero) {
        let divisores = [];
        for (let k = 1; k <= numero; k++) {
            if (numero % k == 0)
                divisores.push(k);
        }
        return divisores;
    }
    MCD(c, d) {
        return __awaiter(this, void 0, void 0, function* () {
            let divisores = [];
            let a = yield this.divisores(c);
            let b = yield this.divisores(d);
            for (let k = 0; k < b.length; k++) {
                if (a.indexOf(b[k]) >= 0)
                    divisores.push(b[k]);
            }
            return divisores.pop();
        });
    }
}
exports.default = new Complejo(0, 0, 0, 0);
