import axios from "axios";

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
})

// Interceptor de petición
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// Interceptor de respuesta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
)

export default api