import { Response, Request, Router } from 'express';

import Complejo from './Complejo'
import { request } from 'https';


class IndexRoutesComplejos {

  router: Router;


  constructor() {

    this.router = Router();
    this.routes();


  }
  routes() {

    this.router.get('/', this.prevPolar)
    this.router.get('/operaciones', this.prevOperaciones)
    this.router.get('/operacionesAvanzadas', this.prevOperacionesAvanzadas)
    this.router.get('/fasores', this.prevFasores)
    this.router.post('/tranformar', this.conversionesDeComplejoRecToPolar)
    this.router.post('/operaciones/realizar', this.operacionesAritmeticasDeComplejos)
    this.router.post('/operacionesAvanzadas/realizar', this.operacionesDeComplejosAvanzadas)
    this.router.post('/operaciones/sumarfasores', this.operacionesSumaDeFasores)


  }

  public prevPolar(reques: Request, response: Response) {
    response.render('complejosViews/pasajes')
  }
  public prevOperaciones(reques: Request, response: Response) {
    response.render('complejosViews/operaciones')
  }
  public prevOperacionesAvanzadas(reques: Request, response: Response) {
    response.render('complejosViews/operacionesAvanzadas')
  }
  public prevFasores(reques: Request, response: Response) {
    response.render('complejosViews/fasores')
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

      //console.log(reques.body)
      let { operacion } = reques.body

      let resultado

      
      let {z1,z2}:any =await Complejo.filtrarDatos(reques.body)
    

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


      console.log(resultado)
      
      return response.render('complejosViews/mostrarResultadosOperacionesBasicas',{resultado})

    } catch (error) {

    }

  }

  public operacionesDeComplejosAvanzadas = async (reques: Request, response: Response) => {

    let { operacion,exponente} = reques.body

    let {z1}:any =await Complejo.filtrarDatos(reques.body)
     
    let resultado
    

    if(operacion=='potencia'){   

      resultado=await Complejo.potenciaToReal(z1,exponente);
        

    }else{

      resultado =await Complejo.radicacionToReal(z1,exponente)
      
    }

    console.log(resultado)

    response.render('complejosViews/mostrarResultadosOperacionesAvanzadas',{resultado})
  }

  public operacionesSumaDeFasores = async (reques: Request, response: Response) => {

    console.log(JSON.stringify(reques.body, null, 2))

    let f1 
    let f2 

    let resultados = []
    let aux_resultado

    f1 = {
          tipo: reques.body.tipo_F1,
          w: reques.body.w_F1,
          Amp: reques.body.amp_F1,
          faseInicial: reques.body.faseInicial_F1
    }
    f2 = {
        tipo: reques.body.tipo_F2,
        w: reques.body.w_F2,
        Amp: reques.body.amp_F2,
        faseInicial: reques.body.faseInicial_F2
    }
    //let { z1, z2, tipo, w } = reques.body

    let resultado = await Complejo.sumaDeFasores(await Complejo.funcToFasor(f1), await Complejo.funcToFasor(f2))

    console.log(JSON.stringify(resultado, null, 2))


    aux_resultado = {
      amp: resultado.mod,
      w:f1.w,
      faseInicial:resultado.angle,
      tipo:"Cos"
    }
    resultados.push(aux_resultado)

    aux_resultado = {
      amp: resultado.mod,
      w:f1.w,
      faseInicial:resultado.angle + (1/2),
      tipo:"Sen"
    }
    resultados.push(aux_resultado)

    console.log(JSON.stringify(resultados, null, 2))


    response.render('complejosViews/mostrarResultadosFasores', {resultados})
  }
}

const indexRouter = new IndexRoutesComplejos();
indexRouter.routes();


export default indexRouter.router;