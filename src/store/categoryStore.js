import {create} from "zustand";
import {getCategoriesService} from "../services/categoryService.js";
 
export const useCategoryStore = create((set)=>({
    categories: [],
    isLoading: false,
    error: null,
 
    fetchCategories: async ()=>{
        set({isLoading: true, error: null});
 
        try {
            const res = await getCategoriesService()
            set({categories: res.data, isLoading: false});
        } catch (error) {
            set({isLoading: false, error: error.message || "Error al cargar las categorias"});
        }
    }
}))