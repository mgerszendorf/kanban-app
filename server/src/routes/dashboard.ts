import { Router } from "express";
import { param } from "express-validator";
import { verifyToken } from "../middleware/verifyToken";
import {
  createDashboard,
  getAllDashboard,
  getOne,
  updatePosition,
} from "../controllers/dashboard";
import { validate, isObjectId } from "../middleware/validation";

export const dashboard = Router();

dashboard.post("/", verifyToken, createDashboard);
dashboard.get("/", verifyToken, getAllDashboard);
dashboard.put("/", verifyToken, updatePosition);
dashboard.get(
  "/:dashboardId",
  param("dashboardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  getOne
);
