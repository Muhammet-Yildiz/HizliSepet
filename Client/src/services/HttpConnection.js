import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { NGROK_URL } from '@env'

const axiosInstance = axios.create({
    baseURL: `${NGROK_URL}` + "/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers['Authorization'] = `Bearer ${JSON.parse(await AsyncStorage.getItem("accessToken"))
            }`;
        return config;
    },
    error => {
        console.log("error", error)
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use((response) => {
    return response;

}, (error) => { 
    return Promise.reject(error.response);
});
export default axiosInstance;