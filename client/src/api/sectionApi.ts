import axiosClient from "./axiosClient";
import { ISectionRequest, ISection } from "../types/ISections";

const sectionApi = {
  create: (dashboardId: string) =>
    axiosClient.post<ISectionRequest, ISection>(
      `dashboards/${dashboardId}/sections`
    ),
  update: (dashboardId: string, sectionId: string, params: any) =>
    axiosClient.put<ISectionRequest, ISection>(
      `dashboards/${dashboardId}/sections/${sectionId}`,
      params
    ),
  delete: (dashboardId: string, sectionId: string) =>
    axiosClient.delete<ISectionRequest, string>(
      `dashboards/${dashboardId}/sections/${sectionId}`
    ),
};

export default sectionApi;
