import React from 'react';
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
 
const CategoriesTable = ({categories, onEdit, onDelete}) => {
    const styles = useThemeStyles();
    return (
        <div className={"w-full overflow-auto rounded-lg border"}>
            <table className={"w-full text-center"}>
                <thead className={styles.tableHeaderClass}>
                <tr>
                    <th className={`${styles.cellClass}`}>Categoría</th>
                    <th className={`${styles.cellClass}`}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <tr key={category.id}>
                            <td className={styles.cellColor}>{category.name}</td>
                            <td>
                                <section className={"flex justify-center gap-2 flex-wrap"}>
                                    {/*Botones*/}
                                    <Button
                                        title={"Editar categoría"}
                                        onClick={() => onEdit && onEdit(category)}
                                        variant={"edit"}
                                        icono={PencilIcon}
                                    />
 
                                    <Button
                                        title={"Eliminar categoría"}
                                        onClick={() => onDelete && onDelete(category.id)}
                                        variant={"delete"}
                                        icono={TrashIcon}
                                    />
                                </section>
                            </td>
                        </tr>
 
                    ))
                ) : (
                    <tr>
                        <td className={styles.cellColor}>
                            <span>No hay categorías</span>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};
 
export default CategoriesTable;