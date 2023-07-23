import * as jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";
import {
  JWT_REFRESH_SECRET_KEY,
  JWT_REFRSH_SECRET_EXPIRE_IN,
  JWT_SECRET_EXPIRE_IN,
  JWT_SECRET_KEY,
} from "../../config/environment";
import { ERole } from "../interfaces/enums/EUserRole";
import { IToken } from "../interfaces/IToken";
import { TokenKey } from "../models/MToken";

class TokenKeyHelper {
  async generateToken(
    userId: mongoose.Types.ObjectId,
    role: ERole
  ): Promise<JwtToken> {
    const accessToken = this.generateJwtToken(
      userId,
      role,
      JWT_SECRET_KEY!,
      JWT_SECRET_EXPIRE_IN!
    );
    const refreshToken = this.generateJwtToken(
      userId,
      role,
      JWT_REFRESH_SECRET_KEY!,
      JWT_REFRSH_SECRET_EXPIRE_IN!
    );

    const newToken: IToken = new TokenKey({
      _id: new mongoose.Types.ObjectId(),
      userId: userId,
      role: role,
      token: accessToken,
      refreshToken: refreshToken,
    });
    await newToken.save();
    const JwtResponse: JwtToken = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return JwtResponse;
  }
  async validateRefereshToken(
    refreshToken: string,
    role: ERole
  ): Promise<jwt.JwtPayload | null> {
    const tokenExist = await TokenKey.findOne({
      refreshToken: refreshToken,
      role: role,
    });
    if (tokenExist) {
      const existJwt = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY!);
      if (typeof existJwt !== "string") {
        return existJwt;
      }
      return null;
    }
    return null;
  }
  generateJwtToken(
    userId: mongoose.Types.ObjectId,
    role: ERole,
    jwtKey: string,
    jwtExpire: string
  ): string {
    const payload = {
      userId: userId,
      role: role,
    };
    const token = jwt.sign(payload, jwtKey!, {
      expiresIn: jwtExpire,
    });
    return token;
  }
}

export const TokenHelper = new TokenKeyHelper();
