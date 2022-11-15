import axiosClient from "./axiosClient";
import {
  IDashboard,
  IDashboardRequest,
  IDashboardResponse,
} from "../types/IDashboards";

const dashboardApi = {
  create: () => axiosClient.post<IDashboardRequest, IDashboard>("dashboards"),
  getAll: () => axiosClient.get<IDashboardRequest, IDashboard>("dashboards"),
  updatePosition: (params: any) =>
    axiosClient.put<IDashboardRequest, string>("dashboards", params),
  getOne: (id: string | undefined) =>
    axiosClient.get<IDashboardRequest, IDashboardResponse>(`dashboards/${id}`),
  update: (id: string | undefined, params: any) =>
    axiosClient.put<IDashboardRequest, IDashboard>(`dashboards/${id}`, params),
  getFavourites: () =>
    axiosClient.get<IDashboardRequest, IDashboard>("dashboards/favourites"),
  delete: (id: string | undefined) =>
    axiosClient.delete<IDashboardRequest, string>(`dashboards/${id}`),
  updateFavouritePosition: (params: any) =>
    axiosClient.put<IDashboardRequest, string>("dashboards/favourites", params),
};

export default dashboardApi;
