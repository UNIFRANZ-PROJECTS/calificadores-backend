const { Op } = require("sequelize");
const {
  RolesModel,
  AdministratorsModel,
  TypeUsersModel,
  AreasModel,
  AreaHeadquartersModel,
  HeadQuartersModel,
  QuestionsModel,
  SurveysModel,
} = require("../models/index");
const rolExists = async (rls_name = "", data = "") => {
  // Verificar si el rol existe
  const existRol = await RolesModel.findOne({
    where: {
      rls_name: rls_name,
      id: { [Op.not]: data.req.params.Id ?? null },
    },
  });

  if (existRol) {
    throw new Error(`El nombre: ${rls_name}, ya está registrado`);
  }
};
const typeUserExists = async (tyUsr_name = "", data = "") => {
  // Verificar el tipo de usuario si existe
  const existTypeUser = await TypeUsersModel.findOne({
    where: {
      tyUsr_name: tyUsr_name,
      id: { [Op.not]: data.req.params.Id ?? null },
    },
  });
  if (existTypeUser) {
    throw new Error(`El nombre: ${tyUsr_name}, ya está registrado`);
  }
};
const emailExists = async (adm_email = "", data = "") => {
  if (!adm_email.includes("@unifranz.edu.bo")) {
    throw new Error(`El correo debe de terminar en @unifranz.edu.bo`);
  }
  // Verificar si el correo existe
  const existEmail = await AdministratorsModel.findOne({
    where: {
      adm_email: adm_email ?? null,
      id: { [Op.not]: data.req.params.Id ?? null },
    },
  });

  if (existEmail) {
    throw new Error(`El email: ${adm_email}, ya está registrado`);
  }
};
const areaExists = async (ars_name = "", data = "") => {
  // Verificar el area si existe
  console.log(ars_name);
  const existArea = await AreasModel.findOne({
    where: {
      ars_name: ars_name,
      id: { [Op.not]: data.req.params.Id ?? null },
    },
  });
  if (existArea) {
    throw new Error(`El nombre: ${ars_name}, ya está registrado`);
  }
};
const assignmentAreaCampusExist = async (inf = "", data = "") => {
  // Verificar el area si existe con la sede
  const existAreaCampus = await AreaHeadquartersModel.findOne({
    where: {
      id_area: data.req.body.id_area ?? null,
      id_campus: data.req.body.id_campus ?? null,
      id: { [Op.not]: data.req.params.Id ?? null },
    },
    include: [
      {
        model: AreasModel,
        required: true,
      },
      {
        model: HeadQuartersModel,
        required: true,
      },
    ],
  });
  if (existAreaCampus) {
    throw new Error(
      ` ${existAreaCampus.serv_area.ars_name}, ya está registrado con ${existAreaCampus.serv_headquarter.hdq_name}`
    );
  }
};
const questionExists = async (qst_question = "") => {
  const existQuestion = await QuestionsModel.findOne({
    where: {
      qst_question: qst_question,
    },
  });

  if (existQuestion) {
    throw new Error(`La pregunta: ${qst_question}, ya está registrado`);
  }
};

module.exports = {
  rolExists,
  emailExists,
  typeUserExists,
  areaExists,
  assignmentAreaCampusExist,
  questionExists,
};
