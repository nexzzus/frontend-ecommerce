import {useTheme} from "./useTheme.js";

export const useThemeStyles = () => {
    const {theme} = useTheme()
    const isDark = theme === 'dark'

    return {
        // Tabla
        tableHeaderClass: isDark
            ? 'bg-gray-700 text-white'
            : 'bg-gray-100 text-gray-900',

        tableRowClass: isDark
            ? 'border-b border-gray-600 hover:bg-gray-700'
            : 'border-b border-gray-200 hover:border-gray-50',

        cellClass: 'px-4 sm:px-6 py-3 sm:py-4 text-sm',

        cellColor: isDark
            ? 'text-gray-300'
            : 'text-gray-700',

        // Colores de texto general
        textPrimary: isDark
            ? 'text-gray-100'
            : 'text-gray-900',

        textSecondary: isDark
            ? 'text-gray-400'
            : 'text-gray-600',

        // Fondos
        bgPrimary: isDark
            ? 'bg-gray-800'
            : 'bg-white',

        bgSecondary: isDark
            ? 'bg-gray-700'
            : 'bg-gray-50',

        bgTertiary: isDark
            ? 'bg-gray-600'
            : 'bg-gray-100',

        // Cards/Contenedores
        cardClass: isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200',

        // Input/Formularios
        inputBase: isDark
            ? 'w-full px-4 py-2.5 border border-gray-600 rounded-lg font-medium transition bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            : 'w-full px-4 py-2.5 border border-gray-300 rounded-lg font-medium transition bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none',

        inputError: 'border-2 !border-red-500 !ring-red-500 focus:!ring-red-500 focus:!border-red-500 focus:outline-none !outline-none',

        errorText: "text-red-500 text-xs mt-1 ml-1",

        // Roles
        roleColors: {
            ADMIN: isDark
                ? 'bg-red-900 text-red-200'
                : 'bg-red-100 text-red-800',
            USER: isDark
                ? 'bg-blue-900 text-blue-200'
                : 'bg-blue-100 text-blue-800',
            DEFAULT: isDark
                ? 'bg-gray-700 text-gray-200'
                : 'bg-gray-100 text-gray-800',
        },

        // Botones
        buttonPrimary: isDark
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white',
        buttonDanger: isDark
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white',
        buttonSecondary: isDark
            ? 'bg-gray-600 hover:bg-gray-700 text-white'
            : 'bg-gray-300 hover:bg-gray-400 text-gray-900',


        // Boton para acciones de tabla (editar/eliminar)
        buttonActionDelete: "flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium",
        buttonActionEdit: "flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium",

        // Boton para acciones de formulario (Guardar, Editar, Cancelar)
        buttonCancel: "flex-1 bg-gray-300 hover:bg-gray-400 py-2.5 rounded-lg",
        buttonCreate: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
    }
}