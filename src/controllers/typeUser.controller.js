const { request, response } = require("express");

const { TypeUsersModel } = require("../models");
const getAllTypeUsers = async (req = request, res = response) => {
  try {
    await TypeUsersModel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).then((user) => res.status(200).json(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerTypeUser = async (req = request, res = response) => {
  try {
    const { tyUsr_name, tyUsr_description } = req.body;

    const typeuser = new TypeUsersModel();
    typeuser.tyUsr_name = tyUsr_name;
    typeuser.tyUsr_description = tyUsr_description;
    await typeuser.save();
    return res.status(200).json({
      typeuser,
      msg: "tipo de usuario registrado satisfactoriamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updateTypeUserById = async (req = request, res = response) => {
  try {
    const { tyUsr_name, tyUsr_description, tyUsr_state } = req.body;
    if(req.body.tyUsr_name && req.body.tyUsr_description){
      let typeuserExist = await TypeUsersModel.findOne({
        where: {tyUsr_name: tyUsr_name}
      });
      if (typeuserExist) {
        if(typeuserExist.id != req.params.Id){
          return res.status(400).json({errors: [{msg:"ya existe un registro con ese nombre"}]})
        }
      }
    }

    TypeUsersModel.update(
      {
        tyUsr_name: tyUsr_name,
        tyUsr_description: tyUsr_description,
        tyUsr_state: tyUsr_state,
      },
      { where: { id: req.params.Id } }
    ).then(async () => {
      let typeuser = await TypeUsersModel.findOne({
        where: { id: req.params.Id },
      });
      res.status(200).json({ typeuser, msg: "Editado correctamente" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getAllTypeUsers,
  registerTypeUser,
  updateTypeUserById,
};
