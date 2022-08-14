const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const QuestionsModel = sequelize.define('serv_questions', {
    id_type_answer: {
      type: Sequelize.INTEGER,
    },
    qst_question: {
      type: Sequelize.STRING,
    },
    qst_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=QuestionsModel;
  