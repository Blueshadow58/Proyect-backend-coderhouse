import express, { Express, Request, Response } from "express";
import { authValidation } from "../middlewares/authLogin.js";
import { productsDao as productsApi } from "../daos/index.js";
export const productsRouter = express.Router();

//PRODUCTS-ROUTES
productsRouter.get("/", async (req: Request, res: Response) => {
  const products = await productsApi.getAll();
  res.json(products);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  res.json(await productsApi.getById(req.params.id));
});

productsRouter.post(
  "/",
  authValidation,
  async (req: Request, res: Response) => {
    res.json(await productsApi.save(req.body));
  }
);

productsRouter.put(
  "/:id",
  authValidation,
  async (req: Request, res: Response) => {
    res.json(await productsApi.update(req.body));
  }
);

productsRouter.delete(
  "/:id",
  authValidation,
  async (req: Request, res: Response) => {
    res.json(await productsApi.deleteById(req.params.id));
  }
);
