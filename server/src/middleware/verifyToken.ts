import { admin } from "../config/firebase-config";
import { Request, Response, NextFunction } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
    return res.json({ message: "No authorization", data: [] });
  } catch (e) {
    return res.json({ message: "Internal error", data: [] });
  }
};
