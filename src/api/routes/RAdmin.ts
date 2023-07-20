import * as express from "express";
import { AuthValidation } from "../middlewares/authvalidation";
import { Validation } from "../middlewares/validation";
import { AdminController } from "../controllers/adminController";

export class AdminRoute {
  protected router: express.Router;
  protected authvalidation: AuthValidation;
  protected admincontroller: AdminController;
  protected validate: Validation;

  protected validateRequest;
  constructor() {
    this.router = express.Router();
    this.admincontroller = new AdminController();
    this.validate = new Validation();
    this.authvalidation = new AuthValidation();
    this.validateRequest = this.validate.reporter(true, "admin");
  }
  public routes(api: express.Application): void {
    this.router.post(
      "/login",
      this.validateRequest,
      this.admincontroller.login
    );
    this.router.post(
      "/get/accesstoken",
      this.validateRequest,
      this.admincontroller.getAccessToken
    );
    this.router.post(
      "/logout",
      this.authvalidation.validateAuth,
      this.validateRequest,
      this.admincontroller.logout
    );

    api.use("/admin", this.router);
  }
}
