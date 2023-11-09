import axios from "axios";
import URL from "../../URL.js";

axios.defaults.baseURL = URL.base;
const axiosInstance = axios.create();

export default axiosInstance;
