import {create} from "zustand";
import {getDiscountsService} from "../services/discountService.js";
 
export const useDiscountStore = create((set)=>({
    discounts: [],
    isLoading: false,
    error: null,
 
    fetchDiscounts: async ()=>{
        set({isLoading: true, error: null});
 
        try {
            const res = await getDiscountsService()
            set({discounts: res.data, isLoading: false});
        } catch (error) {
            set({isLoading: false, error: error.message || "Error al obtener los descuentos"});
        }
    }
}))