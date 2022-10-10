const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require("../middlewares");

const { typeUserExists } = require("../helpers/db-validators");

const {
  getAllTypeUsers,
  registerTypeUser,
  updateTypeUserById,
} = require("../controllers/typeUser.controller");
const router = Router();

router.get("/", validarJWT, getAllTypeUsers);

router.post(
  "/register",
  [
    check("tyUsr_name", "El tyUsr_name es obligatorio").not().isEmpty(),
    check("tyUsr_name").custom(typeUserExists),
    validarCampos,
  ],
  validarJWT,
  registerTypeUser
);

router.put(
  "/update/:Id",
  [check("tyUsr_name").custom(typeUserExists), validarCampos],
  validarJWT,
  updateTypeUserById
);

module.exports = router;
