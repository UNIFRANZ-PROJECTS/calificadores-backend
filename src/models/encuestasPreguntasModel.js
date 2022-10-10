const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const SurveysQuestionsModel = sequelize.define('serv_survey_questions', {
    id_question: {
      type: Sequelize.INTEGER,
    },
    id_survey: {
      type: Sequelize.INTEGER,
    },
    srvQst_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=SurveysQuestionsModel;
  