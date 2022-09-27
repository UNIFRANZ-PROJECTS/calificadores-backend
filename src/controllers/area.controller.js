
const { request, response } = require("express");



const { AreasModel,AreaHeadquartersModel,HeadQuartersModel,AdminAreaCampusModel,SurveysModel, SurveysQuestionsModel, QuestionsModel } = require("../models");
const getAllAreas = async( req = Request , res = Response ) => {
  try {
    AreasModel.findAll({
      where: {ars_state:1},
      attributes: { exclude: ["createdAt", "updatedAt", "ars_state"] }
    }).then(user => res.status(200).json(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
}
const getAreasByIdCampus = async( req = Request , res = Response ) => {
    try {
      let areaCampus = req.params.Id.split(',')
      await AreaHeadquartersModel.findAll({
        where: {id_campus:areaCampus},
        attributes: { exclude: ["id_campus","id_area","createdAt", "updatedAt"] },
        include: [
          {
            model: AreasModel,
            required: true,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: HeadQuartersModel,
            required: true,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      }).then(result => res.status(200).json(result));
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
  const getAreaCampusById = async( req = Request , res = Response ) => {
    const { Id } = req.params;
    try {
      let areaCampuss= Id.split(',')
      let areasCampus=[];
      await AreaHeadquartersModel.findAll({
        where: {id:areaCampuss},
        include: [
          {
            model: AreasModel,
            required: true
          },
          {
            model: HeadQuartersModel,
            required: true
          },
        ],
      }).then(async result => {
        for (let i = 0; i < result.length; i++) {
          await areasCampus.push({
            id:result[i].id,
            arsHdq_state:result[i].arsHdq_state,
            ars_name:result[i].serv_area.ars_name,
            hdq_name:result[i].serv_headquarter.hdq_name,
            id_campus:result[i].serv_headquarter.id
          })
        }
        res.json(areasCampus)
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
const getSurveysByCampusId = async( req = request , res = response ) => {
//devolver todas las areas con sus respectivas encuestas
try {
  let areaHeadquarter = await AreaHeadquartersModel.findAll({
    where: {id_campus:req.params.Id},
    attributes: { exclude: ["id_campus","id_area","createdAt", "updatedAt"] },
    include: [
      {
        model: AreasModel,
        required: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  })
  for await (const results of areaHeadquarter) {
    let survey = await SurveysModel.findAll({
      where: {id_area_campus:results.id},
    })
    for await ( const result2 of survey){
      let question = await SurveysQuestionsModel.findAll({
        where: { id_survey:result2.id },
        include: [
          {
            model: QuestionsModel,
            required: true,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      })
      result2.dataValues.questions = question;
    }
    results.dataValues.survey = survey 
  }
  res.status(200).json(areaHeadquarter)
} catch (error) {
  console.log(error);
  res.status(500).json({
    msg: "Hable con el administrador",
  });
}
}
const registerAreaCampus = async( req = request , res = response ) => {
    try {
        const { id_administrator,ars_name,id_campus} = req.body;
        const Area = new AreasModel();
        Area.ars_name= ars_name;
        await Area.save()
        .then(async result1 =>{
            const AreaHeadquarter = new AreaHeadquartersModel();
            AreaHeadquarter.id_campus = id_campus;
            AreaHeadquarter.id_area = result1.id;
            await AreaHeadquarter.save()
          .then(async result2 =>{
            const AdminAreaCampus = new AdminAreaCampusModel();
            AdminAreaCampus.id_admin =id_administrator;
            AdminAreaCampus.id_area_campus = result2.id;
            await AdminAreaCampus.save();
            result3 = await HeadQuartersModel.findOne({
                where: {id:result2.id_campus},
              });
            res.status(200).json({ 
              id:result2.id,
              arsHdq_state:result2.arsHdq_state,
              ars_name:result1.ars_name,
              hdq_name: result3.hdq_name,
              id_campus:result2.id_campus,
              msg: 'area y campus registrada satisfactoriamente'})
          })
        })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
const updateAreaCampusById = async( req = request , res = response ) => {
    try {
        const { ars_name,id_campus,arsHdq_state} = req.body;
        let areasCampus={};
        AreasModel.update(
          {
            ars_name:ars_name,
          },
          {where: {id: req.params.Id}})
          .then(async()=>{
            await AreaHeadquartersModel.findOne({
                where: {id_area:req.params.Id},
                include: [
                  {
                    model: AreasModel,
                    required: true
                  },
                  {
                    model: HeadQuartersModel,
                    required: true
                  },
                ],
              })
            .then((result)=>{
              AreaHeadquartersModel.update({
                id_campus:id_campus,
                arsHdq_state:arsHdq_state
              },
              {where: {id:result.id}})
              .then(async()=>{
                 await AreaHeadquartersModel.findOne({
                    where: {id_area:req.params.Id},
                    include: [
                      {
                        model: AreasModel,
                        required: true
                      },
                      {
                        model: HeadQuartersModel,
                        required: true
                      },
                    ],
                  })
                .then((result3)=>{
                  areasCampus = {
                    id:result3.id,
                    arsHdq_state:result3.arsHdq_state,
                    ars_name:result3.serv_area.ars_name,
                    hdq_name:result3.serv_headquarter.hdq_name,
                    id_campus:result3.serv_headquarter.id
                  };
                  res.status(200).json({areasCampus,msg:"editado correctamente"})
                })
                
              })
            })
    
          })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
module.exports = {
    registerAreaCampus,
    updateAreaCampusById,
    getAreasByIdCampus,
    getAllAreas,
    getAreaCampusById,
    getSurveysByCampusId
};
