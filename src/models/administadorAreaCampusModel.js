const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const AdminAreaCampusModel = sequelize.define('serv_admin_area_headquarters', {
    id_admin: {
      type: Sequelize.INTEGER,
    },
    id_area_campus: {
        type: Sequelize.INTEGER,
    },
    state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=AdminAreaCampusModel;
  