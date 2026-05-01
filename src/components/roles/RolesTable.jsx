import React from 'react';
import {useThemeStyles} from "../../context/useThemeStyles.js";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import Button from "../Button.jsx";

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
                    <th className={`${styles.cellClass} font-semibold  whitespace-nowrap`}>Permisos</th>
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
                        <td className={styles.cellColor}>
                            {role.permissions?.length > 0 ? (
                                <div className="flex flex-wrap gap-1 justify-center">
                                    {role.permissions.map((permission) => (
                                        <span
                                            key={permission.id}
                                            className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full"
                                        >
                    {permission.name}
                </span>
                                    ))}
                                </div>
                            ) : (
                                <span className={`text-sm ${styles.textPrimary}`}>Sin permisos</span>
                            )}
                        </td>
                        <td className={`${styles.cellClass} text-center`}>
                            <div className="flex gap-2 justify-center flex-wrap">
                                <Button
                                    onClick={() => onEdit(role)}
                                    title="Editar usuario"
                                    variant={"edit"}
                                    icono={PencilIcon}
                                >
                                </Button>
                                <Button
                                    onClick={() => onDelete && onDelete(role.id)}
                                    variant={"delete"}
                                    title="Eliminar usuario"
                                    icono={TrashIcon}
                                >
                                </Button>
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