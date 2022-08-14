const { request, response } = require("express");

const { QuestionsModel } = require("../models");
const getAllQuestions = async (req = request, res = response) => {
  try {
    await QuestionsModel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).then((user) => res.status(200).json(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const registerQuestion = async (req = request, res = response) => {
  try {
    const { id_type_answer, qst_question } = req.body;
    const question = new QuestionsModel();
    question.id_type_answer = id_type_answer;
    question.qst_question = qst_question;
    await question
      .save()
      .then((result) =>
        res
          .status(200)
          .json({ result, msg: "pregunta registrada satisfactoriamente" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const updateQuestion = async (req = request, res = response) => {
  try {
    const { id_type_answer, qst_question, qst_state } = req.body;
    if(req.body.qst_question && req.body.id_type_answer){
      let questionExist = await QuestionsModel.findOne({
        where: { qst_question: qst_question },
      });
      if (questionExist) {
        if (questionExist.id != req.params.Id) {
          return res
            .status(400)
            .json({ errors: [{ msg: "ya existe un registro con ese nombre" }] });
        }
      }
    }

    QuestionsModel.update(
      {
        id_type_answer: id_type_answer,
        qst_question: qst_question,
        qst_state: qst_state,
      },
      { where: { id: req.params.Id } }
    ).then(async (result) => {
      await QuestionsModel.findOne({
        where: { id: req.params.Id },
      }).then((result2) => {
        res
          .status(200)
          .json({ result2, msg: "Pregunta editado correctamente" });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getAllQuestions,
  registerQuestion,
  updateQuestion,
};
