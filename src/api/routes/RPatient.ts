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
      "/get-my-doc",
      this.authvalidation.validateAuth,
      this.patientController.myRecord
    );

    this.router.get(
      "/view-my-doc/:recId",
      this.authvalidation.validateAuth,
      this.patientController.viewRecord
    );

    /**
     * RECORD ROUTES  ENDS
     *
     */

    api.use("/patient", this.router);
  }
}
