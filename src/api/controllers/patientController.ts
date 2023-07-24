import { Request, Response } from "express";
import { ERole } from "../interfaces/enums/EUserRole";
import AuthService from "../services/authService";
import RecordService from "../services/recordService";
import ConsultationService from "../services/consultationService";

export class PatientController {
  public async login(req: Request, res: Response) {
    const response = await AuthService.patientLogin(req);
    return res.status(response.code).json(response);
  }

  public async register(req: Request, res: Response) {
    const response = await AuthService.patientRegister(req);
    return res.status(response.code).json(response);
  }
  public async getAccessToken(req: Request, res: Response) {
    const response = await AuthService.getAccessToken(req, ERole.user);
    return res.status(response.code).json(response);
  }

  public async logout(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await AuthService.logout(userId, req, ERole.user);
    return res.status(response.code).json(response);
  }

  public async createRecord(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await RecordService.create(userId, req);
    return res.status(response.code).json(response);
  }

  public async myRecord(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await RecordService.getMyRecord(userId);
    return res.status(response.code).json(response);
  }

  public async viewRecord(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const recId = req.params.recId;
    const response = await RecordService.viewRecord(recId);
    return res.status(response.code).json(response);
  }

  public async grantAndRevokeAccess(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const recId = req.params.recId;
    const doctorId = req.body.doctorId;
    const response = await RecordService.grantOrRevokeAccess(recId, doctorId);
    return res.status(response.code).json(response);
  }

  //constultation

  public async getDoctorList(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await ConsultationService.getDoctorList();
    return res.status(response.code).json(response);
  }
  public async viewDoctor(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const docId = req.params.docId;
    const response = await ConsultationService.viewDoctor(docId);
    return res.status(response.code).json(response);
  }
  public async createConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await ConsultationService.create(userId, req);
    return res.status(response.code).json(response);
  }

  public async myConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const response = await ConsultationService.getMyConsultation(userId, false);
    return res.status(response.code).json(response);
  }

  public async viewConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const consId = req.params.consId;
    const response = await ConsultationService.viewConsultation(consId);
    return res.status(response.code).json(response);
  }

  public async startConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const consId = req.params.consId;
    const response = await ConsultationService.startConsultation(
      userId,
      consId
    );
    return res.status(response.code).json(response);
  }

  public async releasePaymentConsultation(req: Request, res: Response) {
    const userId = req?.locals?.auth?.userId!;
    const consId = req.params.consId;
    const response = await ConsultationService.releasePaymentConsultation(
      userId,
      consId
    );
    return res.status(response.code).json(response);
  }
}
