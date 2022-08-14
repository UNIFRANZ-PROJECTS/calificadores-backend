const { request, response } = require("express");

const {
  SurveysModel,
  AreaHeadquartersModel,
  QuestionsModel,
  AreasModel,
  SurveysQuestionsModel,
  HeadQuartersModel,
} = require("../models");

const getSurveyQuestions = async (req = request, res = response) => {
  let surveys = [];
  let questions = [];
  try {
    await SurveysModel.findAll({
      where: { srv_state: 1 },
      include: [
        {
          model: AreaHeadquartersModel,
          required: true,
        },
      ],
    }).then(async (result) => {
      for (let i = 0; i < result.length; i++) {
        questions = [];
        await SurveysQuestionsModel.findAll({
          where: { id_survey: result[i].id, srvQst_state: 1 },
        }).then(async (result2) => {
          for (let j = 0; j < result2.length; j++) {
            resp = await QuestionsModel.findOne({
              where: { id: result2[j].id_question, qst_state: 1 },
              attributes: { exclude: ["createdAt", "updatedAt", "qst_state"] },
            });
            questions.push(resp);
          }
          areaCampus = await AreaHeadquartersModel.findOne({
            where: { id: result[i].id_area_campus },
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
          surveys.push({
            id: result[i].id,
            id_administrator: result[i].id_administrator,
            ars_name: areaCampus.serv_area.ars_name,
            serv_headquarter: areaCampus.serv_headquarter.hdq_name,
            id_area_campus: areaCampus.id,
            srv_name: result[i].srv_name,
            srv_description: result[i].srv_description,
            srv_state: result[i].srv_state,
            questions: questions,
          });
        });
      }
      return res.json(surveys);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const getSurveyAreaCampusById = async (req = request, res = response) => {
  try {
    await await SurveysModel.findAll({
      where: { id_area_campus: req.params.Id },
      include: [
        {
          model: AreaHeadquartersModel,
          required: true,
        },
      ],
    }).then((result) => res.json(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const getOneSurveys = async (obj) => {
  return await SurveysModel.findOne({
  where: obj,
  include: [
      {
          model: AreaHeadquartersModel,
          required: true
      },
  ],
  });
};
const getAllSurveysQuestions = async (obj,obj2) => {
  return await SurveysQuestionsModel.findAll({
      where: obj,
      include: [
          {
              where: obj2,
          model: QuestionsModel,
          required: true
          },
          {
          model: SurveysModel,
          required: true
          },
      ],
  });
};
const getOneQuestions = async obj => {
  return await QuestionsModel.findOne({
      where: obj,
  });
};

const getOneAreasCampus = async obj => {
  return await AreaHeadquartersModel.findOne({
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
const getSurveyQuestionsById = async (req = request, res = response) => {
  try {
    let surveys={};
    let questions={};
    console.log(req.params.Id)
    await getOneSurveys({id:req.params.Id}).then(async result => {
            questions=[]
            await getAllSurveysQuestions({id_survey:result.id})
            .then(async result2 =>{
                for (let j = 0; j < result2.length; j++) {
                    console.log(result2[j].id_question)
                    resp = await getOneQuestions({id:result2[j].id_question}) 
                    questions.push(resp)
                }
                areaCampus = await getOneAreasCampus({id:result.id_area_campus}) 
                surveys=({
                    id:result.id,
                    id_administrator:result.id_administrator,
                    ars_name:areaCampus.serv_area.ars_name,
                    id_campus:areaCampus.serv_headquarter.id,
                    serv_headquarter:areaCampus.serv_headquarter.hdq_name,
                    srv_name:result.srv_name,
                    srv_description:result.srv_description,
                    srv_state:result.srv_state,
                    questions:questions})
            })
        // let questions = await getAllQuestions({id:result})
        return res.json(surveys)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerSurvey = async (req = request, res = response) => {
  try {
    const {
      id_administrator,
      id_area_campus,
      srv_name,
      srv_description,
      questions,
    } = req.body;
    let count = 0;
    let surveys = {};
    let questionss = [];
    const survey = new SurveysModel();
    survey.id_administrator = id_administrator;
    survey.id_area_campus = id_area_campus;
    survey.srv_name = srv_name;
    survey.srv_description = srv_description;
    await survey
      .save()

      .then(async (result) => {
        questions.forEach(async (element) => {
          const SurveysQuestions = new SurveysQuestionsModel();
          SurveysQuestions.id_question = element;
          SurveysQuestions.id_survey = result.id;
          await SurveysQuestions.save();
          count++;
          if (count == questions.length) {
            await SurveysQuestionsModel.findAll({
              where: { id_survey: result.id, srvQst_state: 1 },
              include: [
                {
                  model: QuestionsModel,
                  required: true,
                },
                {
                  model: SurveysModel,
                  required: true,
                },
              ],
            }).then(async (result3) => {
              for (let j = 0; j < result3.length; j++) {
                resp = await QuestionsModel.findOne({
                  where: { id: result3[j].id_question },
                });
                questionss.push(resp);
              }
              areaCampus = await AreaHeadquartersModel.findOne({
                where: { id: result.id_area_campus },
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
              surveys = {
                id: result.id,
                id_administrator: result.id_administrator,
                ars_name: areaCampus.serv_area.ars_name,
                serv_headquarter: areaCampus.serv_headquarter.hdq_name,
                id_area_campus: areaCampus.id,
                srv_name: result.srv_name,
                srv_description: result.srv_description,
                srv_state: result.srv_state,
                questions: questionss,
              };
              return res.json({ message: "Encuesta registrado", surveys });
            });
          }
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updateSurvey = async (req = request, res = response) => {
  try {
    const { id_area_campus, srv_name, srv_description, srv_state, questions } =
      req.body;
    let surveys = {};
    let questionss = [];
    SurveysModel.update(
      {
        id_area_campus: id_area_campus,
        srv_name: srv_name,
        srv_description: srv_description,
        srv_state: srv_state,
      },
      { where: { id: req.params.Id } }
    ).then(async (result) => {
      let surveyQuestions = await SurveysQuestionsModel.findAll({
        where: { id_survey: req.params.Id },
        include: [
          {
            where: { qst_state: 1 },
            model: QuestionsModel,
            required: true,
          },
          {
            model: SurveysModel,
            required: true,
          },
        ],
      });
      let edit = [];
      for (let i = 0; i < questions.length; i++) {
        for (let j = 0; j < surveyQuestions.length; j++) {
          if (questions[i] == surveyQuestions[j].id_question) {
            await SurveysQuestionsModel.update(
              {
                srvQst_state: 1,
              },
              {
                where: { id: surveyQuestions[j].id },
              }
            );
            edit.push(surveyQuestions[j].id_question);
          } else {
            if (
              edit.filter((e) => e == surveyQuestions[j].id_question).length ==
              0
            ) {
              await SurveysQuestionsModel.update(
                {
                  srvQst_state: 0,
                },
                {
                  where: { id: surveyQuestions[j].id },
                }
              );
            }
          }
        }
        if (
          surveyQuestions.filter((e) => e.id_question == questions[i]).length ==
          0
        ) {
          const SurveysQuestions = new SurveysQuestionsModel();
          SurveysQuestions.id_survey = req.params.Id;
          SurveysQuestions.id_question = questions[i];
          SurveysQuestions.save();
        }
      }
      let survey = await SurveysModel.findOne({
        where: { id: req.params.Id },
        include: [
          {
            model: AreaHeadquartersModel,
            required: true,
          },
        ],
      });
      let surveyQuestion = await SurveysQuestionsModel.findAll({
        where: { id_survey: req.params.Id, srvQst_state: 1 },
        include: [
          {
            model: QuestionsModel,
            required: true,
          },
          {
            model: SurveysModel,
            required: true,
          },
        ],
      });
      for (let j = 0; j < surveyQuestion.length; j++) {
        resp = await QuestionsModel.findOne({
          where: { id: surveyQuestion[j].id_question },
        });
        questionss.push(resp);
      }
      areaCampus = await AreaHeadquartersModel.findOne({
        where: { id: id_area_campus },
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
      surveys = {
        id: survey.id,
        id_administrator: survey.id_administrator,
        ars_name: areaCampus.serv_area.ars_name,
        serv_headquarter: areaCampus.serv_headquarter.hdq_name,
        id_area_campus: areaCampus.id,
        srv_name: survey.srv_name,
        srv_description: survey.srv_description,
        srv_state: survey.srv_state,
        questions: questionss,
      };

      return res.json(surveys);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getSurveyAreaCampusById,
  getSurveyQuestionsById,
  getSurveyQuestions,
  registerSurvey,
  updateSurvey,
};
