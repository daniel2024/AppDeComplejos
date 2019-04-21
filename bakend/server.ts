import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import exphbs from 'express-handlebars';
import path from 'path';

import indexRouter from './routes/indexRoutes';


class Server{

      app:express.Application;
  constructor(){
    this.app=express();


    this.app.use(express.json())//el tranformado de json va antes de la config
    this.app.use(express.urlencoded({extended:false}));

    this.config();
    this.routes();

  }
  config(){
  //settings
  this.app.set('port',process.env.PORT || 9000);
  //plantillas (vistas del view)
  this.app.set('Views',path.join(__dirname,'Views'))
  this.app.engine(".hbs",exphbs({
    layoutsDir: path.join(this.app.get('views'),"layouts"),
    partialsDir:path.join(this.app.get('views'),'partials'),
    defaultLayout:'main',
    extname:'.hbs'
  }))
  this.app.set("view engine",'.hbs')

  //midelware
  this.app.use(morgan('dev'));
  this.app.use(helmet())
   }
  routes(){

    this.app.use('/', indexRouter);

   
  }
  start(){
    this.app.listen(this.app.get('port'),() =>{
      console.log('server on port: '+this.app.get('port'))
    

    })
  }
}

const server = new Server;
server.start();