import api from "../config/api.js";
 
const API_URL = "/products"
 
export const createProductService = async (data) => {
    try {
        const response = await api.post(API_URL, data)
        return response.data
    } catch (e) {
        console.error(e)
        const backendError = e.data.message
        throw {
            message: backendError,
        }
    }
}
 
export const getProductsService = async () => {
    try {
        const response = await api.get(API_URL)
        return response.data
    } catch (e) {
        console.error(e)
        throw {
            message: e.message,
        }
    }
}
 
export const updateProductService = async (id, data) => {
    try {
        await api.put(`${API_URL}/${id}`, {
            name: data.name,
            price: data.price,
            description: data.description,
            stock: data.stock,
            id_discount: data.id_discount,
        })
        if (data.category_ids) {
            await api.put(`${API_URL}/${id}/categories`, {
                category_ids: data.category_ids,
            })
        }
    } catch (e) {
        throw {
            message: e.message,
        }
    }
}
 
export const deleteProductService = async (id) => {
    const res = await api.delete(`${API_URL}/${id}`)
    return res.data
}