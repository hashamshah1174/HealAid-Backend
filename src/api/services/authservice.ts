import { Request } from "express";
import * as bcrypt from "bcrypt";
import {
  JWT_REFRSH_SECRET_EXPIRE_IN,
  JWT_SECRET_EXPIRE_IN,
  JWT_SECRET_KEY,
} from "../../config/environment";
import { ResponseHelper } from "../helpers/responseapihelper";
import { TokenHelper } from "../helpers/tokenkeyhelper";
import { TokenKey } from "../models/MToken";
import { ERole } from "../interfaces/enums/EUserRole";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/MUser";

class AuthService {
  //for authentication
  async login(req: Request): Promise<ApiResponse> {
    try {
    const role=req.body.role as ERole;
      const userResponse: IUser | null = await User.findOne({
        role: role,
        userName: req.body.userName,
      });
      if (userResponse === null) {
        return ResponseHelper.sendResponse(401);
      }
      const comparePassword = await bcrypt.compare(
        req.body.password,
        userResponse.password!
      );
      if (comparePassword) {
        let tokenResponse: JwtToken = await TokenHelper.generateToken(
          userResponse._id!,
          role
        );
        return ResponseHelper.sendSignTokenResponse(
          200,
          "loggedIn Successfully",
          userResponse,
          tokenResponse
        );
      }
      return ResponseHelper.sendResponse(401);
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async getAccessToken(req: Request, role: ERole): Promise<ApiResponse> {
    try {
      const refreshExists = await TokenKey.findOne({
        refreshToken: req.body.refreshToken,
      }).exec();
      const tokendata = await TokenHelper.validateRefereshToken(
        req.body.refreshToken,
        role
      );

      if (tokendata === null || !refreshExists) {
        return ResponseHelper.sendResponse(403);
      }
      const newAccessToken = TokenHelper.generateJwtToken(
        tokendata.userId,
        role,
        JWT_SECRET_KEY!,
        JWT_SECRET_EXPIRE_IN!
      );
      const tokenResponse: JwtToken = {
        accessToken: newAccessToken,
        refreshToken: req.body.refreshToken,
      };
      await TokenKey.updateMany(
        { userId: tokendata.userId },
        {
          token: newAccessToken,
        }
      ).exec();
      return ResponseHelper.sendSignTokenResponse(
        200,
        "Token Regenerated Successfully",
        undefined,
        tokenResponse
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async logout(req: Request, role: ERole): Promise<ApiResponse> {
    try {
      const refreshExists = await TokenKey.findOne({
        refreshToken: req.body.refreshToken,
      }).exec();
      const tokendata = await TokenHelper.validateRefereshToken(
        req.body.refreshToken,
        role
      );
      if (tokendata === null || !refreshExists) {
        return ResponseHelper.sendResponse(403);
      }
      await TokenKey.deleteMany({
        userId: refreshExists.userId,
        role: role,
      }).exec();
      return ResponseHelper.sendSuccessResponse("Logout Successfully");
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }



}

export default new AuthService();
