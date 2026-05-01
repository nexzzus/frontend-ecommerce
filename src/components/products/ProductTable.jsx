import React from 'react';
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
 
const ProductTable = ({products, onEdit, onDelete}) => {
    const styles = useThemeStyles()
    return (
        <div className={"w-full rounded-lg border overflow-auto mt-6"}>
            <table className={"text-left w-full"}>
                <thead className={styles.tableHeaderClass}>
                <tr>
                    <th className={styles.cellClass}>Nombre</th>
                    <th className={styles.cellClass}>Precio</th>
                    <th className={styles.cellClass}>Stock</th>
                    <th className={styles.cellClass}>Categoría</th>
                    <th className={styles.cellClass}>Descuentos</th>
                    <th className={styles.cellClass}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products && products.length > 0 ? products.map(product => (
                    <tr key={product.id}>
                        <td className={`${styles.cellColor}`}>{product.name}</td>
                        <td className={styles.cellColor}>$ {product.price}</td>
                        <td className={`${styles.cellColor}`}>{product.stock}</td>
                        <td className={styles.cellColor}>
                            {product.categories.length > 0 ? (
                                <div className={"flex flex-wrap gap-1 justify-center"}>
                                    {product.categories.map(category => (
                                        <span className={"text-sm bg-gray-200 dark:bg-gray-700 py-1 px-2 rounded-full"}
                                              key={category.id}>
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className={`text-sm ${styles.textPrimary}`}>Sin categoría</span>
                            )}
                        </td>
                        <td className={styles.cellColor}>{product.discount ? product.discount.code : "Sin descuento"}</td>
                        <td className={styles.cellColor}>
                            {/*Botones*/}
                            <div className={"flex justify-center gap-2"}>
                                <Button
                                    title={"Editar producto"}
                                    variant={"edit"}
                                    icono={PencilIcon}
                                    onClick={() => onEdit && onEdit(product)}
                                />
 
                                <Button
                                    title={"Eliminar producto"}
                                    variant={"delete"}
                                    icono={TrashIcon}
                                    onClick={() => onDelete && onDelete(product.id)}
                                />
                            </div>
 
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td>
                            <span className={styles.textPrimary}>No hay productos</span>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};
 
export default ProductTable;