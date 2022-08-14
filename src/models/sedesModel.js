const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const HeadQuartersModel = sequelize.define('serv_headquarters', {
    hdq_name: {
      type: Sequelize.STRING,
    },
  });
  module.exports=HeadQuartersModel;
  