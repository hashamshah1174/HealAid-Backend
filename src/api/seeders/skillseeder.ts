import mongoose from "mongoose";
import { Database } from "../../config/database";
import { ISkill } from "../interfaces/ISkill";
import { Skill } from "../models/MSkill";

new Database(); //connect database

const skillData: ISkill[] = [
  new Skill({
    _id: new mongoose.Types.ObjectId(),
    name: "Ophthalmology",
  }),
  new Skill({
    _id: new mongoose.Types.ObjectId(),
    name: "Dermatology",
  }),
  new Skill({
    _id: new mongoose.Types.ObjectId(),
    name: "Orthopedics",
  }),
  new Skill({
    _id: new mongoose.Types.ObjectId(),
    name: "Cardiology",
  }),
  new Skill({
    _id: new mongoose.Types.ObjectId(),
    name: "Pediatrics",
  }),
  new Skill({
    _id: new mongoose.Types.ObjectId(),
    name: "Psychiatry",
  }),
  new Skill({
    _id: new mongoose.Types.ObjectId(),
    name: "Neurology",
  }),
];

Skill.insertMany(skillData)
  .then(function () {
    console.log("Data inserted"); // Success
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Skill Seeder Successfully Executed");
    mongoose.connection.close();
  });
