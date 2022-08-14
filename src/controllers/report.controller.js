const { request, response } = require("express");

const { AnswersModel } = require("../models");
const { getAllAnswers } = require("../functions/admin.function");
const getReportAreaCampusById = async (req = request, res = response) => {
  try {
    let areaCampus = req.params.Id.split(",");
    let reports = [];
    getAllAnswers({ id_area_campus: areaCampus }).then(async (result) => {
      for (let i = 0; i < result.length; i++) {
        var today = new Date(result[i].date_answer);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        var hh;
        var min;
        if (today.getHours().toString().length == 1) {
          hh = "0" + today.getHours();
        } else {
          hh = today.getHours();
        }
        if (today.getMinutes().toString().length == 1) {
          min = "0" + today.getMinutes();
        } else {
          min = today.getMinutes();
        }

        await reports.push({
          id: result[i].id,
          srv_name: result[i].serv_survey.srv_name,
          qst_question: result[i].serv_question.qst_question,
          answer: result[i].answer,
          date_time_answer: today,
          date_answer: dd + "-" + mm + "-" + yyyy,
          time_answer: hh + ":" + min,
          area: result[i].serv_survey.serv_area_headquarter.serv_area.ars_name,
          sede: result[i].serv_survey.serv_area_headquarter.serv_headquarter
            .hdq_name,
          tyAns_name: result[i].serv_type_answer.tyAns_name,
          updatedAt: result[i].updatedAt,
        });
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
function groupBy(array, key) {
  return Array.from(
    array
      .reduce((m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map())
      .values()
  );
}
const getReportNationalByIdCampus = async (req = request, res = response) => {
  try {
    let campus = req.params.Id.split(",");
    let reports = [];
    let x = [];
    getAllAnswers({}, { id_campus: campus }).then(async (result) => {
      for (let i = 0; i < result.length; i++) {
        await reports.push({
          id: result[i].id,
          srv_name: result[i].serv_survey.srv_name,
          qst_question: result[i].serv_question.qst_question,
          answer: result[i].answer,
          date_answer: result[i].date_answer,
          area: result[i].serv_survey.serv_area_headquarter.serv_area.ars_name,
          sede: result[i].serv_survey.serv_area_headquarter.serv_headquarter
            .hdq_name,
          tyAns_name: result[i].serv_type_answer.tyAns_name,
          updatedAt: result[i].updatedAt,
        });
      }
      let rep = groupBy(reports, "sede");
      for (let j = 0; j < rep.length; j++) {
        await x.push(groupBy(rep[j], "area"));
      }
      res.json(x);
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
