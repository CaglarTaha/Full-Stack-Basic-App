// src/index.ts
import express from "express";
import { AppDataSource } from "./core/data-source";
import { setupSwagger } from "./core/swagger";
import cors from "cors";
import loggingMiddleware from "./middleware/logging.middleware";
import indexRoute from "./routes/index.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import config from "./core/config";

const app = express();
const PORT = config.app.port;
app.use(cors());
app.use(express.json());

// Initialize the data source and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Inserting a new user into the database...");
    setupSwagger(app);
    app.use(cors());
    app.use(loggingMiddleware);
    app.use("/", indexRoute);
    app.use(errorMiddleware);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
