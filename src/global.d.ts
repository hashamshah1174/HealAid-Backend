declare namespace Express {
  export interface Request {
    locals: {
      auth?: {
        userId: string;
        role: import("./api/interfaces/enums/EUserRole").ERole;
      };
    };
  }
}
interface ApiResponse {
  code: number;
  status: boolean;
  msg: string;
  data?: string | object;
  accessToken?: string;
  refreshToken?: string;
}

interface JwtToken {
  accessToken: string;
  refreshToken: string;
}

interface INumericEnumKeyValue {
  [key: string]: number;
}
