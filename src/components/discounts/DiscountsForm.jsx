import React, {useEffect} from 'react';
import { Controller, useForm } from "react-hook-form";
import { useThemeStyles } from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import { CurrencyInput } from "react-currency-input-field";
import {createDiscountsService, updateDiscountsService} from "../../services/discountService.js";
 
const DiscountsForm = ({ onClose, editingDiscount, setEditingDiscount, fetchDiscount }) => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setValue,
        reset,
        setError,
        control
    } = useForm({
        mode: "onChange",
        defaultValues: {
            value: "",
            code: "",
            status: "",
        }
    })
 
    const styles = useThemeStyles()
 
    useEffect(() => {
        if (editingDiscount?.id){
            Object.entries(editingDiscount).forEach(([key, value]) => {
                setValue(key, value);
            })
        } else{
            reset()
        }
    }, [editingDiscount, reset, setValue])
 
    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                value: Number(String(data.value).replace(',', '.'))
            };
 
            if (editingDiscount?.id) {
                await updateDiscountsService(editingDiscount.id, payload)
            } else {
                const res = await createDiscountsService(payload)
                console.log("res", res)
            }
            fetchDiscount()
            handleClose()
        } catch (err){
            console.error(err)
            setError("root", {message: err.message})
        }
    }
 
    const handleClose = () => {
        reset()
        setEditingDiscount(null)
        onClose?.()
    }
 
    return (
        <div className={"w-full"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>
                <section>
                    <label htmlFor="code" className={styles.label}>Código <span
                        className={"text-red-500"}>*</span></label>
                    <input
                        {...register("code", {
                            required: "Código requerido",
                            minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                            },
                            maxLength: {
                                value: 50,
                                message: "Máximo 50 caracteres"
                            }
                        })}
                        type="text"
                        autoComplete={"off"}
                        placeholder={"CODE"}
                        className={`${styles.inputBase} ${errors.code && styles.inputError}`} />
                    {errors.code && (
                        <span className={`${styles.errorText}`}>{errors.code.message}</span>
                    )}
                </section>
 
                <section className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
                    <section>
                        <label htmlFor="value" className={styles.label}>Valor <span className={"text-red-500"}>*</span></label>
                        <Controller
                            name="value"
                            control={control}
                            rules={{
                                required: "Valor es requerido",
                                min: {
                                    value: 0.01,
                                    message: "El valor debe ser mayor a 0"
                                },
                                max: {
                                    value: 100,
                                    message: "Valor inválido"
                                }
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    value={field.value}
                                    id="value"
                                    placeholder="Ej: 10,50"
                                    decimalsLimit={2}
                                    decimalSeparator={","}
                                    groupSeparator={"."}
                                    suffix="%"
                                    allowNegativeValue={false}
                                    allowDecimals={true}
                                    className={`${styles.inputBase} ${errors.value && styles.inputError}`}
                                    onValueChange={(value) => {
                                        field.onChange(value === undefined ? "" : value)
                                    }}
                                />
                            )}
                        />
                        {errors.value && (
                            <span className={styles.errorText}>{errors.value.message}</span>
                        )}
                    </section>
 
                    <section>
                        <label htmlFor="status" className={styles.label}>Estado <span className={"text-red-500"}>*</span></label>
                        <select name="status" id="status" {...register("status")} className={styles.inputBase}>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="BLOQUEADO">BLOQUEADO</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                        </select>
                    </section>
                </section>
 
                {/*Botones*/}
                <section className={"flex justify-center gap-2 border-t pt-4"}>
                    <Button
                        type="submit"
                        variant={"create"}
                        isLoading={isSubmitting}
                    >
                        {editingDiscount?.id ? (
                            "Editar"
                        ) : (
                            "Guardar"
                        )}
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant={"cancel"}
                    >
                        Cancelar
                    </Button>
                </section>
            </form>
        </div>
    );
};
 
export default DiscountsForm;