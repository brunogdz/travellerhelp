import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.56.1:8082/'
})

export default api;