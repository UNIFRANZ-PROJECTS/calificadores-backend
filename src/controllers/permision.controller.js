const { request, response } = require("express");

const { PermisionsModel } = require("../models");
const getAllPermisions = async (req = request, res = response) => {
  try {
    await PermisionsModel.findAll({
      where: { prm_state: 1 },
      attributes: {exclude: ['createdAt','updatedAt','prm_state']}
    }).then((result) => res.status(200).json(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getAllPermisions,
};
