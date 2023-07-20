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
import mongoose from "mongoose";

class AuthService {
  //for authentication

  async login(req: Request): Promise<ApiResponse> {
    try {
      const role = req.body.role as ERole;
      const userResponse: IUser | null = await User.findOne({
        role: role,
        email: req.body.email,
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

  async patientLogin(req: Request): Promise<ApiResponse> {
    try {
      const role = ERole.user;
      const userResponse: IUser | null = await User.findOne({
        role: role,
        email: req.body.email,
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
  async doctorLogin(req: Request): Promise<ApiResponse> {
    try {
      const role = ERole.doctor;
      const userResponse: IUser | null = await User.findOne({
        role: role,
        email: req.body.email,
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

  async patientRegister(req: Request): Promise<ApiResponse> {
    try {
      const role = ERole.user;
      const userResponse: IUser | null = await User.findOne({
        role: role,
        email: req.body.email,
      });
      if (userResponse) {
        return ResponseHelper.sendResponse(409);
      }
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const userData: IUser = new User({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        role: ERole.user,
        password: password,
      });
      await userData.save();
      let tokenResponse: JwtToken = await TokenHelper.generateToken(
        userData._id!,
        role
      );
      return ResponseHelper.sendSignTokenResponse(
        201,
        "Registered Successfully",
        userData,
        tokenResponse
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async doctorRegister(req: Request): Promise<ApiResponse> {
    try {
      const role = ERole.doctor;
      const userResponse: IUser | null = await User.findOne({
        role: role,
        email: req.body.email,
      });
      if (userResponse) {
        return ResponseHelper.sendResponse(409);
      }
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const userData: IUser = new User({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        role: ERole.doctor,
        password: password,
      });
      await userData.save();
      let tokenResponse: JwtToken = await TokenHelper.generateToken(
        userData._id!,
        role
      );
      return ResponseHelper.sendSignTokenResponse(
        201,
        "Registered Successfully",
        userData,
        tokenResponse
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async logout(
    userId: string,
    req: Request,
    role: ERole
  ): Promise<ApiResponse> {
    try {
      const refreshExists = await TokenKey.findOne({
        userId: userId,
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
