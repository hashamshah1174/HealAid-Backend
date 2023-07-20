import mongoose, { Schema, Document, Date } from "mongoose";

import { ISkill } from "../interfaces/ISkill";

const schemaOptions = {
  timestamps: true,
};

const SkillSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },

  name: {
    type: String,
    required: true,
  },
});

export const Skill = mongoose.model<ISkill>("Skills", SkillSchema);
