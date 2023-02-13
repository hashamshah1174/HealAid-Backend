
import * as express from "express";
import { AuthRoute } from "./auth/authroutes";


export class Routes {
  public router: express.Router = express.Router();
  protected authRoute: AuthRoute =new AuthRoute();
  constructor(api: express.Application) {
   
    this.routerSetup(api);
  }
  private routeMiddleware(api: express.Application): void {
    this.routerSetup(api)//register middleware here
  }

  private routerSetup(api: express.Application): void {
    this.authRoute.routes(api);
  }
}
