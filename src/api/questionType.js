import axiosClient from "./axiosClient";

const questionTypeApi = {
  getAll() {
    const url = "/question-type";
    return axiosClient.get(url, {});
  },
  update(data) {
    const url = "/question-type/" + data._id;
    return axiosClient.put(url, data);
  },
};

export default questionTypeApi;
