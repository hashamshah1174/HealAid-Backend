import { Request, Response } from "express";
import { ERole } from "../interfaces/enums/EUserRole";
import AuthService from "../services/authservice";

export class AuthController {
  public async login(req: Request, res: Response) {
    const response = await AuthService.login(req);
    return res.status(response.code).json(response);
  }
  public async getAccessToken(req: Request, res: Response) {
    const response = await AuthService.getAccessToken(req,(req.body.role as ERole));
    return res.status(response.code).json(response);
  }

  public async logout(req: Request, res: Response) {
    const response = await AuthService.logout(req,(req.body.role as ERole));
    return res.status(response.code).json(response);
  }
}
