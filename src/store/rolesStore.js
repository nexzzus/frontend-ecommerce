import { create } from "zustand";
import { getRoles } from "../services/rolesService.js";

export const useRolesStore = create((set) => ({
    roles: [],
    isLoading: false,
    error: null,

    fetchRoles: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await getRoles();
            set({
                roles: res.data,
                isLoading: false
            });
        } catch (err) {
            console.error("Error fetching roles:", err);

            set({
                isLoading: false,
                error: err.message || "Error al obtener roles"
            });
        }
    }
}));