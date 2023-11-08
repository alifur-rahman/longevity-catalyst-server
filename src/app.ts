import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import httpStatus from "http-status";

import bodyParser from "body-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routers from "./app/routes";
import sequelize from "./config/sequelize-config";
import { errorlogger, logger } from "./shared/logger";
const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(cookieParser());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.set("mysqlConnection", null);

// Application routes
app.use("/api/v1", routers);

app.use(globalErrorHandler);

sequelize
  .authenticate()
  .then(() => {
    logger.info(`🛢 Database is connected successfull`);
  })
  .catch((error) => {
    errorlogger.error("Sequelize failed to connect to the database:", error);
  });

// Handle Not Found
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Resource not found",
    error: {
      path: req.originalUrl,
      message: "The requested API route does not exist.",
    },
  });
});

export default app;
