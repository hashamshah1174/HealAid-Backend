import mongoose, { Document } from "mongoose";
import { ERole } from "./enums/EUserRole";


export interface IToken extends Document{
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    token: string;
    refreshToken: string;
    role: ERole;
  }