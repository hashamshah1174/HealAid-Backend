import mongoose from "mongoose";
import {
  APP_MODE,
  MANGO_ATLAS_CLUSTER,
  MANGO_ATLAS_DB,
  MANGO_ATLAS_PWD,
  MANGO_ATLAS_USER,
  MANGO_UNIQUE_NAME,
} from "./environment";

export class Database {
  constructor() {
    this.connectDb();
  }

  private connectDb(): void {
    let mangoUrl =
      "mongodb+srv://" +
      MANGO_ATLAS_USER! +
      ":" +
      MANGO_ATLAS_PWD! +
      "@" +
      MANGO_ATLAS_CLUSTER! +
      "." +
      MANGO_UNIQUE_NAME! +
      ".mongodb.net/" +
      MANGO_ATLAS_DB! +
      "?retryWrites=true&w=majority";

    console.log(mangoUrl);
    mongoose
      .connect(mangoUrl, {})
      .then((res) => {
        console.log("connection established at ", mangoUrl);
      })
      .catch((err) => {
        console.log(err);
      });
    mongoose.Promise = global.Promise;
  }
}
