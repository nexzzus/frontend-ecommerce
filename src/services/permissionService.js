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