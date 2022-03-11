import axiosClient from "./axiosClient";

const questionTypeApi = {
  getAll() {
    const url = "/questionType";
    return axiosClient.get(url, {});
  },
  update(data) {
    const url = "/questionType/" + data.id;
    return axiosClient.put(url, data);
  },
};

export default questionTypeApi;
