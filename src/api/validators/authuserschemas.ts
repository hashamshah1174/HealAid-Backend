import * as yup from "yup";
import { ERole } from "../interfaces/enums/EUserRole";


const getAccessTokenRule = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      refreshToken: yup.string().required(),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

const loginRule = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      email: yup.string().required(),
      password: yup.string().min(3).required(),
      role:yup.string().required().oneOf(Object.values(ERole))
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

export = {
  "/get/accesstoken": getAccessTokenRule,
  "/logout": getAccessTokenRule,
  "/login": loginRule, //for admin authentication
};
