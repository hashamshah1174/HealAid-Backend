class ResponseApiHelper {
  sendSuccessResponse(msg: string, data?: string | object): ApiResponse {
    return { code: 200, status: true, msg: msg, data: data ?? data };
  }
  sendResponse(
    statusCode: number,
    data?: string | object,
    msg?: string
  ): ApiResponse {
    const resobj = {
      201: {
        code: 201,
        msg: msg || "Data Inserted Successfully",
        status: true,
        data: data,
      },
      400: {
        code: 400,
        msg: msg || "Bad Request",
        status: false,
      },
      401: {
        code: 401,
        msg: msg || "Unauthorized Access",
        status: false,
      },
      403: {
        code: 403,
        msg: msg || "forbidden Access",
        status: false,
      },
      404: {
        code: 404,
        msg: msg || "Data Not Found",
        status: false,
      },
      409: {
        code: 409,
        msg: msg || "Data Already Exists",
        status: false,
      },
      422: {
        code: 422,
        msg: "Validation Error",
        status: false,
        data: data,
      },
    };
    const code = statusCode as keyof typeof resobj;
    let result: ApiResponse | undefined = resobj[code];
    if (result == undefined) {
      result = {
        code: 500,
        msg: "Server Error",
        status: false,
        data: data,
      };
    }
    return result;
  }
  sendSignTokenResponse(
    statusCode: number,
    msg: string,
    data?: string | object | any,
    token?: JwtToken
  ): ApiResponse {
    return {
      code: statusCode,
      status: true,
      msg: msg,
      data: data ?? data,
      accessToken: token?.accessToken,
      refreshToken: token?.refreshToken,
    };
  }
}

export const ResponseHelper = new ResponseApiHelper();
