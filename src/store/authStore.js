import {create} from "zustand";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = create((set)=>({
    user: null,

    login: (token) =>{
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        set({user: decoded})
    },

    logout: ()=>{
        localStorage.removeItem("token");
        set({user: null})
    },

    initAuth: ()=>{
        const token = localStorage.getItem("token");
        if (!token) return

        try {
            const decoded = jwtDecode(token);
            set({user: decoded})
        } catch (error) {
            console.log("TOKEN INVÁLID", error);
            localStorage.removeItem("token");
        }
    }
}))