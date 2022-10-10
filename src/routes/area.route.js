const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require("../middlewares");

const {
  areaExists,
  assignmentAreaCampusExist,
} = require("../helpers/db-validators");

const {
  getAllAreas,
  getAreasByIdCampus,
  getAreaCampusById,
  registerArea,
  registerAreaCampus,
  updateAreaCampusById,
  registerUpdateArea,
  getSurveysByCampusId,
} = require("../controllers/area.controller");
const router = Router();

router.get("/", validarJWT, getAllAreas);

router.get("/campus/:Id", validarJWT, getAreasByIdCampus);

router.get("/areascampus/", validarJWT, getAreaCampusById);

router.post(
  "/",
  [
    check("ars_name", "El ars_name es obligatorio").not().isEmpty(),
    check("ars_name").custom(areaExists),
    validarCampos,
  ],
  validarJWT,
  registerArea
);

router.post(
  "/register/areacampus",
  [
    check("id_administrator", "El id_administrator es obligatorio")
      .not()
      .isEmpty(),
    check("id_area", "El ars_name es obligatorio").not().isEmpty(),
    check("id_campus", "El id_campus es obligatorio").not().isEmpty(),
    check("id_area").custom(assignmentAreaCampusExist),
    validarCampos,
  ],
  validarJWT,
  registerAreaCampus
);

router.put(
  "/update/areacampus/:Id",
  [check("id_area").custom(assignmentAreaCampusExist), validarCampos],
  validarJWT,
  updateAreaCampusById
);

router.put(
  "/:Id",
  [check("ars_name").custom(areaExists), validarCampos],
  validarJWT,
  registerUpdateArea
);

router.get("/surveys/campus/:Id", validarJWT, getSurveysByCampusId);
module.exports = router;
