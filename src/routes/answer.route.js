const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require('../middlewares');


const {
    getAllAnswers,
    registerAnswer
} = require("../controllers/answer.controller");
const router = Router();


router.get('/', validarJWT, getAllAnswers);

router.post('/register',[
    check('id_question','El id_question es obligatorio').not().isEmpty(),
    check('id_survey','El id_survey es obligatorio').not().isEmpty(),
    check('id_type_answer','El id_type_answer es obligatorio').not().isEmpty(),
    check('answer','El answer es obligatorio').not().isEmpty(),
    check('date_answer','El date_answer es obligatorio').not().isEmpty(),
    validarCampos
], validarJWT, registerAnswer);

module.exports = router;