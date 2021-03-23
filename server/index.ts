import "reflect-metadata";
import { createConnection } from "typeorm";
import { Content } from "./entity/Content";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { AppRouter } from "./routes";
import Bundler from "parcel-bundler";
import { join } from "path";

const publicDirectory = join(process.cwd(), "dist", "public");

function setupBundler() {
  const bundler = new Bundler(
    join(process.cwd(), "client", "src", "index.html"),
    {
      outDir: publicDirectory,
    }
  );
  bundler.bundle().then(() => {
    setupExpressServer();
  });
}

function setupExpressServer() {
  const port: Number = Number(process.env.PORT) || 1234;

  const app = express();
  app.use(bodyParser.json());
  app.use(express.static(publicDirectory));
  app.use("/api", AppRouter);
  app.use((_, res) => {
    res.sendFile(join(publicDirectory, "index.html"));
  });

  app.listen(port, () => console.log(`Server running at port ${port}`));
}

createConnection({
  type: "sqlite",
  database: "./sample.sql",
  synchronize: true,
  entities: [Content],
  logging: false,
})
  .then((connection) => {
    setupBundler();
  })
  .catch((error) => {
    debugger;
    console.log(error);
  });
