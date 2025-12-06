import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "").trim();
      const decoded = jwt.verify(
        token as string,
        config.jwtPrivateKey as string
      ) as JwtPayload;

      if (roles.length !== 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          status: false,
          message: "Access forbidden",
        });
      }
      req.user = decoded;
      next();
    } catch (err: any) {
      return res.status(401).json({
        status: false,
        message: err.message,
        errors: err,
      });
    }
  };
};

export default auth;
