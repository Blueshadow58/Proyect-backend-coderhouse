import express, { Express, Request, Response } from "express";
import { server } from "../main";
export const randomsRouter = express.Router();

import { fork } from "child_process";

randomsRouter.get("/", async (req: Request, res: Response) => {
  let cant: any = req.query.cant || 100000000;
  const randomArray: Array<number> = [];

  const compute = fork("./child.js");
  compute.send({ randomArray: randomArray, cant: cant });
  //   compute.send({ start: "start" });
  compute.on("message", (result: any) => {
    res.send(result);
  });
});
