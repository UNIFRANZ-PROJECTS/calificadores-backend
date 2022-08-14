const { request, response } = require("express");

const {
  RolesModel,
  PermisionRolesModel,
  PermisionsModel,
} = require("../models");
const getAllRoles = async (req = request, res = response) => {
  try {
    await RolesModel.findAll({
      where: { rls_state: 1 },
      attributes: { exclude: ["createdAt", "updatedAt", "rls_state"] },
    }).then((user) => res.status(200).json(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const getAllRolPermisionsFunction = async (obj) => {
  return await PermisionRolesModel.findAll({
    where: obj,
    include: [
      {
          model: PermisionsModel,
          required: true,
          attributes: {exclude: ['prm_description','createdAt','updatedAt','prm_state']},
      },
    ],
    // attributes: []
  });
};
const getAllRolPermisions = async (req = request, res = response) => {
  let rol = await RolesModel.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  for (let i = 0; i < rol.length; i++) {
    let permision = await getAllRolPermisionsFunction({id_rol:rol[i].id,prmRls_state:1})
    rol[i].dataValues.permision = permision;
  }
  return res.json(rol)
};
const registerRol = async (req = request, res = response) => {
  let rolPermisions = {
    rol: {},
    permision: [],
  };
  let permisions = [];
  const { rls_name, rls_description, rls_permisions } = req.body;
  try {
    const rol = new RolesModel();
    rol.rls_name = rls_name;
    rol.rls_description = rls_description;
    // rol.rls_permisions = rls_permisions;
    await rol.save().then((result) => {
      if (result) {
        let count = 0;
        // let newArray = JSON.parse(rls_permisions);
        rls_permisions.forEach(async (element) => {
          const permisionRol = new PermisionRolesModel();
          permisionRol.id_rol = result.id;
          permisionRol.id_permision = element;
          await permisionRol.save().then(async (resp) => {
            await permisions.push(
              await PermisionRolesModel.findOne({
                where: { id: resp.id },
                include: [
                  {
                    model: PermisionsModel,
                    required: true,
                    attributes: {
                      exclude: [
                        "prm_description",
                        "createdAt",
                        "updatedAt",
                        "prm_state",
                      ],
                    },
                  },
                ],
              })
            );
            count++;
            if (rls_permisions.length == count) {
              rolPermisions.rol = result;
              rolPermisions.permision = permisions;
              return res.json({
                rolPermisions,
                msg: "rol registrado satisfactoriamente",
              });
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updateRol = async (req = request, res = response) => {
  try {
    const { rls_name, rls_description,rls_state,rls_permisions} = req.body;
    RolesModel.update(
      {
        rls_name: rls_name,
        rls_description: rls_description,
        rls_state: rls_state,
      },
      { where: { id: req.params.Id } }
    ).then(async (result) => {
      let permisionRol = await PermisionRolesModel.findAll({
        where: { id_rol: req.params.Id },
        include: [
          {
            model: PermisionsModel,
            required: true,
            where:{ prm_state: 1},
            attributes: {
              exclude: [
                "prm_description",
                "createdAt",
                "updatedAt",
                "prm_state",
              ],
            },
          },
        ],
      });
      let edit = [];
      for (let i = 0; i < rls_permisions.length; i++) {
        for (let j = 0; j < permisionRol.length; j++) {
          if (rls_permisions[i] == permisionRol[j].id_permision) {
            await PermisionRolesModel.update(
              {
                prmRls_state: 1,
              },
              {
                where: { id: permisionRol[j].id },
              }
            );
            edit.push(permisionRol[j].id_permision);
          } else {
            if (
              edit.filter((e) => e == permisionRol[j].id_permision).length == 0
            ) {
              await PermisionRolesModel.update(
                {
                  prmRls_state: 0,
                },
                {
                  where: { id: permisionRol[j].id },
                }
              );
            }
          }
        }
        if (
          permisionRol.filter((e) => e.id_permision == rls_permisions[i]).length == 0
        ) {
          const permisionRol = new PermisionRolesModel();
          permisionRol.id_rol = req.params.Id;
          permisionRol.id_permision = rls_permisions[i];
          await permisionRol.save();
        }
      }

      let rol = await RolesModel.findOne({
        where: { id: req.params.Id },
      });

      rol.dataValues.permision = await PermisionRolesModel.findAll({
        where: { id_rol: req.params.Id, prmRls_state: 1 },
        include: [
          {
            model: PermisionsModel,
            required: true,
            attributes: {
              exclude: [
                "prm_description",
                "createdAt",
                "updatedAt",
                "prm_state",
              ],
            },
          },
        ],
        // attributes: []
      });

      return res.json(rol);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getAllRoles,
  registerRol,
  updateRol,
  getAllRolPermisions,
};
