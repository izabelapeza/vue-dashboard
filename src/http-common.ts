import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://datausa.io/api/data",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
