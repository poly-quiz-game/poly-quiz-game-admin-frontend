import axiosClient from "./axiosClient";

const userApi = {
  getAll({ offset, limit, search }) {
    const url = `/user?offset=${offset}&limit=${limit}&search=${search}`;
    return axiosClient.get(url, {});
  },
  getOne(id) {
    const url = "/user/" + id;
    return axiosClient.get(url);
  },
  add(user) {
    const url = "/user";
    return axiosClient.post(url, user)
  },
  update(user) {
    const url = "/user/" + user._id;
    return axiosClient.put(url, user);
  },
  delete(id) {
    const url = "/user/" + id;
    return axiosClient.delete(url);
  },
};

export default userApi;
