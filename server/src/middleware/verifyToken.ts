const admin = require("../config/firebase-config");
import { Request, Response, NextFunction } from "express";

export const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
    return res.json({ message: "Un authorize", data: [] });
  } catch (e) {
    return res.json({ message: "Internal Error", data: [] });
  }
};
