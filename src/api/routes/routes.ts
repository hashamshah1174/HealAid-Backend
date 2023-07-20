import * as express from "express";

import { GeneralRoute } from "./RGeneral";
import { AdminRoute } from "./RAdmin";
import { PatientRoute } from "./RPatient";
import { DoctorRoute } from "./RDoctor";

export class Routes {
  public router: express.Router = express.Router();
  protected adminRoute: AdminRoute = new AdminRoute();
  protected patientRoute: PatientRoute = new PatientRoute();
  protected dcotorRoute: DoctorRoute = new DoctorRoute();
  protected generalRoute: GeneralRoute = new GeneralRoute();
  constructor(api: express.Application) {
    this.routerSetup(api);
  }
  private routeMiddleware(api: express.Application): void {
    this.routerSetup(api); //register middleware here
  }

  private routerSetup(api: express.Application): void {
    this.generalRoute.routes(api);
    this.adminRoute.routes(api);
    this.patientRoute.routes(api);
    this.dcotorRoute.routes(api);
  }
}
