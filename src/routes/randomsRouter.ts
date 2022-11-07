import express, { Express, Request, Response } from "express";
import { server } from "../main";
export const randomsRouter = express.Router();

import { fork } from "child_process";

randomsRouter.get("/", async (req: Request, res: Response) => {
  let cant: any = req.query.cant || 100000000;
  const randomArray: Array<number> = [];

  const compute = fork("./src/routes/child.js");
  compute.send({ randomArray: randomArray, cant: cant });
  // compute.send({ time: Date.now() });

  compute.on("message", (result: any) => {
    res.json(result);
  });
});
