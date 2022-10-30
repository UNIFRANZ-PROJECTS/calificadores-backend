const AdminAreaCampusModel = require("./administadorAreaCampusModel");
const AdministratorsModel = require("./administradoresModel");
const AreasModel = require("./areasModel");
const AreaHeadquartersModel = require("./areasSedesModel");
const SurveysModel = require("./encuestasModel");
const SurveysQuestionsModel = require("./encuestasPreguntasModel");
const PermisionRolesModel = require("./permisoRolesModel");
const PermisionsModel = require("./permisosModel");
const QuestionsModel = require("./preguntasModel");
const AnswersModel = require("./respuestasModel");
const RolesModel = require("./rolesModel");
const HeadQuartersModel = require("./sedesModel");
const ThemeAreaHeadquartersModel = require("./temasAreasSedesModel");
const ThemesModel = require("./temasModel");
const SurveyTerminalsModel = require("./terminalesEncuestasModel");
const TerminalsModel = require("./terminalesModel");
const TypeAnswersModel = require("./tipoRespuestasModel");
const TypeUsersModel = require("./tipoUsuariosModel");
const forgotPasswords = require("./recuperarContraseñaModel")

// SurveysModel.belongsTo(AreaHeadquartersModel, {foreignKey: 'id_area_campus'});


SurveyTerminalsModel.belongsTo(SurveysModel, {foreignKey: 'id_survey'});
SurveyTerminalsModel.belongsTo(TerminalsModel, {foreignKey: 'id_terminal'});

//fk reports
AnswersModel.belongsTo(QuestionsModel, {foreignKey: 'id_question'});
AnswersModel.belongsTo(SurveysModel, {foreignKey: 'id_survey'});
AnswersModel.belongsTo(TypeAnswersModel, {foreignKey: 'id_type_answer'});
SurveysModel.belongsTo(AreaHeadquartersModel, {foreignKey: 'id_area_campus'});
//fk encuesta-pregunta
SurveysQuestionsModel.belongsTo(QuestionsModel, {foreignKey: 'id_question'});
SurveysQuestionsModel.belongsTo(SurveysModel, {foreignKey: 'id_survey'});
AreaHeadquartersModel.belongsTo(HeadQuartersModel, {foreignKey: 'id_campus'});
AreaHeadquartersModel.belongsTo(AreasModel, {foreignKey: 'id_area'});

//fk administrators
AdministratorsModel.belongsTo(AdministratorsModel, {
  foreignKey: "id_responsable",
});
AdministratorsModel.belongsTo(TypeUsersModel, { foreignKey: "id_type_user" });
AdministratorsModel.belongsTo(RolesModel, { foreignKey: "id_rol" });
//fk permisionRoles
PermisionRolesModel.belongsTo(RolesModel, { foreignKey: "id_rol" });
PermisionRolesModel.belongsTo(PermisionsModel, { foreignKey: "id_permision" });
//fk areasHeadquarters
AreaHeadquartersModel.belongsTo(HeadQuartersModel, { foreignKey: "id_campus" });
AreaHeadquartersModel.belongsTo(AreasModel, { foreignKey: "id_area" });

//fk adminCampus
AdminAreaCampusModel.belongsTo(AdministratorsModel, { foreignKey: "id_admin" });
AdminAreaCampusModel.belongsTo(AreaHeadquartersModel, {
  foreignKey: "id_area_campus",
});
module.exports = {
  AdminAreaCampusModel,
  AdministratorsModel,
  AreasModel,
  AreaHeadquartersModel,
  SurveysModel,
  SurveysQuestionsModel,
  PermisionRolesModel,
  PermisionsModel,
  QuestionsModel,
  AnswersModel,
  RolesModel,
  HeadQuartersModel,
  ThemeAreaHeadquartersModel,
  ThemesModel,
  SurveyTerminalsModel,
  TerminalsModel,
  TypeAnswersModel,
  TypeUsersModel,
  forgotPasswords
};
