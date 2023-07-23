import mongoose, { Schema } from "mongoose";

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
    accessConsultation: [
      {
        type: Schema.Types.ObjectId,
        ref: "Consultations", // reference to the s model
      },
    ],
  },
  schemaOptions
);

export const Record = mongoose.model<IRecord>("Records", recordSchema);
