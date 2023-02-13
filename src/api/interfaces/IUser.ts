import mongoose, { Document } from "mongoose";
import { ERole } from "./enums/EUserRole";


export interface IUser extends Document {
    _id?: mongoose.Types.ObjectId;
    fullName?:string,
    email:string,
    contact:string,
    password:string,
    role:ERole,
    parentUserId?:mongoose.Types.ObjectId | IUser;
}