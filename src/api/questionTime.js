import axiosClient from "./axiosClient";

const questionTimeApi = {
  getAll() {
    const url = "/questionTime";
    return axiosClient.get(url, {});
  },
  update({ id, ...data }) {
    const url = "/questionTime/" + id;
    return axiosClient.put(url, data);
  },
};

export default questionTimeApi;
