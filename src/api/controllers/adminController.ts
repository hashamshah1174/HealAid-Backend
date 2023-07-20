import { Request, Response } from "express";
import { ERole } from "../interfaces/enums/EUserRole";
import AuthService from "../services/authservice";

export class AdminController {
  public async login(req: Request, res: Response) {
    const response = await AuthService.login(req);
    return res.status(response.code).json(response);
  }

  public async getAccessToken(req: Request, res: Response) {
    const response = await AuthService.getAccessToken(req, ERole.admin);
    return res.status(response.code).json(response);
  }

  public async logout(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await AuthService.logout(userId, req, ERole.admin);
    return res.status(response.code).json(response);
  }
}
