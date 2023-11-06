import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import bodyParser from "body-parser";
import routers from "./app/routes";
import sequelize from "./config/sequelize-config";

const allowedOrigins = ["http://localhost:3000"];

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.set("mysqlConnection", null);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", allowedOrigins); // Update this with your specific origin
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Application routes
app.use("/api/v1", routers);

// app.use(globalErrorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log("Server Connected Success");
  })
  .catch((error) => {
    console.error("Sequelize failed to connect to the database:", error);
  });

// Handle Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
