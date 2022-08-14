const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require('../middlewares');


const {
    getAllAreas,
    getAreasByIdCampus,
    getAreaCampusById,
    registerAreaCampus,
    updateAreaCampusById
} = require("../controllers/area.controller");
const router = Router();

router.get('/', validarJWT, getAllAreas)

router.get('/campus/:Id', validarJWT, getAreasByIdCampus)

router.get('/areascampus/:Id', validarJWT, getAreaCampusById)

router.post('/register/areacampus',[
    check('id_administrator','El id_administrator es obligatorio').not().isEmpty(),
    check('ars_name','El ars_name es obligatorio').not().isEmpty(),
    check('id_campus','El id_campus es obligatorio').not().isEmpty(),
    validarCampos
], validarJWT, registerAreaCampus);

router.put('/update/areacampus/:Id', validarJWT, updateAreaCampusById)

module.exports = router;