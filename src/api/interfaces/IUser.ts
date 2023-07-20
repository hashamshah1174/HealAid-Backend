import mongoose, { Document } from "mongoose";
import { ERole } from "./enums/EUserRole";
import { ISkill } from "./ISkill";

export interface IUser extends Document {
  _id?: mongoose.Types.ObjectId;
  fullName?: string;
  email: string;
  contact: string;
  password: string;
  role: ERole;
  metaMaskAddress?: string;
  privateKey?: string;
  skills?: string[] | ISkill[];
}
