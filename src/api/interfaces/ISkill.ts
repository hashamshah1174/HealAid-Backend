import mongoose, { Document } from "mongoose";

export interface ISkill extends Document {
  _id?: mongoose.Types.ObjectId;
  name: {
    type: string;
  };
}
