import { createServer, Server } from "http";
import app from "./app";
import config from "./config/index";
import sequelize from "./config/sequelize-config";
import { errorlogger, logger } from "./shared/logger";

let server: Server;

async function main() {
  try {
    await sequelize.sync();
    server = createServer(app);

    server.listen(config.port, () => {
      logger.info(`Lc listen on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error(`Failed to connect database`, error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGABRT", () => {
  console.log("SIGTERM is Received");
  if (server) {
    server.close();
  }
});
