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
async cociente(z1:Complejo , z2:Complejo ){
    
         let denominador=Number(z2.real)*Number(z2.real)+Number(z2.imaginario)*Number(z2.imaginario);
         let x=(Number(z1.real)*Number(z2.real)+(Number(z1.imaginario)*(z2.imaginario)))/denominador;
         let y=(z1.imaginario*Number(z2.real)+Number(z1.real)*(-z2.imaginario))/denominador;
    
     
    return await this.rectangularToPolar(x,y);
 }

        
}

export default new Complejo(0,0,0,0);