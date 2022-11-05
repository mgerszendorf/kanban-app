import express from "express";
import { dashboard } from "./dashboard";

export const routes = express.Router();

routes.use("/dashboards", dashboard);
