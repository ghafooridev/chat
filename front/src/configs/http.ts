import axios from "axios";
import { AxiosResponse } from "axios";
import { BASE_URL } from "src/helpers/constants";

export const Axios = axios.create({
    baseURL: `${BASE_URL}/api/`,
    withCredentials: true
});

export type { AxiosResponse };