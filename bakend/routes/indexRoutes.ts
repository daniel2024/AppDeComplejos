import { Response, Request, Router } from 'express';


import { json } from 'body-parser';



class IndexRoutes {

  router:Router;


  constructor() {

    this.router = Router();
    this.routes();


  }
 // defini cion de funciones o importar metodos ya hechos 

  routes() {
    // aca definir las rutas 
  

  }
 

}


const indexRouter = new IndexRoutes();
indexRouter.routes();


export default indexRouter.router;
