import * as express from "express";
import { AuthValidation } from "../middlewares/authvalidation";
import { Validation } from "../middlewares/validation";
import multer from "multer";
import { PatientController } from "../controllers/patientController";

export class PatientRoute {
  protected router: express.Router;
  protected authvalidation: AuthValidation;
  protected patientController: PatientController;
  protected validate: Validation;
  protected upload: multer.Multer;

  protected validateRequest;
  constructor() {
    this.router = express.Router();
    this.patientController = new PatientController();
    this.validate = new Validation();
    this.authvalidation = new AuthValidation();
    this.validateRequest = this.validate.reporter(true, "patient");
    const storage = multer.memoryStorage();
    this.upload = multer({ storage });
  }
  public routes(api: express.Application): void {
    this.router.post(
      "/login",
      this.validateRequest,
      this.patientController.login
    );

    this.router.post(
      "/register",
      this.validateRequest,
      this.patientController.register
    );

    this.router.post(
      "/get/accesstoken",
      this.validateRequest,
      this.patientController.getAccessToken
    );
    this.router.post(
      "/logout",
      this.authvalidation.validateAuth,
      this.validateRequest,
      this.patientController.logout
    );

    /**
     * AUTH ROUTES
     *
     */

    /**
     * RECORD ROUTES
     *
     */
    this.router.post(
      "/record-create",
      this.authvalidation.validateAuth,
      this.upload.single("file"),
      this.patientController.createRecord
    );

    this.router.patch(
      "/grant-revoke-access/:recId",
      this.authvalidation.validateAuth,
      this.patientController.grantAndRevokeAccess
    );

    this.router.get(
      "/get-my-record",
      this.authvalidation.validateAuth,
      this.patientController.myRecord
    );

    this.router.get(
      "/view-my-record/:recId",
      this.authvalidation.validateAuth,
      this.patientController.viewRecord
    );

    /**
     * RECORD ROUTES  ENDS
     *
     */
    /**
     * CONSULTATION ROUTES
     *
     */
    this.router.get(
      "/get-doctor-list",
      this.authvalidation.validateAuth,
      this.patientController.getDoctorList
    );

    this.router.get(
      "/view-doctor/:docId",
      this.authvalidation.validateAuth,
      this.patientController.viewDoctor
    );

    this.router.post(
      "/create-consultation",
      this.authvalidation.validateAuth,
      this.patientController.createConsultation
    );

    this.router.get(
      "/get-my-consultation",
      this.authvalidation.validateAuth,
      this.patientController.myConsultation
    );
    this.router.get(
      "/view-consultation/:consId",
      this.authvalidation.validateAuth,
      this.patientController.viewConsultation
    );

    this.router.get(
      "/start-consultation/:consId",
      this.authvalidation.validateAuth,
      this.patientController.startConsultation
    );
    this.router.get(
      "/release-payment-consultation/:consId",
      this.authvalidation.validateAuth,
      this.patientController.releasePaymentConsultation
    );

    /**
     * CONSULTATION ROUTES  END
     *
     */

    api.use("/patient", this.router);
  }
}
