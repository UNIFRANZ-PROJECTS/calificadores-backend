const { request, response } = require("express");

const { TypeAnswersModel } = require("../models");
const getTypeAnswers = async (req = request, res = response) => {
  try {
    await TypeAnswersModel.findAll({
      where: { tyAns_state: 1 },
      attributes: { exclude: ["createdAt", "updatedAt", "tyAns_state"] },
    }).then((result) => res.status(200).json(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getTypeAnswers
};
