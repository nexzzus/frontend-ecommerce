import {create} from "zustand";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = create((set)=>({
    user: null,
    isInitializing: true,

    login: (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        set({
            user: decoded,
            isInitializing: false
        });
    },

    logout: ()=>{
        localStorage.removeItem("token");
        set({user: null})
    },

    initAuth: ()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            set({ user: null, isInitializing: false });
            return
        }

        try {
            const decoded = jwtDecode(token);
            set({user: decoded, isInitializing: false})
        } catch (error) {
            console.log("TOKEN INVÁLID", error);
            localStorage.removeItem("token");
            set({ user: null, isInitializing: false });
        }
    }
}))