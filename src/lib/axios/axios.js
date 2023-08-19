import axios from "axios";
import { baseURL } from "../../urls.js";

axios.defaults.baseURL = baseURL;
// 서버가 위치한 포트 번호를 기본 url로 설정.

const api = axios.create();

export default api;
