const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const AnswersModel = sequelize.define('serv_answers', {
    id_question: {
      type: Sequelize.INTEGER,
    },
    id_survey: {
      type: Sequelize.INTEGER,
    },
    id_type_answer: {
      type: Sequelize.INTEGER,
    },
    answer: {
      type: Sequelize.STRING,
    },
    date_answer: {
      type: Sequelize.STRING,
    },
  });
  module.exports=AnswersModel;