const { Router } = require("express");

const { validarJWT } = require('../middlewares');


const {
    getReportAreaCampusById,
    getReportNationalByIdCampus
} = require("../controllers/report.controller");
const router = Router();


router.get('/areacampus/:Id', validarJWT , getReportAreaCampusById);

router.get('/national/campus/:Id', validarJWT, getReportNationalByIdCampus);

module.exports = router;