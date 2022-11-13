import { Router } from "express";
import { param } from "express-validator";
import { verifyToken } from "../middleware/verifyToken";
import { create, updateSection, deleteSection } from "../controllers/section";
import { validate, isObjectId } from "../middleware/validation";

export const section = Router({ mergeParams: true });

section.post(
  "/",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  create
);

section.put(
  "/:sectionId",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong section id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updateSection
);

section.delete(
  "/:sectionId",
  param("dashboardId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong dashboard id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value: string) => {
    if (!isObjectId(value)) {
      return Promise.reject("wrong section id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  deleteSection
);
