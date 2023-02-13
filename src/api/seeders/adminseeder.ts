import { Database } from "../../config/database";
import * as bcrypt from "bcrypt";
import mongoose from "mongoose";
import { ERole } from "../interfaces/enums/EUserRole";
import { User } from "../models/MUser";
import { IUser } from "../interfaces/IUser";

new Database(); //connect database

User.findOne({ role: ERole.admin })
  .exec()
  .then((result) => {
    console.log("Admin Seeder Successfully Started");

    if (!result) {
      bcrypt.hash("csfyp1903", 10, (err, hash) => {
        if (err) {
          console.log("error" + err);
        } else {
          const Admindata: IUser = new User({
            _id: new mongoose.Types.ObjectId(),
            role: ERole.admin,
            fullName: "dummy dummy",
            email: "csfyp1903@dsu.edu.pk",
            contact: "+81XXXXXXXXXXX",
            password: hash,
          });

          Admindata.save()
            .then(async (user) => {
              console.log(`${user} users created`);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              console.log("Admin Seeder Successfully Executed");
              mongoose.connection.close();
            });
        }
      });
    } else {
      console.log("Admin Data already exist", result);
      mongoose.connection.close();
    }
  });
