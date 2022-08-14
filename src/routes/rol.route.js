const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require('../middlewares');


const {
    getAllRoles,
    registerRol,
    updateRol,
    getAllRolPermisions
} = require("../controllers/rol.controller");
const router = Router();


router.get('/', validarJWT, getAllRoles);

router.get('/permisions', validarJWT, getAllRolPermisions);

router.post('/register/permision',[
    check('rls_name','El rls_name es obligatorio').not().isEmpty(),
    check('rls_description','El rls_description es obligatorio').not().isEmpty(),
    check('rls_permisions','El rls_permisions es obligatorio').not().isEmpty(),
    validarCampos
], validarJWT, registerRol);

router.put('/update/:Id', validarJWT, updateRol);



module.exports = router;