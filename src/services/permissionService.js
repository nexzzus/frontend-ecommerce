import api from "../config/api.js";

const API_URL = "/permissions"

export const getPermissionsService = async () => {
    try {
        const response = await api.get(API_URL)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const createPermissionService = async (data) => {
    try {
        const response = await api.post(API_URL, data)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const deletePermissionService = async (id) => {
    try {
        const response = await api.delete(`${API_URL}/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const editPermissionService = async (id, data) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, data)
        return response.data
    } catch (e) {
        console.log(e)
    }
}