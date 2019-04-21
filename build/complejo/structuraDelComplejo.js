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
    constructor(real, imaginario, abs, arg) {
        this.real = real;
        this.imaginario = imaginario;
        this.abs = abs || this.modulo(real, imaginario);
        this.arg = arg || this.argumento(real, imaginario);
    }
    rectangularToPolar(real, imaginario) {
        return __awaiter(this, void 0, void 0, function* () {
            let modulo = yield this.modulo(real, imaginario);
            let argumento = yield this.argumento(real, imaginario);
            return new Complejo(real, imaginario, modulo, argumento);
        });
    }
    polarTobinomica(mod, arg) {
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
        ;
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
}
exports.default = Complejo;
