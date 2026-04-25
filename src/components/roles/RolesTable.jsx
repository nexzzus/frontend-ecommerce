import React from 'react';
import {useThemeStyles} from "../../context/useThemeStyles.js";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";

const RolesTable = ({roles, onEdit, onDelete}) => {
    const styles = useThemeStyles()

    const getRoleColor = (role) => {
        return styles.roleColors[role] || styles.roleColors.DEFAULT
    }

    return (
        <div className={"w-full overflow-auto rounded-lg border"} style={{borderColor: styles.borderColor}}>
            <table className={"w-full text-center"}>
                <thead>
                <tr className={styles.tableHeaderClass}>
                    <th className={`${styles.cellClass} font-semibold  whitespace-nowrap`}>Rol</th>
                    <th className={`${styles.cellClass} font-semibold  whitespace-nowrap`}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {roles && roles.length > 0 ? (roles.map((role) => (
                    <tr key={role.id}>
                        <td className={styles.cellColor}>
                        <span
                            className={`${getRoleColor(role.name)} font-semibold text-xs rounded-full py-1 px-2 inline-block`}>
                            {role.name}
                        </span>
                        </td>
                        <td className={`${styles.cellClass} text-center`}>
                            <div className="flex gap-2 justify-center flex-wrap">
                                <button
                                    onClick={() => onEdit(role)}
                                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                                    title="Editar usuario"
                                >
                                    <PencilIcon className="h-4 w-4"/>
                                </button>
                                <button
                                    onClick={() => onDelete && onDelete(role.id)}
                                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                                    title="Eliminar usuario"
                                >
                                    <TrashIcon className="w-4 h-4"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))) : (
                    <tr>
                        <td className={`${styles.cellClass} ${styles.cellColor} text-center`} colSpan={2}>
                            No hay roles
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default RolesTable;