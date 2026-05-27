import axios from "axios";

const API_URL = 'https://ecommerce-p6t2.onrender.com';

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
        console.log("FULL ERROR:", error);

        const errorMessage =
            error.response?.data?.detail || // FastAPI
            error.response?.data?.error?.message || // tu formato viejo
            error.message || // axios/network
            "Error al iniciar sesión";

        throw { message: errorMessage };
    }
}