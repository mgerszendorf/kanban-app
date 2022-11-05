import { Request, Response } from "express";
import Dashboard from "../models/dashboard";
import Section from "../models/section";
import Task from "../models/task";

//CREATE /dashboards
export const createDashboard = async (req: any, res: any) => {
  try {
    const { name, email, uid } = req.user;
    const dashboardsCount = await Dashboard.find().count();
    const dashboard = await Dashboard.create({
      user: {
        displayName: name,
        email: email,
        uid: uid,
      },
      position: dashboardsCount > 0 ? dashboardsCount : 0,
    });
    console.log(res);
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET /dashboards
export const getAllDashboard = async (req: any, res: any) => {
  const { name, email, uid } = req.user;
  try {
    const dashboards = await Dashboard.find({
      user: {
        displayName: name,
        email: email,
        uid: uid,
      },
    }).sort("position");
    res.status(200).json(dashboards);
  } catch (error) {
    res.status(500).json(error);
  }
};

//PUT /dashboards
export const updatePosition = async (req: any, res: any) => {
  const { dashboards } = req.body;
  try {
    for (const key in dashboards.reverse()) {
      const dashboard = dashboards[key];
      await Dashboard.findByIdAndUpdate(dashboard.id, {
        $set: { position: key },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET /dashboards/:dashboardId
export const getOne = async (req: any, res: any) => {
  const { dashboardId } = req.params;
  try {
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      email: "marek.gerszendorf@wp.pl",
    });
    if (!dashboard) return res.status(404).json("Dashboard was not found");
    const sections = await Section.find({ dashboard: dashboardId });
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id })
        .populate("section")
        .sort("position");
    }
    res.status(200).json(dashboard);
  } catch (err) {
    res.status(500).json(err);
  }
};
