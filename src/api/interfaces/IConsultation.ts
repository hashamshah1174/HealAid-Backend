import mongoose, { Date, Document } from "mongoose";
import { IUser } from "./IUser";
import { EConsultation } from "./enums/EConsultation";

export interface IConsultation extends Document {
  _id?: mongoose.Types.ObjectId;
  patientId: string | IUser;
  doctorId: string | IUser;
  date: Date;
  slot: string; //9:15-9:30
  amount: number;
  status: EConsultation;
  createdAt?: Date;
  updatedAt?: Date;
}
