const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const {AdministratorsModel} = require('./../models');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('authorization');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        const { uid } = jwt.verify( bearerToken, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        console.log(uid)
        const usuario = await AdministratorsModel.findOne({
            where: { id: uid }})

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        // Verificar si el uid tiene estado true
        if ( usuario.adm_state == 0 ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}