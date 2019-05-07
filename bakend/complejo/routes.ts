import { Response, Request, Router } from 'express';

import Complejo from './Complejo'


class IndexRoutesComplejos {

  router: Router;


  constructor() {

    this.router = Router();
    this.routes();


  }
  routes() {

    this.router.get('/', this.prevPolar)
    this.router.get('/operaciones', this.prevOperaciones)
    this.router.post('/tranformar', this.conversionesDeComplejoRecToPolar)
    this.router.post('/operaciones/realizar', this.operacionesAritmeticasDeComplejos)




  }

  public prevPolar(reques: Request, response: Response) {
    response.render('complejosViews/pasajes')
  }
  public prevOperaciones(reques: Request, response: Response) {
    response.render('complejosViews/operaciones')
  }

  public conversionesDeComplejoRecToPolar = async (reques: Request, response: Response) => {
    try {
      let resultado

      if (reques.body.tranformacion == 'polar') {
        let { real, imag } = reques.body
        resultado = await Complejo.rectangularToPolar(real, imag)
      } else {
        let { mod, angle } = reques.body
        resultado = await Complejo.polarToRectangular(mod, angle)
      }


      return response.render('complejosViews/mostrarResultados', { resultado })

    } catch (error) {

    }
  }

  public operacionesAritmeticasDeComplejos = async (reques: Request, response: Response) => {
    try {

      console.log(reques.body)
      let { element, operacion } = reques.body

      let resultado

      

    

      switch (operacion) {
        case 'suma': resultado = await Complejo.suma(z1, z2);
          break;

        case 'resta': resultado = await Complejo.resta(z1, z2);
          break;

        case 'producto': resultado = await Complejo.producto(z1, z2)
          break;

        case 'cociente': resultado = await Complejo.cociente(z1, z2);
          break;

        default: break
      }






     resultado = await Complejo.rectangularToPolar(1,2)

      return response.render('complejosViews/mostrarResultados',{resultado})

    } catch (error) {

    }

  }

}

const indexRouter = new IndexRoutesComplejos();
indexRouter.routes();


export default indexRouter.router;