import { Request, Response } from "express";
import GeneralService from "../services/generalService";

export class GeneralController {
  public async skillData(req: Request, res: Response) {
    const response = await GeneralService.getSkillList();
    return res.status(response.code).json(response);
  }
}
