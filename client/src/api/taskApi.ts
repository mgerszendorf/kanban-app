import axiosClient from "./axiosClient";
import { ITaskRequest, ITask } from "../types/ITasks";

const taskApi = {
  createTask: (dashboardId: string, params: any) =>
    axiosClient.post<ITaskRequest, { task: ITask }>(
      `dashboards/${dashboardId}/tasks`,
      params
    ),
  updateTaskPosition: (dashboardId: string, params: any) =>
    axiosClient.put<ITaskRequest, string>(
      `dashboards/${dashboardId}/tasks/update-position`,
      params
    ),
  deleteTask: (dashboardId: string, taskId: string) =>
    axiosClient.delete<ITaskRequest, string>(
      `dashboards/${dashboardId}/tasks/${taskId}`
    ),
  updateTask: (dashboardId: string, taskId: string, params: any) =>
    axiosClient.put<ITaskRequest, ITask>(
      `dashboards/${dashboardId}/tasks/${taskId}`,
      params
    ),
};

export default taskApi;
