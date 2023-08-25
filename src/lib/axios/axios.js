import axios from "axios";
import { baseURL } from "../../urls.js";

axios.defaults.baseURL = baseURL;
const axiosInstance = axios.create();

export default axiosInstance;
