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
} = require("../models");
const getAllAreas = async (req = Request, res = Response) => {
  try {
    AreasModel.findAll({
      where: { ars_state: 1 },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).then((user) => res.status(200).json(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const getAreasByIdCampus = async (req = Request, res = Response) => {
  try {
    let areaCampus = req.params.Id.split(",");
    await AreaHeadquartersModel.findAll({
      where: { id_campus: areaCampus },
      attributes: {
        exclude: ["id_campus", "id_area", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: AreasModel,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: HeadQuartersModel,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    }).then((result) => res.status(200).json(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const getAreaCampusById = async (req = Request, res = Response) => {
  try {
    const token = req.header("authorization");
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const { uid } = jwt.verify(bearerToken, process.env.SECRETORPRIVATEKEY);

    let areasCampus = [];
    await AdminAreaCampusModel.findAll({
      where: { id_admin: uid },
      include: [
        {
          model: AreaHeadquartersModel,
          required: true,
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
        },
      ],
    }).then(async (result) => {
      for (let i = 0; i < result.length; i++) {
        await areasCampus.push({
          id: result[i].serv_area_headquarter.id,
          arsHdq_state: result[i].serv_area_headquarter.arsHdq_state,
          ars_name: result[i].serv_area_headquarter.serv_area.ars_name,
          hdq_name: result[i].serv_area_headquarter.serv_headquarter.hdq_name,
          id_campus: result[i].serv_area_headquarter.serv_headquarter.id,
          id_area: result[i].serv_area_headquarter.serv_area.id,
        });
      }
      res.json(areasCampus);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const getSurveysByCampusId = async (req = request, res = response) => {
  //devolver todas las areas con sus respectivas encuestas
  try {
    let areaHeadquarter = await AreaHeadquartersModel.findAll({
      where: { id_campus: req.params.Id },
      attributes: {
        exclude: ["id_campus", "id_area", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: AreasModel,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    for await (const results of areaHeadquarter) {
      let survey = await SurveysModel.findAll({
        where: { id_area_campus: results.id },
      });
      for await (const result2 of survey) {
        let question = await SurveysQuestionsModel.findAll({
          where: { id_survey: result2.id },
          include: [
            {
              model: QuestionsModel,
              required: true,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        });
        result2.dataValues.questions = question;
      }
      results.dataValues.survey = survey;
    }
    res.status(200).json(areaHeadquarter);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerAreaCampus = async (req = request, res = response) => {
  try {
    const { id_administrator, id_area, id_campus } = req.body;
    const AreaHeadquarter = new AreaHeadquartersModel();
    AreaHeadquarter.id_campus = id_campus;
    AreaHeadquarter.id_area = id_area;
    await AreaHeadquarter.save().then(async (result) => {
      const AdminAreaCampus = new AdminAreaCampusModel();
      AdminAreaCampus.id_admin = id_administrator;
      AdminAreaCampus.id_area_campus = result.id;
      await AdminAreaCampus.save();
      result3 = await HeadQuartersModel.findOne({
        where: { id: result.id_campus },
      });
      result4 = await AreasModel.findOne({
        where: { id: result.id_area },
      });
      res.status(200).json({
        id: result.id,
        arsHdq_state: result.arsHdq_state,
        ars_name: result4.ars_name,
        hdq_name: result3.hdq_name,
        id_campus: result.id_campus,
        msg: "area y campus registrada satisfactoriamente",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const registerArea = async (req = request, res = response) => {
  try {
    const { ars_name } = req.body;
    const Area = new AreasModel();
    Area.ars_name = ars_name;
    await Area.save().then(async (result1) => {
      return res.json({
        msg: "area registrada satisfactoriamente",
        result1,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerUpdateArea = async (req = request, res = response) => {
  try {
    const { ars_name, ars_state } = req.body;
    AreasModel.update(
      {
        ars_name: ars_name,
        ars_state: ars_state,
      },
      { where: { id: req.params.Id } }
    ).then(async (result1) => {
      let area = await AreasModel.findOne({
        where: { id: req.params.Id },
      });
      return res.json({ msg: "Area editado correctamente", area });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updateAreaCampusById = async (req = request, res = response) => {
  try {
    const { id_area, id_campus, arsHdq_state } = req.body;
    let areasCampus = {};
    AreaHeadquartersModel.update(
      {
        id_area: id_area,
        id_campus: id_campus,
        arsHdq_state: arsHdq_state,
      },
      { where: { id: req.params.Id } }
    ).then(async () => {
      await AreaHeadquartersModel.findOne({
        where: { id: req.params.Id },
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
      }).then((result3) => {
        areasCampus = {
          id: result3.id,
          arsHdq_state: result3.arsHdq_state,
          ars_name: result3.serv_area.ars_name,
          hdq_name: result3.serv_headquarter.hdq_name,
          id_campus: result3.serv_headquarter.id,
        };
        res.status(200).json({ areasCampus, msg: "editado correctamente" });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  registerAreaCampus,
  updateAreaCampusById,
  registerUpdateArea,
  getAreasByIdCampus,
  registerArea,
  getAllAreas,
  getAreaCampusById,
  getSurveysByCampusId,
};
