import axios from "axios";

const API_URL = 'http://localhost:8000';

export const loginService = async (data)=>{
    try {
        const formData = new URLSearchParams();
        formData.append("username", data.username)
        formData.append("password", data.password)

        const response = await axios.post(
            `${API_URL}/login`,
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
        return response.data;
    } catch (error) {
        console.log(error);
        const backendError = error.response?.data;

        throw {
            message: backendError?.error?.message || "Error al iniciar sesión"
        };
    }
}