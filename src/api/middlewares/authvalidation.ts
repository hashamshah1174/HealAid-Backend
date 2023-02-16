import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../helpers/responseapihelper";
import { JWT_SECRET_KEY } from "../../config/environment";
import { TokenKey } from "../models/MToken";

export class AuthValidation {
  validateAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers);
    if (!req.headers.authorization) {
      const response = ResponseHelper.sendResponse(400);
      return res.status(response.code).json(response);
    }
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      // verifies secret and checks exp
      return jwt.verify(token, JWT_SECRET_KEY!, async function (err, decoded) {
        const exists = await TokenKey.findOne({ token: token }).exec();
        if (err || !exists) {
          const response = ResponseHelper.sendResponse(401);
          return res.status(response.code).json(response);
        }

        req.locals = {
          auth: decoded,
        };

        return next();
      });
    }
  };
}
