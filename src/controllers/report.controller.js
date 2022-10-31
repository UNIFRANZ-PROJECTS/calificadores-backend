const { request, response } = require("express");

const jwt = require("jsonwebtoken");

const {
  AreasModel,
  AreaHeadquartersModel,
  HeadQuartersModel,
  AdminAreaCampusModel,
  SurveysModel,
  SurveysQuestionsModel,
  QuestionsModel,
  AnswersModel,
  TypeAnswersModel,
} = require("../models");

const { getAllAnswers } = require("../functions/admin.function");
const getReportAreaCampusById = async (req = request, res = response) => {
  try {
    const token = req.header("authorization");
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const { uid } = jwt.verify(bearerToken, process.env.SECRETORPRIVATEKEY);
    await AdminAreaCampusModel.findAll({
      where: { id_admin: uid },
      attributes: {
        exclude: ["id_admin", "state", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: AreaHeadquartersModel,
          attributes: {
            exclude: ["arsHdq_state", "createdAt", "updatedAt"],
          },
          required: true,
          include: [
            {
              model: AreasModel,
              attributes: {
                exclude: ["id", "ars_state", "createdAt", "updatedAt"],
              },
              required: true,
            },
            {
              model: HeadQuartersModel,
              attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
              },
              required: true,
            },
          ],
        },
      ],
    }).then(async (result) => {
      for await (const key of result) {
        await AnswersModel.findAll({
          attributes: {
            exclude: [
              "id_question",
              "id_survey",
              "id_type_answer",
              "createdAt",
            ],
          },
          include: [
            {
              model: QuestionsModel,
              required: true,
              attributes: {
                exclude: [
                  "id",
                  "id_type_answer",
                  "qst_state",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
            {
              model: TypeAnswersModel,
              required: true,
              attributes: {
                exclude: [
                  "id",
                  "tyAns_description",
                  "tyAns_state",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
            {
              model: SurveysModel,
              required: true.valueOf,
              where: { id_area_campus: key.id },
              attributes: {
                exclude: [
                  "id",
                  "id_administrator",
                  "id_area_campus",
                  "srv_state",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
        }).then((result2) => (key.dataValues.answers = result2));
      }
      let resultado = [];
      for await (const key of result) {
        let respuestas = [];
        for await (const key2 of key.dataValues.answers) {
          var today = new Date(key2.date_answer);
          var dd = String(today.getDate()).padStart(2, "0");
          var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          var yyyy = today.getFullYear();
          var hh;
          var min;
          today.getHours().toString().length == 1
            ? (hh = "0" + today.getHours())
            : (hh = today.getHours());
          today.getMinutes().toString().length == 1
            ? (min = "0" + today.getMinutes())
            : (min = today.getMinutes());
          respuestas.push({
            id: key2.id,
            srv_name: key2.serv_survey.srv_name,
            qst_question: key2.serv_question.qst_question,
            answer: key2.answer,
            date_time_answer: today,
            date_answer: dd + "-" + mm + "-" + yyyy,
            time_answer: hh + ":" + min,
            tyAns_name: key2.serv_type_answer.tyAns_name,
            updatedAt: key2.updatedAt,
          });
        }
        resultado.push({
          id: key.id,
          serv_area: key.serv_area_headquarter.serv_area.ars_name,
          hdq_name: key.serv_area_headquarter.serv_headquarter.hdq_name,
          answers: respuestas,
        });
      }
      // res.json(resultado);
      res.json(groupByF(resultado, "hdq_name"));
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
function groupByF(array, key) {
  return Array.from(
    array
      .reduce((m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map())
      .values()
  );
}
function groupBy(array, key) {
  return Array.from(
    array
      .reduce((m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map())
      .values()
  );
}
const getReportNationalByIdCampus = async (req = request, res = response) => {
  try {
    const token = req.header("authorization");
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const { uid } = jwt.verify(bearerToken, process.env.SECRETORPRIVATEKEY);
    let reports = [];
    let x = [];
    await AdminAreaCampusModel.findAll({
      where: { id_admin: uid },
      attributes: {
        exclude: ["id_admin", "state", "createdAt", "updatedAt"],
      },
      
    }).then(async (result) => {
      for await (const key of result) {
        await getAllAnswers({ id_area_campus: key.id_area_campus }).then(
          async (result2) => {
            for await (const key2 of result2) {
              reports.push({ 
                id: key2.id,
                srv_name: key2.serv_survey.srv_name,
                qst_question: key2.serv_question.qst_question,
                answer: key2.answer,
                date_answer: key2.date_answer,
                area: key2.serv_survey.serv_area_headquarter.serv_area.ars_name,
                sede: key2.serv_survey.serv_area_headquarter.serv_headquarter
                  .hdq_name,
                tyAns_name: key2.serv_type_answer.tyAns_name,
                updatedAt: key2.updatedAt,
              });
            }
          }
        );
      }
      res.json(reports);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getReportAreaCampusById,
  getReportNationalByIdCampus,
};
