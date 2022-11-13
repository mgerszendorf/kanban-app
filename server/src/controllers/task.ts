import { Request, Response } from "express";
import Task from "../models/task";
import Section from "../models/section";

//POST /dashboards/:dashboardId/tasks
export const createTask = async (req: Request, res: Response) => {
  const { sectionId } = req.body;
  try {
    const section = await Section.find({ _id: sectionId });
    const tasksCount = await Task.find({ section: sectionId }).count();
    const task = await Task.create({
      section: sectionId,
      position: tasksCount > 0 ? tasksCount : 0,
    });
    res.status(201).json({ value: { section, task } });
  } catch (err) {
    res.status(500).json(err);
  }
};

//PUT /dashboards/:dashboardId/tasks/:taskId
export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(taskId, { $set: req.body });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE /dashboards/:dashboardId/tasks/:taskId
export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const currentTask = await Task.findById(taskId);
    await Task.deleteOne({ _id: taskId });
    const tasks = await Task.find({ section: currentTask.section }).sort(
      "postition"
    );
    for (const key in tasks) {
      await Task.findByIdAndUpdate(tasks[key].id, { $set: { position: key } });
    }
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//PUT /dashboards/:dashboardId/tasks/update-position
export const updateTaskPosition = async (req: Request, res: Response) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = req.body;
  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();
  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await Task.findByIdAndUpdate(resourceListReverse[key].id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        });
      }
    }
    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(destinationListReverse[key].id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
