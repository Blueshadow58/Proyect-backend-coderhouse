import express, { Express, json, Request, Response } from "express";

import { page404 } from "./middlewares/page404.js";
const app: Express = express();

if (process.env.NODE_ENV !== "production") {
  await import("dotenv").then((d) => d.config());
}

const port = process.env.PORT;

import { productsRouter } from "./routes/productsRouter.js";
import { cartsRouter } from "./routes/cartsRouter.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);
app.use(page404);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
server.on("error", (error) => console.log(`Error in server ${error}`));
