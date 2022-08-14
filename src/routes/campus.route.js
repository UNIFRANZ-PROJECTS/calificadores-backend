const { Router } = require("express");

const { validarJWT } = require('../middlewares');

const {
    getCampus,
} = require("../controllers/campus.controller");
const router = Router();


router.get('/:Id', validarJWT, getCampus);

module.exports = router;