import { Response, Request, Router } from 'express';

import Complejo from './Complejo'


class IndexRoutesComplejos {

  router: Router;


  constructor() {

    this.router = Router();
    this.routes();


  }
  routes() {
    
    this.router.get('/',this.prevPolar)
    this.router.post('/tranformar', this.conversionesDeComplejoRecToPolar )
    
    


  }

  public prevPolar(reques: Request, response: Response){
    response.render('complejosViews/pasajes')
  }

  public conversionesDeComplejoRecToPolar = async (reques: Request, response: Response) => {
    try {
      let resultado
      console.log(reques.body)
      if(reques.body.tranformacion=='polar'){
      let { real, imag } = reques.body
       resultado= await Complejo.rectangularToPolar(real,imag)
    }else{
      let { mod, angle } = reques.body
       resultado= await Complejo.polarToRectangular(mod,angle)
    }      
      console.log(resultado)

     return  response.render('complejosViews/mostrarResultados',{resultado})

    } catch (error) {

    }
  }
  


}

  const indexRouter = new IndexRoutesComplejos();
  indexRouter.routes();


  export default indexRouter.router;