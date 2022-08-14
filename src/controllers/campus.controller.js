const { request, response } = require("express");

const { HeadQuartersModel } = require("../models");
const getCampus = async (req = request, res = response) => {
  try {
    let campus = req.params.Id.split(',')
    await HeadQuartersModel.findAll({
      where: { id: campus },
      attributes: {exclude: ['createdAt','updatedAt']}
    }).then((result) => res.status(200).json(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
    getCampus,
};
