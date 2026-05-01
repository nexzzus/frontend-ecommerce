import React from 'react';
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
 
const DiscountsTable = ({discounts, onEdit, onDelete}) => {
    const styles = useThemeStyles();
    return (
        <div className={"w-full border rounded-lg overflow-auto mt-4"}>
            <table className={"w-full text-center"}>
                <thead className={styles.tableHeaderClass}>
                <tr>
                    <th className={styles.cellClass}>Código</th>
                    <th className={styles.cellClass}>Valor</th>
                    <th className={styles.cellClass}>Estado</th>
                    <th className={styles.cellClass}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {discounts && discounts.length > 0 ? (discounts.map((discount) => (
                        <tr key={discount.id}>
                            <td className={styles.cellColor}>{discount.code}</td>
                            <td className={styles.cellColor}>{discount.value}</td>
                            <td className={styles.cellColor}>{discount.status}</td>
                            <td className={styles.cellColor}>
 
                                {/*Botones*/}
                                <section
                                    className={"flex flex-wrap justify-center gap-2"}
                                >
                                    <Button
                                    onClick={()=> onEdit && onEdit(discount)}
                                    variant={"edit"}
                                    icono={PencilIcon}
                                    title={"Editar descuento"}
                                    />
                                    <Button
                                    onClick={()=> onDelete && onDelete(discount.id)}
                                    variant={"delete"}
                                    icono={TrashIcon}
                                    title={"Eliminar descuento"}
                                    />
                                </section>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className={styles.cellColor}>
                            <span>No hay descuentos</span>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};
 
export default DiscountsTable;