import api from "../config/api.js";
 
const API_URL = "/discounts"
 
export const getDiscountsService = async () => {
    try {
        const res = await api.get(API_URL)
        return res.data
    } catch (error) {
        throw {
            message: error.message,
        };
    }
}
 
export const createDiscountsService = async (data) => {
    try {
        const res = await api.post(`${API_URL}`, data)
        return res.data
    } catch (error) {
        throw {
            message: error.message,
        };
    }
}
 
export const updateDiscountsService = async (id, data) => {
    try {
        const res = await api.put(`${API_URL}/${id}`, data)
        return res.data
    } catch (error) {
        throw {
            message: error.message,
        };
    }
}
 
export const deleteDiscountsService = async (id) => {
    try {
        const res = await api.delete(`${API_URL}/${id}`)
        return res.data
    } catch (error) {
        throw {
            message: error.message,
        };
    }
}