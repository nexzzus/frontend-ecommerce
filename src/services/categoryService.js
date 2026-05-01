import api from "../config/api.js";
 
const API_URL = "/categories"
 
export const getCategoriesService = async () =>{
    try {
        const res = await api.get(API_URL);
        return res.data;
    } catch (e) {
        throw {
            message: e.message || "Error al obtener las categorías",
        }
    }
}
 
export const createCategoryService = async (data) =>{
    try {
        const res = await api.post(API_URL, data);
        return res.data;
    } catch (e) {
        throw {
            message: e.message || "Error al crear la categoría",
        }
    }
}
 
export const updateCategoryService = async (id, data) =>{
    try {
        const res = await api.put(`${API_URL}/${id}`, data);
        return res.data;
    } catch (e) {
        throw {
            message: e.message || "Error al actualizar la categoría",
        }
    }
}
 
export const deleteCategoryService = async (id) =>{
    try {
        const res = await api.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (e) {
        throw {
            message: e.message || "Error al eliminar la categoría",
        }
    }
}