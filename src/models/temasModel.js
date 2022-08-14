const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const ThemesModel = sequelize.define('serv_themes', {
    thm_name: {
      type: Sequelize.STRING,
    },
    thm_description: {
      type: Sequelize.STRING,
    },
    thm_image: {
      type: Sequelize.STRING,
    },
    thm_color: {
      type: Sequelize.STRING,
    },
    thm_startDate: {
      type: Sequelize.STRING,
    },
    thm_endDate: {
      type: Sequelize.STRING,
    },
    thm_state: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  });
  module.exports=ThemesModel;
  