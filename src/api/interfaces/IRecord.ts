import mongoose, { Date, Document } from "mongoose";
import { IUser } from "./IUser";

export interface IRecord extends Document {
  _id?: mongoose.Types.ObjectId;
  patientId: string | IUser;
  ipfsHash: string;
  detail?: string;
  accessDoctor?: string[] | IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}
