const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const SurveyTerminalsModel = sequelize.define('serv_terminal_surveys', {
    id_survey: {
      type: Sequelize.INTEGER,
    },
    id_terminal: {
      type: Sequelize.STRING,
    },
    trmSrv_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=SurveyTerminalsModel;
  