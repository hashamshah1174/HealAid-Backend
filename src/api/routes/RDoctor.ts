import * as express from "express";
import { AuthValidation } from "../middlewares/authvalidation";
import { Validation } from "../middlewares/validation";
import { DoctorController } from "../controllers/doctorController";

export class DoctorRoute {
  protected router: express.Router;
  protected authvalidation: AuthValidation;
  protected doctorcontroller: DoctorController;
  protected validate: Validation;
  protected validateRequest;
  constructor() {
    this.router = express.Router();
    this.doctorcontroller = new DoctorController();
    this.validate = new Validation();
    this.authvalidation = new AuthValidation();
    this.validateRequest = this.validate.reporter(true, "doctor");
  }
  public routes(api: express.Application): void {
    this.router.post(
      "/login",
      this.validateRequest,
      this.doctorcontroller.login
    );
    this.router.post(
      "/register",
      this.validateRequest,
      this.doctorcontroller.register
    );
    this.router.post(
      "/get/accesstoken",
      this.validateRequest,
      this.doctorcontroller.getAccessToken
    );
    this.router.post(
      "/logout",
      this.authvalidation.validateAuth,
      this.validateRequest,
      this.doctorcontroller.logout
    );

    /**
     * AUTH ROUTES
     *
     */

    /**
     * RECORD ROUTES
     *
     */

    /**
     * RECORD ROUTES  ENDS
     *
     */

    this.router.get(
      "/get-my-consultation",
      this.authvalidation.validateAuth,
      this.doctorcontroller.myConsultation
    );
    this.router.get(
      "/view-consultation/:consId",
      this.authvalidation.validateAuth,
      this.doctorcontroller.viewConsultation
    );

    this.router.get(
      "/end-consultation/:consId",
      this.authvalidation.validateAuth,
      this.doctorcontroller.endConsultation
    );
    this.router.get(
      "/request-payment-consultation/:consId",
      this.authvalidation.validateAuth,
      this.doctorcontroller.requestPaymentConsultation
    );

    api.use("/doctor", this.router);
  }
}
