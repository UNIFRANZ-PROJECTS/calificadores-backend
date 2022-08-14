const express = require('express');
const path = require('path');
const cors = require('cors');

const dbConnectionSql = require('./conection');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.admin = '/api/admin';
    this.typeUser = '/api/typeuser';
    this.rol = '/api/rol';
    this.permisions = '/api/permision';
    this.questions = '/api/question';
    this.surveys = '/api/survey';
    this.terminals = '/api/terminal';
    this.reports = '/api/report';
    this.answers = '/api/answer';
    this.typeAnswers = '/api/typeanswer';
    this.areas = '/api/areas';
    this.campus = '/api/campus';

    //conectar a DB
    this.contectDB();

    //Middlewares
    this.middlewares();
    
    //Rutas de mi aplicación
    this.routes();
  }

  async contectDB(){
    try{
      await dbConnectionSql.authenticate();
      console.log('Base de datos MySql conectado');
    } catch (error){
      throw new Error( error )
    }
  }
  middlewares(){
    //cors
    this.app.use( cors()); 
    //lectura y parseo del body
    this.app.use( express.json() );
    
  }


  routes() {

    this.app.use(this.admin,require('./routes/admin.route'));
    this.app.use(this.typeUser,require('./routes/typeUser.route'));//test
    this.app.use(this.rol,require('./routes/rol.route'));//test
    this.app.use(this.permisions, require('./routes/permision.route'));//test
    this.app.use(this.questions,require('./routes/question.route'));//test
    this.app.use(this.surveys,require('./routes/survey.route'));//test
    this.app.use(this.terminals,require('./routes/terminal.route'));//test
    this.app.use(this.reports,require('./routes/report.route'));//test
    this.app.use(this.answers,require('./routes/answer.route'));//test
    this.app.use(this.typeAnswers,require('./routes/typeAnswer.route'));//test
    this.app.use(this.areas,require('./routes/area.route'))//test
    this.app.use(this.campus,require('./routes/campus.route'))
    
  }


  listen() {
    this.app.listen( this.port, () => {
      console.log("Servidor correindo en puerto", this.port);
    });
  }
}
module.exports = Server;
