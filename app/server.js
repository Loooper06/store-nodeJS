const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const createError = require("http-errors");
const cors = require("cors");

const { AllRoutes } = require("./router/router");

module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.initRedis();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }

  configApplication() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJSDoc({
          swaggerDefinition: {
            info: {
              title: "Store Node JS",
              version: "2.0.0",
              description: "فروشگاه خوشگل",
            },
            servers: [{ url: "http://localhost:3030" }],
          },
          apis: ["./app/router/*/*.js"],
        })
      )
    );
  }

  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(`running on http://localhost:${this.#PORT}`);
    });
  }

  connectToMongoDB() {
    mongoose.connect(this.#DB_URI, (err) => {
      if (!err) return console.log(`MongoDB connected to 0.0.0.0`);
      return console.log(err.message);
    });

    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to Db");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("mongoose disconnected to Db");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");
      process.exit(0);
    });
  }

  initRedis() {
    require("./utils/init_redis");
  }

  createRoutes() {
    this.#app.use(AllRoutes);
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });

    this.#app.use((err, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = err.status || serverError.status;
      const message = err.message || serverError.message;

      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
