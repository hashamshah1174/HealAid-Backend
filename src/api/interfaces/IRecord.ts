import mongoose, { Date, Document } from "mongoose";
import { IUser } from "./IUser";
import { IConsultation } from "./IConsultation";

export interface IRecord extends Document {
  _id?: mongoose.Types.ObjectId;
  patientId: string | IUser;
  ipfsHash: string;
  detail?: string;
  accessConsultation?: string[] | IConsultation[];
  createdAt?: Date;
  updatedAt?: Date;
}
