import axiosClient from "./axiosClient";

const quizApi = {
  getOne(id) {
    const url = "/dashboard/detail-quiz" + id;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
};

export default quizApi;
