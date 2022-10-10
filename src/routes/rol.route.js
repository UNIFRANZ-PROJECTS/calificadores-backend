const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require("../middlewares");

const { rolExists } = require("../helpers/db-validators");

const {
  getAllRoles,
  registerRol,
  updateRol,
  getAllRolPermisions,
} = require("../controllers/rol.controller");
const router = Router();

router.get("/", validarJWT, getAllRoles);

router.get("/permisions", validarJWT, getAllRolPermisions);

router.post(
  "/register/permision",
  [
    check("rls_name", "El rls_name es obligatorio").not().isEmpty(),
    check("rls_permisions", "El rls_permisions es obligatorio").not().isEmpty(),
    check("rls_name").custom(rolExists),
    validarCampos,
  ],
  validarJWT,
  registerRol
);

router.put(
  "/update/:Id",
  [check("rls_name").custom(rolExists), validarCampos],
  validarJWT,
  updateRol
);

module.exports = router;
