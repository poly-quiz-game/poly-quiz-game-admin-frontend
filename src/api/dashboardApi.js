import axiosClient, { authHeader } from "./axiosClient";

const path = "/dashboard";

const dashboardApi = {
  getAll({start, end}) {
    const url = `${path}?start=${start}&end=${end}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  }
};

export default dashboardApi;
