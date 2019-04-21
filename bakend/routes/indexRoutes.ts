import { Response, Request, Router } from 'express';
import IndexRoutesComplejos from '../complejo/routes'

import { json } from 'body-parser';




class IndexRoutes {

  router:Router;


  constructor() {

    this.router = Router();
    this.routes();


  }
 // defini cion de funciones o importar metodos ya hechos 

  routes() {


   this.router.use(IndexRoutesComplejos)
  

  }


}


const indexRouter = new IndexRoutes();
indexRouter.routes();


export default indexRouter.router;
