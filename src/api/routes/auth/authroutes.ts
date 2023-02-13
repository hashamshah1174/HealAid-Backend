import * as express from "express";
import { AuthController } from "../../controllers/authcontroller";
import { AuthValidation } from "../../middlewares/authvalidation";
import { Validation } from "../../middlewares/validation";

export class AuthRoute {
  protected router: express.Router;
  protected authvalidation: AuthValidation;
  protected authcontroller: AuthController;
  protected validate: Validation;

  protected validateRequest;
  constructor() {
    this.router = express.Router();
    this.authcontroller = new AuthController();
    this.validate = new Validation();
    this.authvalidation = new AuthValidation();
    this.validateRequest = this.validate.reporter(true, "authuser");
  }
  public routes(api: express.Application): void {
    this.router.post("/login", this.validateRequest, this.authcontroller.login);
    this.router.post(
      "/get/accesstoken",
      this.validateRequest,
      this.authcontroller.getAccessToken
    );

    this.router.post(
      "/logout",
      this.authvalidation.validateAuth,
      this.validateRequest,
      this.authcontroller.logout
    );

    api.use("/auth", this.router);
  }
}
