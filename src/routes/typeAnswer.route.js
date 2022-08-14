const { Router } = require("express");

const { validarJWT } = require('../middlewares');

const {
    getTypeAnswers,
} = require("../controllers/typeAnswer.controller");
const router = Router();


router.get('/', validarJWT, getTypeAnswers);

module.exports = router;