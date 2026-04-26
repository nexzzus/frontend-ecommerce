import {create} from "zustand";
import {getPermissionsService} from "../services/permissionService.js";

export const usePermissionStore = create(set => ({
        permissions: [],
        isLoading: false,
        error: null,

        fetchPermissions: async () => {
            set({isLoading: true, error: null});

            try {
                const res = await getPermissionsService();
                set({
                    permissions: res.data,
                    isLoading: false
                });
            } catch (err) {
                console.error("Error fetching permissions:", err);
                set({
                    isLoading: false,
                    error: err.message || "Error al obtener permisos"
                })
            }
        },
    }
))