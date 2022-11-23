import { Request, Response } from "express";
import Dashboard from "../models/dashboard";
import Section from "../models/section";
import Task from "../models/task";

//CREATE /dashboards
export const createDashboard = async (req: Request, res: Response) => {
  try {
    const { email, uid } = req?.user;
    const dashboardsCount = await Dashboard.find().count();
    const dashboard = await Dashboard.create({
      user: {
        email: email,
        uid: uid,
      },
      position: dashboardsCount > 0 ? dashboardsCount : 0,
    });
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET /dashboards
export const getAllDashboard = async (req: Request, res: Response) => {
  const { email, uid } = req.user;
  try {
    const dashboards = await Dashboard.find({
      user: {
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
export const updatePosition = async (req: Request, res: Response) => {
  const { dashboards } = req.body;
  try {
    for (const key in dashboards) {
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
export const getOne = async (req: Request, res: Response) => {
  const { dashboardId } = req.params;
  const { email, uid } = req.user;
  try {
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      user: {
        email: email,
        uid: uid,
      },
    });
    if (!dashboard) return res.status(404).json("Dashboard was not found");
    const sections = await Section.find({ dashboard: dashboardId });
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id })
        .populate("section")
        .sort("-position");
      section._doc.tasks = tasks;
    }
    dashboard._doc.sections = sections;
    res.status(200).json({ dashboard, sections });
  } catch (err) {
    res.status(500).json(err);
  }
};

//PUT /dashboards/:dashboardId
export const updateDashboard = async (req: Request, res: Response) => {
  const { dashboardId } = req.params;
  let { title, description, favourite } = req.body;

  try {
    if (title === "") title = "Untitled";
    if (description === "") description = "You can add a description here";
    const currentDashboard = await Dashboard.findById(dashboardId);
    if (!currentDashboard)
      return res.status(404).json("Dashboard was not found");

    if (favourite !== undefined && currentDashboard.favourite !== favourite) {
      const favourites = await Dashboard.find({
        user: currentDashboard.user,
        favourite: true,
        _id: { $ne: dashboardId },
      }).sort("favouritePosition");
      if (favourite) {
        req.body.favouritePosition =
          favourites.length > 0 ? favourites.length : 0;
      } else {
        for (const key in favourites) {
          const element = favourites[key];
          await Dashboard.findByIdAndUpdate(element.id, {
            $set: { favouritePosition: key },
          });
        }
      }
    }

    const dashboard = await Dashboard.findByIdAndUpdate(dashboardId, {
      $set: req.body,
    });
    res.status(200).json(dashboard);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET /dashboards/favourites
export const getFavourites = async (req: Request, res: Response) => {
  const { email, uid } = req?.user;
  try {
    const favourites = await Dashboard.find({
      user: {
        email: email,
        uid: uid,
      },
      favourite: true,
    }).sort("favouritePosition");
    res.status(200).json(favourites);
  } catch (err) {
    res.status(500).json(err);
  }
};

//PUT /dashboards/favourites
export const updateFavouritePosition = async (req: Request, res: Response) => {
  const { dashboards } = req.body;
  try {
    for (const key in dashboards) {
      const dashboard = dashboards[key];
      await Dashboard.findByIdAndUpdate(dashboard.id, {
        $set: { favouritePosition: key },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE /dashboards/:dashboardId
export const deleteDashboard = async (req: Request, res: Response) => {
  const { dashboardId } = req.params;
  try {
    const sections = await Section.find({ dashboard: dashboardId });
    for (const section of sections) {
      await Task.deleteMany({ section: section.id });
    }
    await Section.deleteMany({ dashboard: dashboardId });

    const currentDashboard = await Dashboard.findById(dashboardId);

    if (currentDashboard.favourite) {
      const favourites = await Dashboard.find({
        user: currentDashboard.user,
        favourite: true,
        _id: { $ne: dashboardId },
      }).sort("favouritePosition");

      for (const key in favourites) {
        const element = favourites[key];
        await Dashboard.findByIdAndUpdate(element.id, {
          $set: { favouritePosition: key },
        });
      }
    }

    await Dashboard.deleteOne({ _id: dashboardId });

    const dashboards = await Dashboard.find().sort("position");
    for (const key in dashboards) {
      const dashboard = dashboards[key];
      await Dashboard.findByIdAndUpdate(dashboard.id, {
        $set: { position: key },
      });
    }

    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
