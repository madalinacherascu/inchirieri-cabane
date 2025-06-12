import axios from "axios";
import type { AxiosInstance } from "axios";
import AppSettings from '../settings/appSettings'

const api: AxiosInstance = axios.create({
   baseURL: AppSettings.API_Url,
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
 });


export default {api};
