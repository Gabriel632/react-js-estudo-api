import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:4431'
});

export default api;