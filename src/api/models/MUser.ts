import mongoose, { Schema } from "mongoose";
import { ERole } from "../interfaces/enums/EUserRole";
import { IUser } from "../interfaces/IUser";

const schemaOptions = {
  timestamps: true,
};

const userSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    role: {
      type: String,
      required: true,
      enum: ERole,
    },
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    metaMaskAddress: {
      type: String,
    },
    privateKey: {
      type: String,
    },
    slots: [String],
  },
  schemaOptions
);
userSchema.index({ _id: 1, role: 1, password: 1 });

export const User = mongoose.model<IUser>("Users", userSchema);
