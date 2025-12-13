import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_server,
  withCredentials: true,
});

const useSecure = () => {
  return axiosInstance;
};

export default useSecure;
