import { Request, Response, NextFunction } from "express";

export const page404 = (req: Request, res: Response, next: NextFunction) => {
  // respond with json
  const error404 = JSON.parse(
    `{"error": -2,"descripcion":"${req.originalUrl}","metodo":"${req.method} no implementada"}`
  );
  res.send(error404);
};
