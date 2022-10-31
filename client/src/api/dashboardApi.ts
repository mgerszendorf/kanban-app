import axiosClient from "./axiosClient";
import { IDashboardResponse, IDashboardRequest } from "./types";

const dashboardApi = {
  create: () =>
    axiosClient.post<IDashboardRequest, IDashboardResponse>("dashboards"),
  getAll: () =>
    axiosClient.get<IDashboardRequest, IDashboardResponse>("dashboards"),
};

export default dashboardApi;
