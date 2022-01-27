import axiosClient from "./axiosClient";

const userApi = {
  getAll() {
    const url = "/user";
    return axiosClient.get(url, {});
  },
  getOne(id) {
    const url = "/user/" + id;
    return axiosClient.get(url, {});
  },
  add(user) {
    const url = "/user";
    return axiosClient.post(url, user)
  },
  update(id) {
    const url = "/user/" + id;
    return axiosClient.put(url, {});
  },
  delete(id) {
    const url = "/user/" + id;
    return axiosClient.delete(url);
  },
};

export default userApi;
