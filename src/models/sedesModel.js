const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const HeadQuartersModel = sequelize.define('serv_headquarters', {
    hdq_name: {
      type: Sequelize.STRING,
    },
  });
  module.exports=HeadQuartersModel;
  