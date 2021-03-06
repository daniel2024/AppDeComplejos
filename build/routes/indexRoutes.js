"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../complejo/routes"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    // defini cion de funciones o importar metodos ya hechos 
    routes() {
        this.router.use(routes_1.default);
    }
}
const indexRouter = new IndexRoutes();
indexRouter.routes();
exports.default = indexRouter.router;
