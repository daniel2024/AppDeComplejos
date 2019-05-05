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
}
exports.default = new Complejo(0, 0, 0, 0);
