import { Request, Response } from "express";
import { ERole } from "../interfaces/enums/EUserRole";
import AuthService from "../services/authService";

export class DoctorController {
  public async login(req: Request, res: Response) {
    const response = await AuthService.doctorLogin(req);
    return res.status(response.code).json(response);
  }

  public async register(req: Request, res: Response) {
    const response = await AuthService.doctorRegister(req);
    return res.status(response.code).json(response);
  }
  public async getAccessToken(req: Request, res: Response) {
    const response = await AuthService.getAccessToken(req, ERole.doctor);
    return res.status(response.code).json(response);
  }

  public async logout(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await AuthService.logout(userId, req, ERole.doctor);
    return res.status(response.code).json(response);
  }
}
