import { Request, Response } from "express";
import { ERole } from "../interfaces/enums/EUserRole";
import AuthService from "../services/authService";
import ConsultationService from "../services/consultationService";

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

  public async myConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await ConsultationService.getMyConsultation(userId, true);
    return res.status(response.code).json(response);
  }

  public async viewConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const recId = req.params.consId;
    const response = await ConsultationService.viewConsultation(recId);
    return res.status(response.code).json(response);
  }

  public async endConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const consId = req.params.consId;
    const response = await ConsultationService.endConsultation(userId, consId);
    return res.status(response.code).json(response);
  }

  public async requestPaymentConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const consId = req.params.consId;
    const response = await ConsultationService.requestPaymentConsultation(
      userId,
      consId
    );
    return res.status(response.code).json(response);
  }
}
