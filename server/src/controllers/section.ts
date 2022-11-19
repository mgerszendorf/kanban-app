import { Request, Response } from "express";
import Section from "../models/section";
import Task from "../models/task";

//POST /dashboards/:dashboardId/sections
export const create = async (req: Request, res: Response) => {
  const { dashboardId } = req.params;
  try {
    const section = await Section.create({ dashboard: dashboardId });
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json(err);
  }
};

//PUT /dashboards/:dashboardId/sections/:sectionId
export const updateSection = async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  try {
    const section = await Section.findByIdAndUpdate(sectionId, {
      $set: req.body,
    });
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE /dashboards/:dashboardId/sections/:sectionId
export const deleteSection = async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  try {
    await Task.deleteMany({ section: sectionId });
    await Section.deleteOne({ _id: sectionId });
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
