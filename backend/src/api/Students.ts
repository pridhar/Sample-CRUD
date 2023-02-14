const express = require("express");
const studentsRouter = express.Router();
import { Student } from "../entities/Student";
import { Standard } from "../entities/Standard";
import { Studentprofile } from "../entities/Studentprofile";
import { Parent } from "../entities/Parent";
import { studentRepo, profileRepo, parentRepo, standardRepo } from "../app";

studentsRouter.get("/", async (req, res)=> {
  const allstudents = await studentRepo.find();
  res.send(allstudents);
});

studentsRouter.get("/:id", async (req, res)=> {
  const sid = req.params.id;
  const astudent = await studentRepo.findOne({ where: { id: sid } });
  res.send(astudent);
});

studentsRouter.delete("/:id", async (req, res)=> {
  const ssid = req.params.id;
  const astudent = await studentRepo.findOne({ where: { id: ssid } });
  if(astudent){
    const pid = astudent.profile.id;
    await profileRepo.delete({ id: pid });
  }
  
  await studentRepo.delete({ id: ssid });
});

studentsRouter.put("/:id", async (req, res)=> {
  const sid = req.params.id;
  const foundstudent = await studentRepo.findOne({ where: { id: sid } });
  if (foundstudent) {
    if (req.body.sname) foundstudent.studentName = req.body.sname;
    if (req.body.semail) foundstudent.profile.email = req.body.semail;
    if (req.body.smob) foundstudent.profile.mobile = req.body.smob;
    if (req.body.sstandard)
      foundstudent.standards[0].standardName = req.body.sstandard;
    if (req.body.sparent1)
      foundstudent.parents[0].parentName = req.body.sparent1;
    if (req.body.sparent2)
      foundstudent.parents[1].parentName = req.body.sparent2;

    const updatedstudent = await studentRepo.save(foundstudent);
    res.send(updatedstudent);
  }
});

studentsRouter.post("/", async (req, res)=> {
  let newprofile = new Studentprofile();
  newprofile.email = req.body.semail;
  newprofile.mobile = req.body.smob;

  let parentsnew: Parent[] = [];
  let newparents1 = new Parent();
  newparents1.parentName = req.body.sparent1;

  let newparents2 = new Parent();
  newparents2.parentName = req.body.sparent2;

  parentsnew.push(newparents1, newparents2);

  let standardarr: Standard[] = [];

  
  let newstudent = new Student();
  newstudent.studentName = req.body.sname;
  newstudent.profile = newprofile;
  newstudent.parents = parentsnew;
  //newstudent.standards = standardarr;

  const ssid = req.body.sstandard;
  let foundstand  = await standardRepo.findOne({ where: { standardName: ssid } });
  if (foundstand) {
   
    let nfoundstand : any = foundstand;
    standardarr.push(nfoundstand);
    //foundstand.standardName = req.body.sstandard;
    //standardarr = Object.entries(foundstand); 
    console.log(foundstand);

  }else{
    let newstand = new Standard();
    newstand.standardName = req.body.sstandard;
    //console.log(newstand);
    standardarr.push(newstand); 
   
  }

 newstudent.standards = standardarr;

  const insstudent = await studentRepo.save(newstudent);
  res.send(insstudent);
  //console.log(insstudent);
  


});

//module.exports = studentsRouter;
module.exports = {
  studentsRouter,
};
