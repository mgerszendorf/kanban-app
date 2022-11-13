import { Router } from "express";
import { body, param } from "express-validator";
import { verifyToken } from "../middleware/verifyToken";
import { validate, isObjectId } from "../middleware/validation";
import {
  createTask,
  updateTask,
  deleteTask,
  updateTaskPosition,
} from "../controllers/task";

export const task = Router({ mergeParams: true });

task.post(
  "/",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  body("sectionId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong section id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  createTask
);

task.put(
  "/update-position",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updateTaskPosition
);

task.delete(
  "/:taskId",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong task id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  deleteTask
);

task.put(
  "/:taskId",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong task id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updateTask
);
