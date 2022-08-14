const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos , validarJWT } = require('../middlewares');


const {
    getAllTerminals,
    registerTerminal,
    registerSurveyTerminal,
    getAllSurveyTerminals
} = require("../controllers/terminal.controller");
const router = Router();


router.get('/', validarJWT , getAllTerminals);

router.get('/survey', validarJWT , getAllSurveyTerminals)

router.post('/register',[
    check('id_administrator','El id_administrator es obligatorio').not().isEmpty(),
    check('trm_description','El trm_description es obligatorio').not().isEmpty(),
    validarCampos
], validarJWT , registerTerminal);

router.post('/register/survey/terminal',[
    check('id_survey','El id_survey es obligatorio').not().isEmpty(),
    check('id_terminal','El id_terminal es obligatorio').not().isEmpty(),
    validarCampos
], validarJWT, registerSurveyTerminal)


module.exports = router;