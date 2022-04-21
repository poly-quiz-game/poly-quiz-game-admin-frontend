import axios from "axios";
// const baseURL = process.env.ENDPOINT;
// const baseURL = "http://165.22.53.167:3005/api";
const baseURL = "https://poly-quiz-backend.azurewebsites.net/api";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { status } = error.toJSON();
    if (status === 401) {
      // return console.log("401");
      return (window.location.href = "/auth/login");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
