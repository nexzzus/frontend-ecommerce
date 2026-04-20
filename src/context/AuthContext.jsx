import React, {useEffect, useState} from "react";
import {AuthContext} from "./AuthContextCreate.js";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUser(decoded);
            } catch (error) {
                console.log("TOKEN INVALID", error);
                logout()
            }
        }
    }, [])

    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token)
        setUser(decoded);
    }

    const isAuthenticated = !!user

    return (
        <AuthContext.Provider
            value={{
                logout,
                isAuthenticated,
                login,
                user
            }
            }>
            {children}
        </AuthContext.Provider>
    )
}