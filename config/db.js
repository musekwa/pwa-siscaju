process.env.NODE_ENV = "dev";
import mongoose from "mongoose";
import config from "./config.js";
import Mockgoose from "mockgoose";

export default {
  connect: async () => {
    if (process.env.NODE_ENV === "test") {
      // let mockgoose = new Mockgoose.Mockgoose(mongoose);
      // mockgoose.prepareStorage().then(function () {
      //   mongoose
      //     .connect(config.mongoURI, {
      //       useNewUrlParser: true,
      //       useUnifiedTopology: true,
      //     })
      //     .then((res) => {
      //       console.log("Mockgoose is connected for testing");
      //     })
      //     .catch((err) => console.log(err));
      // }).catch((err)=>console.log(err));
    } else {
      return await mongoose
        .connect(config.mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((res) => {
          console.log("MongoDB is connected successfully!");
        })
        .catch((err) => console.log(err));
    }
  },

  close: () => mongoose.disconnect(),
};
