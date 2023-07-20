import * as yup from "yup";
import { ERole } from "../interfaces/enums/EUserRole";
import { isObjectIdOrHexString } from "mongoose";

const loginIndexRule = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      email: yup.string().required(),
      password: yup.string().min(3).required(),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

const patientRegisterRule = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      fullName: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().min(3).required(),
      contact: yup.string().required(),
      metaMaskAddress: yup.string().required(),
      privateKey: yup.string().required(),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

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

export = {
  "/login": loginIndexRule, //for admin authentication
  register: patientRegisterRule,
  "/get/accesstoken": getAccessTokenRule,
  "/logout": getAccessTokenRule,
};
