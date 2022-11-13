import { Router } from "express";
import { param } from "express-validator";
import { verifyToken } from "../middleware/verifyToken";
import {
  createDashboard,
  getAllDashboard,
  getOne,
  updatePosition,
  updateDashboard,
  getFavourites,
  updateFavouritePosition,
  deleteDashboard,
} from "../controllers/dashboard";
import { validate, isObjectId } from "../middleware/validation";

export const dashboard = Router();

dashboard.post("/", verifyToken, createDashboard);
dashboard.get("/", verifyToken, getAllDashboard);
dashboard.put("/", verifyToken, updatePosition);
dashboard.get("/favourites", verifyToken, getFavourites);
dashboard.put("/favourites", verifyToken, updateFavouritePosition);
dashboard.get(
  "/:dashboardId",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  getOne
);
dashboard.put(
  "/:dashboardId",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updateDashboard
);
dashboard.delete(
  "/:dashboardId",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  deleteDashboard
);
