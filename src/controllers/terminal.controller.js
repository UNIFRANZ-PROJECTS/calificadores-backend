const { request, response } = require("express");

const {
  TerminalsModel,
  SurveyTerminalsModel,
  SurveysModel,
  AreaHeadquartersModel,
  HeadQuartersModel,
  AreasModel,
} = require("../models");
const getAllTerminals = async (req = request, res = response) => {
  try {
    await TerminalsModel.findAll({
      where: { trm_state: 1 },
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
    }).then((result) => {
      let rep = groupBy(result, "id_terminal");
      res.status(200).json(rep);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerTerminal = async (req = request, res = response) => {
  try {
    const { id_administrator, trm_serie } = req.body;

    const terminal = new TerminalsModel();
    terminal.id_administrator = id_administrator;
    terminal.trm_serie = trm_serie;
    await terminal.save();
    return res.json({
      terminal,
      msg: "terminal registrado satisfactoriamente",
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
    let terminal = await TerminalsModel.findAll({
      where: { trm_serie:id_terminal,trm_state: 1 },
    });
    if(terminal.length === 0 )return res.status(400).json({ msg: "La terminal no est?? registrado" })

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

const updateTerminal = async (req = request, res = response) => {
  try {
    const { trm_serie, trm_state } = req.body;
    if (req.body.trm_serie) {
      let terminalExist = await TerminalsModel.findOne({
        where: { trm_serie: trm_serie },
      });
      if (terminalExist) {
        if (terminalExist.id != req.params.Id) {
          return res
            .status(400)
            .json({
              errors: [{ msg: "ya existe un registro con esa serie" }],
            });
        }
      }
    }

    TerminalsModel.update(
      {
        trm_serie: trm_serie,
        trm_state: trm_state,
      },
      { where: { id: req.params.Id } }
    ).then(async () => {
      let terminal = await TerminalsModel.findOne({
        where: { id: req.params.Id },
      });
      res.status(200).json({ terminal, msg: "Editado correctamente" });
    });
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
  updateTerminal,
};
