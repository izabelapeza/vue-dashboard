import axios, { AxiosInstance } from "axios";
import useGlobalErrorDialog from "@/utils/useGlobalErrorDialog";
import useGlobalLoader from "@/utils/useGlobalLoader";

const { setGlobalErrorDialog } = useGlobalErrorDialog();
const { setGlobalLoader } = useGlobalLoader();

const api: AxiosInstance = axios.create({
  baseURL: "https://datausa.io/api/data",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  function (successfulReq) {
    setGlobalLoader(true);
    return successfulReq;
  },
  function (error) {
    setGlobalErrorDialog(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (successRes) {
    setGlobalLoader(false);
    return successRes;
  },
  function (error) {
    setGlobalErrorDialog(error);
    setGlobalLoader(false);
    return Promise.reject(error);
  }
);

export default api;
