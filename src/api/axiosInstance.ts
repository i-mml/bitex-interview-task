import axios from "axios";
import { BASE_URL } from "../constants/apiConfigs";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
