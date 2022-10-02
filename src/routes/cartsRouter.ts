import express, { Express, Request, Response } from "express";
import { cartsDao as cartsApi } from "../daos/index.js";
import { productsDao as productsApi } from "../daos/index.js";
export const cartsRouter = express.Router();

//CART-ROUTES
cartsRouter.get("/", async (req: Request, res: Response) => {
  res.json((await cartsApi.getAll()).map((c: { id: number }) => c.id));
});

cartsRouter.post("/", async (req: Request, res: Response) => {
  res.json(await cartsApi.save());
});

cartsRouter.delete("/:id", async (req: Request, res: Response) => {
  res.json(await cartsApi.deleteById(req.params.id));
});

// PRODUCTS-IN-CARTS

cartsRouter.get("/:id/productos", async (req, res) => {
  const cart = await cartsApi.getById(req.params.id);

  res.json(cart.productos);
});

cartsRouter.post("/:id/productos", async (req, res) => {
  const cart = await cartsApi.getById(req.params.id);
  const product = await productsApi.getById(req.body.id);
  cart.productos.push(product);
  await cartsApi.update(cart);
  res.end();
});

cartsRouter.delete("/:id/productos/:idProd", async (req, res) => {
  const cart = await cartsApi.getById(req.params.id);
  const index = cart.productos.findIndex(
    (p: { id: string }) => p.id == req.params.idProd
  );
  if (index != -1) {
    cart.productos.splice(index, 1);
    await cartsApi.update(cart);
  }
  res.end();
});
