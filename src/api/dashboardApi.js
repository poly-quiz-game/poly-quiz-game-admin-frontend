import axiosClient, { authHeader } from "./axiosClient";

const path = "/dashboard";

const dashboardApi = {
  getAll() {
    const url = `${path}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  }
};

export default dashboardApi;
