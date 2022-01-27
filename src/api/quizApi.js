import axiosClient from "./axiosClient";

const quizApi = {
  getAll() {
    const url = "/quiz";
    return axiosClient.get(url, {});
  },
  getOne(id) {
    const url = "/quiz/" + id;
    return axiosClient.get(url, {});
  },
  update(id) {
    const url = "/quiz/" + id;
    return axiosClient.put(url, {});
  },
  delete(id) {
    const url = "/quiz/" + id;
    return axiosClient.delete(url);
  },
};

export default quizApi;
