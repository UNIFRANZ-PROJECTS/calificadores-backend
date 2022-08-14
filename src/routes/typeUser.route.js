const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos , validarJWT} = require('../middlewares');

const { typeUserEXists } = require('../helpers/db-validators');

const {
    getAllTypeUsers,
    registerTypeUser,
    updateTypeUserById
} = require("../controllers/typeUser.controller");
const router = Router();


router.get('/', validarJWT , getAllTypeUsers);

router.post('/register',[
    check('tyUsr_name','El tyUsr_name es obligatorio').not().isEmpty(),
    check('tyUsr_description','El tyUsr_description es obligatorio').not().isEmpty(),
    check('tyUsr_name').custom( typeUserEXists ),
    validarCampos
], validarJWT , registerTypeUser);

router.put('/update/:Id', validarJWT, updateTypeUserById)

module.exports = router;