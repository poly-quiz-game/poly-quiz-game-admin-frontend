import axiosClient from "./axiosClient";

const questionTimeApi = {
  getAll() {
    const url = "/question-time";
    return axiosClient.get(url, {});
  },
  getOne(id) {
    const url = "/question-time/" + id;
    return axiosClient.get(url, {});
  },
  add(data) {
    const url = "/question-time";
    return axiosClient.post(url, data)
  },
  update(id) {
    const url = "/question-time/" + id;
    return axiosClient.put(url, {});
  },
  delete(id) {
    const url = "/question-time/" + id;
    return axiosClient.delete(url);
  },
};

export default questionTimeApi;
