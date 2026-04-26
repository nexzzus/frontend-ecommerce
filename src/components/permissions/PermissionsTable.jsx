import React from 'react';
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";

const PermissionsTable = ({permissions, onEdit, onDelete}) => {
    const styles = useThemeStyles();
    return (
        <div className={"w-full overflow-auto rounded-lg border"} style={{borderColor: styles.borderColor}}>
            <table className={`w-full text-center`}>
                <thead>
                <tr className={styles.tableHeaderClass}>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Nombre</th>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Descripción</th>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {permissions && permissions.length > 0 ? (permissions.map((permission) => (
                        <tr key={permission.id}>
                            <td className={styles.cellColor}>{permission.name}</td>
                            <td className={styles.cellColor}>{permission.description}</td>
                            <td className={styles.cellColor}>
                                <div className={"flex justify-center gap-2 flex-wrap"}>
                                    <Button
                                        title={"Editar permiso"}
                                        icono={PencilIcon}
                                        variant={"edit"}
                                        onClick={() => onEdit(permission)}
                                    />
                                    <Button
                                        title={"Eliminar permiso"}
                                        icono={TrashIcon}
                                        variant={"delete"}
                                        onClick={() => onDelete && onDelete(permission.id)}
                                    ></Button>
                                </div>
                            </td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td>
                                <span className={styles.cellColor}>No hay permisos</span>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default PermissionsTable;