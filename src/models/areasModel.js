const Sequelize = require('sequelize');
const sequelize = require("../database/connection.js");
const AreasModel = sequelize.define('serv_areas', {
    ars_name: {
      type: Sequelize.STRING,
    },
    ars_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=AreasModel;
  