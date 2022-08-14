
const {
    AdministratorsModel,
    TypeUsersModel,
    QuestionsModel
    } = require('../models/index');


const emailExists = async( adm_email = '' ) => {
    // Verificar si el correo existe
    const existEmail = await AdministratorsModel.findOne({
        where: {
            adm_email: adm_email
        }
    });
    
    if ( existEmail ) {
        throw new Error(`El email: ${ adm_email }, ya está registrado`);
    }
}
const typeUserEXists = async( tyUsr_name = '' ) => {
    const existTypeUser = await TypeUsersModel.findOne({
        where: {
            tyUsr_name: tyUsr_name
        }
    });
    
    if ( existTypeUser ) {
        throw new Error(`El nombre: ${ tyUsr_name }, ya está registrado`);
    }
}
const questionExists = async( qst_question = '' ) => {
    const existQuestion = await QuestionsModel.findOne({
        where: {
            qst_question: qst_question
        }
    });
    
    if ( existQuestion ) {
        throw new Error(`La pregunta: ${ qst_question }, ya está registrado`);
    }
}

module.exports = {
    emailExists,
    typeUserEXists,
    questionExists
}

