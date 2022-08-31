const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos ,validarJWT } = require('../middlewares');


const {
    getSurveyAreaCampusById,
    getSurveyQuestionsById,
    registerSurvey,
    updateSurvey,
    getSurveyQuestions
} = require("../controllers/survey.controller");
const router = Router();

router.get('/', validarJWT, getSurveyQuestions)

router.get('/areacampus/:Id', validarJWT , getSurveyAreaCampusById);

router.get('/questions/:Id', validarJWT , getSurveyQuestionsById);



router.post('/register',[
    check('id_administrator','El id_administrator es obligatorio').not().isEmpty(),
    check('id_area_campus','El id_area_campus es obligatorio').not().isEmpty(),
    check('srv_name','El srv_name es obligatorio').not().isEmpty(),
    check('questions','El questions es obligatorio').not().isEmpty(),
    validarCampos
], validarJWT, registerSurvey);

router.put('/update/:Id', validarJWT, updateSurvey)
module.exports = router;