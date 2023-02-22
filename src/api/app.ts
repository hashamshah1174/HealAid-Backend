import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import cors from "cors";
import morgan from "morgan";
import { Database } from "../config/database";

class Api {
  public api: express.Application;
  public app: express.Application;
  public routes: Routes;
  public database: Database;

  constructor() {
    this.app = express();
    this.api = express();
    this.database = new Database();
    this.config();
    this.routes = new Routes(this.app);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.api.use(bodyParser.json());
    this.api.use(bodyParser.urlencoded({ extended: false }));
    this.api.use("/api/v1", this.app);
  }
}
export const apis = new Api().api;
