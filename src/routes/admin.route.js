const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require("../middlewares");

const { emailExists } = require("../helpers/db-validators");

const {
  adminAuth,
  forgotPassword,
  verifyCode,
  updateNewPasswordCtrl,
  registerAdministrator,
  getCampusById,
  getAdministratorsByAreaCampus,
  updatePwd,
  updateAdministrator,
} = require("../controllers/admin.controller");
const router = Router();

router.post(
  "/auth",
  [
    check("email", "El correo no es válido").isEmail(),
    check("password", "La contrasena debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  adminAuth
);

router.post(
  "/forgot/",
  [check("email", "El correo no es válido").isEmail(), validarCampos],
  forgotPassword
);

router.post(
  "/verifycode/",
  [
    check("email", "El correo no es válido").isEmail(),
    check("code", "El código es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  verifyCode
);

router.post(
  "/newpass/",
  [
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("code", "El código es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateNewPasswordCtrl
);

router.post(
  "/register/",
  [
    check("id_responsable", "El id_responsable es obligatorio").not().isEmpty(),
    check("id_type_user", "El id_type_user es obligatorio").not().isEmpty(),
    check("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    check("id_area_campus", "El id_area_campus es obligatorio").not().isEmpty(),
    check("adm_name", "El nombre es obligatorio").not().isEmpty(),
    check("adm_lastName", "El apellido es obligatorio").not().isEmpty(),
    check("adm_email", "El correo no es válido").isEmail(),
    check(
      "adm_email",
      "El correo debe de terminar en @unifranz.edu.bo"
    ).contains("@unifranz.edu.bo"),
    check("adm_email").custom(emailExists),
    validarCampos,
  ],
  validarJWT,
  registerAdministrator
);

router.put("/updatepwd/:Id", validarJWT, updatePwd);

router.put(
  "/update/:Id",
  [check("adm_email").custom(emailExists), validarCampos],
  validarJWT,
  updateAdministrator
);

router.get("/campus/:Campus", validarJWT, getCampusById);

router.get("/areacampus", validarJWT, getAdministratorsByAreaCampus);

module.exports = router;
