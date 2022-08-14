const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require('../middlewares');

const { questionExists } = require('../helpers/db-validators');

const {
    getAllQuestions,
    registerQuestion,
    updateQuestion
} = require("../controllers/question.controller");
const router = Router();


router.get('/', validarJWT, getAllQuestions);

router.post('/register',[
    check('id_type_answer','El id_type_answer es obligatorio').not().isEmpty(),
    check('qst_question','El qst_question es obligatorio').not().isEmpty(),
    check('qst_question').custom( questionExists ),
    validarCampos
], validarJWT , registerQuestion);

router.put('/update/:Id', validarJWT, updateQuestion)

module.exports = router;