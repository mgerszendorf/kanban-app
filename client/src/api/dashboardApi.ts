import axiosClient from "./axiosClient";

const dashboardApi = {
  create: () => axiosClient.post("dashboards"),
  getAll: () => axiosClient.get("dashboards"),
};

export default dashboardApi;
