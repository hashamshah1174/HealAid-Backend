import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { IRecord } from "../interfaces/IRecord";

const schemaOptions = {
  timestamps: true,
};

const recordSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    detail: {
      type: String,
      required: false,
    },
    ipfsHash: {
      type: String,
    },
    accessDoctor: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users", // reference to the s model
      },
    ],
  },
  schemaOptions
);

export const Record = mongoose.model<IRecord>("Records", recordSchema);
