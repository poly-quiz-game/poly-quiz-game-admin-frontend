import axiosClient, { authHeader } from "./axiosClient";

const path = "/user";

const userApi = {
  getAll({
    offset = 0,
    limit = 10,
    search = "",
    sortField = "",
    sortDirection = "desc",
  }) {
    const url = `${path}?offset=${offset}&limit=${limit}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  getOne(id) {
    const url = `${path}/${id}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  getReportQuizzes(id) {
    const url = `${path}/list-report-quiz/${id}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  getReportDetail(id) {
    const url = `${path}/detail-report-quiz/${id}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  add(user) {
    const url = "/user";
    return axiosClient.post(url, user, {
      headers: authHeader(),
    });
  },
  update(user) {
    const url = `${path}/${user.id}`;
    return axiosClient.put(url, user, {
      headers: authHeader(),
    });
  },
  delete(id) {
    const url = `${path}/${id}`;
    return axiosClient.delete(url, {
      headers: authHeader(),
    });
  },
};

export default userApi;
