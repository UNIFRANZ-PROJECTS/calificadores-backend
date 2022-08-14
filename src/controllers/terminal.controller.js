const { request, response } = require("express");

const { TerminalsModel, SurveyTerminalsModel, SurveysModel, AreaHeadquartersModel, HeadQuartersModel, AreasModel } = require("../models");
const getAllTerminals = async (req = request, res = response) => {
  try {
    await TerminalsModel.findAll({
      where: { trm_state: 1 },
      attributes: { exclude: ["createdAt", "updatedAt", "trm_state"] },
    }).then((result) => res.status(200).json(result));
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
const getAllSurveyTerminals = async (req = request, res = response) => {
  try {
    await SurveyTerminalsModel.findAll({
      where: { trmSrv_state: 1 },
      include: [
        {
          model: SurveysModel,
          required: true,
          include: [
            {
              model: AreaHeadquartersModel,
              required: true,
              include: [
                {
                  model: HeadQuartersModel,
                  required: true,
                },
                {
                  model: AreasModel,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).then((result) =>{
      let rep = groupBy(result, "id_terminal");
      res.status(200).json(rep)
    }
      
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerTerminal = async (req = request, res = response) => {
  try {
    const { id_administrator, trm_description, trm_serie } = req.body;

    const terminal = new TerminalsModel();
    terminal.id_administrator = id_administrator;
    terminal.trm_description = trm_description;
    terminal.trm_serie = trm_serie;
    await terminal.save();
    return res.json({
      terminal,
      msg: "tipo de usuario registrado satisfactoriamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerSurveyTerminal = async (req = request, res = response) => {
  try {
    const { id_survey, id_terminal } = req.body;
    const SurveyTerminals = new SurveyTerminalsModel();
    SurveyTerminals.id_survey = id_survey;
    SurveyTerminals.id_terminal = id_terminal;
    console.log(SurveyTerminals);
    await SurveyTerminals.save().then((result) =>
      res.json({ result, msg: "survey-terminal registrado satisfactoriamente" })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};
module.exports = {
  getAllTerminals,
  registerTerminal,
  registerSurveyTerminal,
  getAllSurveyTerminals,
};
