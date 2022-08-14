
const { request, response } = require("express");



const { AnswersModel } = require("../models");
const getAllAnswers = async( req = request , res = response ) => {
    try {
        await AnswersModel.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }).then(result => res.json(result));
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
const registerAnswer = async( req = request , res = response ) => {
    try {
        const {id_question, id_survey, id_type_answer, answer, date_answer} = req.body;
        const Answer = new AnswersModel();
        Answer.id_question= id_question;
        Answer.id_survey=id_survey;
        Answer.id_type_answer=id_type_answer;
        Answer.answer=answer;
        Answer.date_answer=date_answer;
        await Answer.save();
        return res.status(200).json({ Answer, msg: 'respuesta registrado satisfactoriamente'})
    } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "Hable con el administrador",
        });
        
    }
}
module.exports = {
    getAllAnswers,
    registerAnswer
};
