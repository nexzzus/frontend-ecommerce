import api from "../config/api.js";

const API_URL = "/users"

export const getUsers = async () => {
    const response = await api.get(API_URL);
    return response.data.data;
}

export const createUser = async (data) => {
    try {
        const response = await api.post(API_URL, data);

        if (response.status === 201) {
            return response.data.data;
        }

    } catch (error) {
        console.log("Error en el servicio", error);
        const backendError = error.response?.data;

        throw {
            message: backendError?.error?.message || "Error desconocido",
            code: backendError?.error?.code,
            details: backendError?.error?.details
        };
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error en el servicio", error);
        const backendError = error.response?.data;

        throw {
            message: backendError?.error?.message || "Error al eliminar usuario",
            code: backendError?.error?.code,
            details: backendError?.error?.details
        };
    }
}

export const updateUser = async (id, data) => {
    try {
        // 1. actualizar usuario
        await api.put(`${API_URL}/${id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            password: data.password || undefined,
        });

        // 2. actualizar roles
        if (data.role_ids) {
            await api.put(`${API_URL}/${id}/roles`, {
                role_ids: data.role_ids,
            });
        }

    } catch (error) {
        const backendError = error.response?.data;
        throw {
            message: backendError?.error?.message || "Error desconocido",
            code: backendError?.error?.code,
            details: backendError?.error?.details
        }
    }
}