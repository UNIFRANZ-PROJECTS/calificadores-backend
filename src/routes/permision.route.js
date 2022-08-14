const { Router } = require("express");

const { validarJWT } = require('../middlewares');


const {
    getAllPermisions,
} = require("../controllers/permision.controller");
const router = Router();


router.get("/",validarJWT,getAllPermisions);

module.exports = router;