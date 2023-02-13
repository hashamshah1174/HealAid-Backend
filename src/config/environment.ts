import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(__dirname, "..", "..", ".env") });
export const {
  APP_MODE,
  APP_HOST,
  APP_PORT,
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  JWT_SECRET_EXPIRE_IN,
  JWT_REFRSH_SECRET_EXPIRE_IN,
  MANGO_ATLAS_PWD,
  MANGO_ATLAS_USER,
  MANGO_ATLAS_CLUSTER,
  MANGO_ATLAS_DB,
  MANGO_UNIQUE_NAME
} = process.env;
