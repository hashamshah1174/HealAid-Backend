import { ResponseHelper } from "../helpers/responseapihelper";
import { ISkill } from "../interfaces/ISkill";
import { Skill } from "../models/MSkill";

class GeneralService {
  //for authentication
  async getSkillList(): Promise<ApiResponse> {
    try {
      const skillData: ISkill[] = await Skill.find({}).lean();
      return ResponseHelper.sendSuccessResponse("Skill List", skillData);
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }
}

export default new GeneralService();
