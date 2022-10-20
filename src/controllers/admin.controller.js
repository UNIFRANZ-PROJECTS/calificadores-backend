const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { omit } = require("lodash");
const { customAlphabet } = require("nanoid");
const { gerateJWT } = require("../helpers/generate-jwt");
const { transporter } = require("../helpers/mailer");

const {
  getForgotPassword,
  getAdministrator,
  getAllAdminAreaCampus,
  getAllRolPermisions,
  createAdministator,
  createAdminAreaCampus,
  getAllCampus,
} = require("../functions/admin.function");
const {
  AdministratorsModel,
  PermisionRolesModel,
  forgotPasswords,
  AdminAreaCampusModel,
  AreaHeadquartersModel,
  AreasModel,
  HeadQuartersModel,
  TypeUsersModel,
  RolesModel,
  TerminalsModel
} = require("../models");

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
const adminAuth = async (req = Request, res = Response) => {
  const { email, password, deviceId } = req.body;
  try {
    if(deviceId){
      let device = await TerminalsModel.findOne({
        where: { trm_serie: deviceId}
      });
      console.log('device'+device)
      if(!device){
        return res.status(404).json({ msg: "Está terminal no se encuentrá registrada" });
      }
    }
    let user = await AdministratorsModel.findOne({
      where: { adm_email: email, adm_state: 1 },
      include: [
        {
          model: TypeUsersModel,
          required: true,
        },
        {
          model: RolesModel,
          required: true,
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no tiene acceso" });
    }
    bcryptjs.compare(password, user.adm_password, async function (err, result) {
      if (result) {
        let token = await gerateJWT(user.id);
        let resp = await getAllAdminAreaCampus({ id_admin: user.id });
        let areaCampus = resp.map((a) => a.serv_area_headquarter.id_campus);
        areaCampus = [...new Set(areaCampus)];
        let areaCampusName = resp.map(
          (a) =>
            a.serv_area_headquarter.serv_area.ars_name +
            "-" +
            a.serv_area_headquarter.serv_headquarter.hdq_name
        );
        // areaCampusName = await getUniqueListBy(areaCampusName);
        let rol = await PermisionRolesModel.findAll({
          where: { id_rol: user.id_rol, prmRls_state: 1 },
        });

        let campus = resp.map((a) => a.serv_area_headquarter.serv_headquarter);
        campus = await getUniqueListBy(campus, "id");
        let permisions = rol.map((a) => a.id_permision);
        if (email == "servest@unifranz.edu.bo") {
          areaCampus = [1, 2, 3, 4];
        }
        return res.json({
          msg: "ok user",
          user: user,
          token: token,
          permisions,
          area_campus: areaCampus,
          area_campus_name: areaCampusName,
          campus: campus,
        });
      } else {
        return res.status(404).json({ msg: "Contraseña incorrecta" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const forgotPassword = async (req, res = response) => {
  const msg =
    "Revise su correo electrónico, para un código para restablecer su contraseña";
  /* CREATE ACCESS TOKEN FOR FORGOT PASSWORD */
  try {
    /* search user email */
    let user = await getAdministrator({
      adm_email: req.body.email,
      adm_state: 1,
    });

    if (!user) {
      return res.status(404).json({
        msg: `No existe el usuario con el correo ${req.body.email}`,
      });
    }

    const nanoid = customAlphabet("1234567890", 4);
    const codeg = nanoid();

    let verificationLink = `código: ${codeg}`;

    const existForgot = await getForgotPassword({ user_id: user.id });
    const salt = bcryptjs.genSaltSync();

    const forgot = new forgotPasswords();
    forgot.user_id = user.id;
    forgot.code = bcryptjs.hashSync(codeg, salt);

    if (!existForgot) {
      await forgot.save();
    } else {
      await forgotPasswords.update(
        { code: forgot.code },
        { where: { id: existForgot.id } }
      );
    }

    /* SEND EMAIL */
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"CALIFICADOR DE SERVICIOS UNIFRANZ " <servest@unifranz.edu.bo>', // sender address
      to: user.adm_email,
      subject: "Recuperar contraseña", // Subject line
      html: `
        <b> Inserte el siguiente código para completar el proceso</b>
        <br>
        <h1>${verificationLink}<h1/>
        `, // html body
    });

    return res.json({ msg, email: user.adm_email });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const verifyCode = async (req, res = response) => {
  const { email, code } = req.body;
  try {
    //encontrar usuario
    let user = await getAdministrator({
      adm_email: email,
      adm_state: 1,
    });
    // const user = await CustomerModel.findOne({ where: { adm_email: email } });
    if (!user) {
      return res.status(404).json({ msg: `El correo ${email} no existe` });
    }

    //encontrar si tiene codigo
    const existForgot = await forgotPasswords.findOne({
      where: { user_id: user.id },
    });
    if (!existForgot) {
      return res.status(404).json({ msg: "error no existe" });
    }

    //comparar codigo
    const validPassword = bcryptjs.compareSync(code, existForgot.code);
    if (!validPassword) {
      return res.status(404).json({ msg: "codigo incorrecto" });
    }

    return res.json({ msg: "codigo correcto" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updateNewPasswordCtrl = async (req, res = response) => {
  const { password, email, code } = req.body;

  try {
    //encontrar usuario
    let user = await getAdministrator({
      adm_email: email,
      adm_state: 1,
    });
    if (!user) {
      return res.status(404).json({ msg: `El correo ${email} no existe` });
    }

    //encontrar si tiene codigo
    const existForgot = await forgotPasswords.findOne({
      where: { user_id: user.id },
    });
    if (!existForgot) {
      return res.status(404).json({ msg: "error no existe" });
    }

    //comparar codigo
    const validPassword = bcryptjs.compareSync(code, existForgot.code);
    if (!validPassword) {
      return res.status(404).json({ msg: "codigo incorrecto" });
    }

    //encriptar nueva contraseña
    const salt = bcryptjs.genSaltSync();
    const newPassword = await bcryptjs.hashSync(password, salt);

    //actaulizar usuario
    await AdministratorsModel.update(
      {
        adm_password: newPassword,
      },
      { where: { id: user.id } }
    );

    return res.json({ msg: "correcto" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerAdministrator = async (req, res = response) => {
  const {
    id_responsable,
    id_type_user,
    id_rol,
    id_area_campus,
    adm_name,
    adm_lastName,
    adm_email,
  } = req.body;
  try {
    const salt = bcryptjs.genSaltSync();
    let adm_password = bcryptjs.hashSync(adm_email, salt);
    createAdministator({
      id_responsable,
      id_type_user,
      id_rol,
      adm_name,
      adm_lastName,
      adm_email,
      adm_password,
      adm_state: 1,
    }).then(async (result) => {
      let count = 0;
      id_area_campus.forEach(async (element) => {
        await createAdminAreaCampus({
          id_admin: result.id,
          id_area_campus: element,
        });
        count++;
        if (count == id_area_campus.length) {
          await getAllAdminAreaCampus({ id_admin: result.id }).then(
            (result2) => {
              result.dataValues.area_campus = result2;
              return res.json({
                result,
                msg: "cuenta registrada satisfactoriamente",
              });
            }
          );
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

const getCampusById = async (req = Request, res = Response) => {
  const { Campus } = req.params;
  try {
    let campus = Campus.split(",");
    getAllCampus({ id: campus }).then((user) => res.json(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const getAdministratorsByAreaCampus = async (req = Request, res = Response) => {
  try {
    let users = [];
    let count = 0;
    await AdminAreaCampusModel.findAll({
      where: { state: 1 },
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
        await AdministratorsModel.findOne({
          where: { id: result[i].id_admin },
          include: [
            {
              model: TypeUsersModel,
              required: true,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: RolesModel,
              required: true,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        }).then((result2) => {
          if (users.filter((e) => e.id == result2.id).length == 0) {
            result2.dataValues.area_campus = [result[i]];
            users.push(result2);
          } else {
            users
              .filter((e) => e.id == result2.id)[0]
              .dataValues.area_campus.push(result[i]);
          }
          count++;
        });
      }
      if (count == result.length) {
        res.json(users);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updatePwd = async (req = Request, res = Response) => {
  try {
    const { password } = req.body;
    //encriptar nueva contraseña
    const salt = bcryptjs.genSaltSync();
    const newPassword = await bcryptjs.hashSync(password, salt);

    //actaulizar usuario
    await AdministratorsModel.update(
      {
        adm_password: newPassword,
      },
      { where: { id: req.params.Id } }
    );

    return res.json({ msg: "correcto" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updateAdministrator = async (req = Request, res = Response) => {
  try {
    const {
      id_responsable,
      id_type_user,
      id_rol,
      id_area_campus,
      adm_name,
      adm_lastName,
      adm_email,
      adm_state,
    } = req.body;

    AdministratorsModel.update(
      {
        id_responsable: id_responsable,
        id_type_user: id_type_user,
        id_rol: id_rol,
        adm_name: adm_name,
        adm_lastName: adm_lastName,
        adm_email: adm_email,
        adm_state: adm_state,
      },
      { where: { id: req.params.Id } }
    ).then(async (result) => {
      let areaCampusByAdmin = await getAllAdminAreaCampus({
        id_admin: req.params.Id,
      });
      let edit = [];
      if (id_area_campus != undefined) {
        for (let i = 0; i < id_area_campus.length; i++) {
          for (let j = 0; j < areaCampusByAdmin.length; j++) {
            if (id_area_campus[i] == areaCampusByAdmin[j].id_area_campus) {
              await AdminAreaCampusModel.update(
                {
                  state: 1,
                },
                {
                  where: { id: areaCampusByAdmin[j].id },
                }
              );
              edit.push(areaCampusByAdmin[j].id_area_campus);
            } else {
              if (
                edit.filter((e) => e == areaCampusByAdmin[j].id_area_campus)
                  .length == 0
              ) {
                await AdminAreaCampusModel.update(
                  {
                    state: 0,
                  },
                  {
                    where: { id: areaCampusByAdmin[j].id },
                  }
                );
              }
            }
          }
          if (
            areaCampusByAdmin.filter(
              (e) => e.id_area_campus == id_area_campus[i]
            ).length == 0
          ) {
            await createAdminAreaCampus({
              id_admin: req.params.Id,
              id_area_campus: id_area_campus[i],
              prmRls_state: 1,
            });
          }
        }
      }
      await getAdministrator({ id: req.params.Id }).then(async (result2) => {
        await getAllAdminAreaCampus({ id_admin: req.params.Id }).then(
          (result3) => {
            result2.dataValues.area_campus = result3;
            return res.json(result2);
          }
        );
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
  adminAuth,
  forgotPassword,
  verifyCode,
  updateNewPasswordCtrl,
  registerAdministrator,
  getCampusById,
  getAdministratorsByAreaCampus,
  updatePwd,
  updateAdministrator,
};
