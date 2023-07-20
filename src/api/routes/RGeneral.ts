import * as express from "express";
import multer from "multer";
import { GeneralController } from "../controllers/generalController";

export class GeneralRoute {
  protected router: express.Router;
  protected generalController: GeneralController;
  protected upload: multer.Multer;
  constructor() {
    this.router = express.Router();
    this.generalController = new GeneralController();
  }
  public routes(api: express.Application): void {
    this.router.get("/skill/index", this.generalController.skillData);

    api.use("/general", this.router);
  }
}
