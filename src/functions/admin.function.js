const { 
    AdministratorsModel,
    TypeUsersModel,
    RolesModel,
    PermisionsModel,
    PermisionRolesModel,
    AreasModel,
    HeadQuartersModel,
    AreaHeadquartersModel,
    AdminAreaCampusModel,
    forgotPasswords,
    AnswersModel,
    QuestionsModel,
    TypeAnswersModel,
    SurveysModel,
 } = require("../models");
 const createAdministator = async ({ id_responsable, id_type_user, id_rol, adm_name, adm_lastName, adm_email , adm_password,adm_state}) => {
  return await AdministratorsModel.create({ id_responsable, id_type_user, id_rol, adm_name, adm_lastName, adm_email , adm_password,adm_state});
};
const createAdminAreaCampus = async ({ id_admin, id_area_campus }) => {
  return await AdminAreaCampusModel.create({id_admin, id_area_campus});
};
 const getForgotPassword = async obj => {
    return await forgotPasswords.findOne({
        where:obj
    })
 }
 const getAdministrator = async (obj,obj2,obj3) => {
    return await AdministratorsModel.findOne({
      where: obj,
      include: [
        {
          model: TypeUsersModel,
          where: obj2,
          required: true,
          attributes: {exclude: ['createdAt','updatedAt']},
        },
        {
          model: RolesModel,
          where: obj3,
          required: true,
          attributes: {exclude: ['createdAt','updatedAt']},
        },
      ],
    });
  };
const getAllAdminAreaCampus = async obj => {
    return await AdminAreaCampusModel.findAll({
      where: obj,
      attributes: {exclude: ['createdAt','updatedAt']},
      include: [
        {
          model: AreaHeadquartersModel,
          required: true,
          include: [
            {
              model: AreasModel,
              required: true
            },
            {
              model: HeadQuartersModel,
              required: true
            },
          ]
        }
      ]
    });
  };
  const getAllRolPermisions = async (obj) => {
    return await PermisionRolesModel.findAll({
      where: obj,
      attributes: {exclude: ['createdAt','updatedAt']},
      include: [
        {
            model: PermisionsModel,
            required: true,
            attributes: {exclude: ['prm_description','createdAt','updatedAt','prm_state']},
        },
      ],
      // attributes: []
    });
  };
  const getAllAreasCampus = async (obj) => {
    return await AreaHeadquartersModel.findAll({
      where: obj,
      include: [
        {
          model: AreasModel,
          required: true
        },
        {
          model: HeadQuartersModel,
          required: true
        },
      ],
    });
  };
  const getAllAreasFunction = async obj => {
    return await AreasModel.findAll({
      where: obj,
    });
  };
  const getAllCampus = async obj => {
    return await HeadQuartersModel.findAll({
      where: obj,
    });
  };
  const getAllAnswers = async (obj1,obj2) => {
    return await AnswersModel.findAll({
       
        attributes: {exclude: ['id_question','id_survey','id_type_answer','createdAt']},
        include: [
            {
                model: QuestionsModel,
                required: true,
                attributes: {exclude: ['id','id_type_answer','qst_state','createdAt','updatedAt']},
            },
            {
                model: TypeAnswersModel,
                required: true,
                attributes: {exclude: ['id','tyAns_description','tyAns_state','createdAt','updatedAt']},
            },
            {
                model: SurveysModel,
                where: obj1,
                required: true,
                attributes: {exclude: ['id','id_administrator','id_area_campus','srv_description','srv_state','createdAt','updatedAt']},
                include: [
                    {
                        model: AreaHeadquartersModel,
                        required: true,
                        where: obj2,
                        attributes: {exclude: ['id_campus','id_area','arsHdq_state','createdAt','updatedAt']},
                        include: [
                            {
                                model: AreasModel,
                                required: true,
                                attributes: {exclude: ['id','ars_state','createdAt','updatedAt']},
                            },
                            {
                                model: HeadQuartersModel,
                                required: true,
                                attributes: {exclude: ['id','hdq_description','createdAt','updatedAt']},
                            }
                        ]
                    }
                ]
            },
        ],
    });
};
  module.exports = {
    getForgotPassword,
    getAdministrator,
    getAllAdminAreaCampus,
    getAllRolPermisions,
    createAdministator,
    createAdminAreaCampus,
    getAllAreasCampus,
    getAllAreasFunction,
    getAllCampus,
    getAllAnswers
  };