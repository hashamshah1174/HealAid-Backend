import mongoose, { Schema, Document, Date } from "mongoose";
import { IToken } from "../interfaces/IToken";
import { ERole } from "../interfaces/enums/EUserRole";

const schemaOptions = {
  timestamps: true,
};


const tokenSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ERole,
    },
    token: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  schemaOptions
);
tokenSchema.index({ _id: 1, userId: 1, userRole: 1, refreshToken: 1 });

export const TokenKey = mongoose.model<IToken>("Tokens", tokenSchema);
