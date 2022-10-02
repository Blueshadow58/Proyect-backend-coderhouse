import { Request, Response, NextFunction } from "express";

// admin permissions
const admin = true;

export const authValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (admin) {
    next();
  } else {
    const error = JSON.parse(
      `{"error":-1,"descripcion": "${req.originalUrl}","método": "${req.method} no autorizada"}`
    );
    res.send(error);
  }
};
