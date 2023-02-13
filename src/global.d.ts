

declare namespace Express {
  export interface Request {
    locals: {
      auth?: string | object | import("./api/interfaces/IToken").IToken;
  
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
