const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const TypeAnswersModel = sequelize.define('serv_type_answers', {
    tyAns_name: {
      type: Sequelize.STRING,
    },
    tyAns_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=TypeAnswersModel;
  