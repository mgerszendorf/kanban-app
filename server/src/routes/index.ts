import express from "express";
import { dashboard } from "./dashboard";
import { section } from "./section";
import { task } from "./task";

export const routes = express.Router();

routes.use("/dashboards", dashboard);
routes.use("/dashboards/:dashboardId/sections", section);
routes.use("/dashboards/:dashboardId/tasks", task);
