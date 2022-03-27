import axiosClient, { authHeader } from "./axiosClient";

const quizApi = {
  getOne(id) {
    const url = "/dashboard/detail-quiz/" + id;
    return axiosClient.get(url);
  },
};

export default quizApi;
