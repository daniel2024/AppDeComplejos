import Math from 'mathjs'


class Complejo{
 
 
      real :number 
      imaginario :number
      mod:number
      angle:number

      constructor(real :number ,imaginario:number,mod:number,angle:number){
        this.real=real 
        this.imaginario=imaginario 
        this.mod=mod 
        this.angle=angle 

    }

    async rectangularToPolar(real:number,imaginario:number){
        
        let modulo=await this.modulo(real,imaginario)
        let angle=await this.argumento(real,imaginario)

      return new Complejo(real,imaginario,modulo,angle)  
    }

        

    
    async polarToRectangular(mod:number,arg:number){
        
            let real = await this.re(mod,arg);
            let imaginario= await this.im(mod,arg);
             
        return new Complejo(real,imaginario,mod,arg)
    };
    
     modulo(re:number ,im:number ){
        return Math.sqrt(re*re + im*im);
    }; 
    
     argumento(re:number,im:number){
         
        return (Math.atan2(im,re)<0?Math.atan2(im,re)+ 2*Math.pi : Math.atan2(im,re))/Math.pi;
    };
    
     re(mod:number,arg:number){
        return mod*parseFloat(Math.cos(arg*Math.pi).toFixed(10));;
    }; 
    
    im(mod:number,arg:number){
        return mod*parseFloat(Math.sin(arg*Math.pi).toFixed(10));
    };

    //-----------operaciones de Complejos-----------------

    //suma de dos números complejos
  async suma( z1:any,  z2:any){
   
    let x=Number(z1.real)+Number(z2.real);
    let y=Number(z1.imaginario)+Number(z2.imaginario);

    return await this.rectangularToPolar(x,y);
 }


    //resta de dos números complejos
    async resta( z1:any,  z2:any){
        
        let x=Number(z1.real)-Number(z2.real);
        let y=Number(z1.imaginario)-Number(z2.imaginario);
        return await this.rectangularToPolar(x,y);
     }
//producto de dos números complejos
 async producto (z1:any,  z2:any){
     
    let x=Number(z1.real)*Number(z2.real)-Number(z1.imaginario)*Number(z2.imaginario);
    let y=Number(z1.real)*Number(z2.imaginario)+Number(z2.real)*Number(z1.imaginario);
    

    return await this.rectangularToPolar(x,y);
 }

//cociente de dos números complejos
//excepción cuando el complejo denominador es cero
async cociente(z1:any , z2:any ){
    
         let denominador=Number(z2.real)*Number(z2.real)+Number(z2.imaginario)*Number(z2.imaginario);
         let x=(Number(z1.real)*Number(z2.real)+(Number(z1.imaginario)*(z2.imaginario)))/denominador;
         let y=(z1.imaginario*Number(z2.real)+Number(z1.real)*(-z2.imaginario))/denominador;
    
     
    return await this.rectangularToPolar(x,y);
 }

 async filtrarDatos(body:any){

    let z1 = (body.formaZ1 == 'binomica') ? await this.rectangularToPolar(body.realZ1,body.imaginarioZ1) : await this.polarToRectangular(body.modZ1, body.angleZ1)
    let z2 = (body.formaZ2 == 'binomica') ? await this.rectangularToPolar(body.realZ2,body.imaginarioZ2) : await this.polarToRectangular(body.modZ2, body.angleZ2)


    return  {z1,z2}
}

//Operaciones Avanzadas

//Potencia de un complejo elevado a un real

    async potenciaToReal(z1: any, num: any) {

        let mod
        let tita
        let resultados=[]
        let aux_resultado

        if (z1.tipo == 'binomica') {
            mod = await Math.pow(this.modulo(z1.real, z1.imaginario), num)
            tita = await this.argumento(z1.real, z1.imaginario) * num
        } else {
            mod = await Math.pow(z1.mod, num)
            tita = z1.angle * num
        }
        aux_resultado = {z: await this.polarToRectangular(Number(mod), tita)}
        resultados.push(aux_resultado)

        return {resultados}

    }

async potenciaToComplejo(z1: any, z2: any)  {
    
   let Z1_elevado= this.rectangularToPolar(Number(await Math.log(await this.modulo(z1.real,z1.imaginario))),await this.argumento(z1.real,z1.imaginario))
   

   let resultado =await this.producto(z2,Z1_elevado) 
    
    return this.polarToRectangular(Math.exp(resultado.real),resultado.imaginario)
  }

  async radicacionToReal(z1:any ,num:any){

    let mod=await Math.pow(this.modulo(z1.real,z1.imaginario),1/num)
    let angulos=[]
    let fase_inicial=await this.argumento(z1.real,z1.imaginario)
    let resultados=[]
    let aux_resultado
    let aux
   
    for(let k=0;k<num;k++){


        if(mod==1){
            aux={
            w : (fase_inicial+(2*k*Math.pi))/num,
            primitiva:await this.MCD(k,num)==1? true:false  
            }
            aux_resultado={z:await this.polarToRectangular(Number(mod), aux.w),
                primitiva: aux.primitiva}
        }else{

            aux=(fase_inicial+(2*k*Math.pi))/num
            aux_resultado = { z: await this.polarToRectangular(Number(mod), aux)}
        }
        angulos.push(aux)
        resultados.push(aux_resultado)
    }

  
return {resultados}

  }

  //funciones axuliares

    divisores(numero: any) {
        let divisores = []

        for (let k = 1; k <= numero; k++) {

            if (numero % k == 0) divisores.push(k);
        }
        

        return divisores
    }
   async MCD(c:any, d:any) {
        let divisores = []
        let a=await  this.divisores(c)
        let b=await  this.divisores(d)
        for(let k=0;k<b.length;k++){

            if(a.indexOf(b[k])>=0) divisores.push(b[k]);
        }

        
        return divisores.pop()
    }

  }
 

export default new Complejo(0,0,0,0);