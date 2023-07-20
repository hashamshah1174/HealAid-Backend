import mongoose, { Schema } from "mongoose";
import { IConsultation } from "../interfaces/IConsultation";
import { EConsultation } from "../interfaces/enums/EConsultation";

const schemaOptions = {
  timestamps: true,
};

const consultationSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    date: {
      type: Schema.Types.Date,
    },
    slot: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: EConsultation,
      default: EConsultation.created,
    },
  },
  schemaOptions
);

export const Consultation = mongoose.model<IConsultation>(
  "Consultations",
  consultationSchema
);
