import axios from "axios";
import { BASE_URL } from "../../URL.js";

axios.defaults.baseURL = BASE_URL;
const axiosInstance = axios.create();

export default axiosInstance;
