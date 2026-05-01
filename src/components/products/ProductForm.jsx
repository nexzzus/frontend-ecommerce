import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import {CurrencyInput} from "react-currency-input-field";
import {useDiscountStore} from "../../store/discountStore.js";
import {useCategoryStore} from "../../store/categoryStore.js";
import {createProductService, updateProductService} from "../../services/productService.js";
import {toast} from "sonner";
 
const ProductForm = ({onClose, setEditingProduct, editingProduct, fetchProducts}) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
        setValue,
        reset,
        control
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            stock: 0,
            id_discount: "",
            category_ids: []
        }
    })
 
    const styles = useThemeStyles()
    const discounts = useDiscountStore(state => state.discounts)
    const fetchDiscounts = useDiscountStore(state => state.fetchDiscounts)
    const isLoadingDiscounts = useDiscountStore(state => state.isLoading)
    const categories = useCategoryStore(state => state.categories)
    const fetchCategories = useCategoryStore(state => state.fetchCategories)
    const isLoadingCategories = useCategoryStore(state => state.isLoading)
 
    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories()
        }
    }, [fetchCategories, categories.length])
 
    useEffect(() => {
        if (discounts.length === 0) {
            fetchDiscounts()
        }
    }, [fetchDiscounts, discounts.length])
 
    useEffect(() => {
        if (editingProduct?.id) {
            setValue("name", editingProduct.name)
            setValue("description", editingProduct.description)
            setValue("price", editingProduct.price)
            setValue("stock", editingProduct.stock)
            setValue("id_discount", editingProduct.discount?.id || "")
 
            setValue(
                "category_ids",
                editingProduct.categories?.map(c => c.id.toString()) || []
            )
        } else {
            reset()
        }
    }, [editingProduct, setValue, reset])
 
 
    const onSubmit = async (data) => {
        try {
            if (editingProduct?.id) {
                await updateProductService(editingProduct.id, data)
                toast.success("Producto actualizado exitosamente")
            } else {
                await createProductService(data)
                toast.success("Producto creado exitosamente")
            }
            fetchProducts()
            handleClose()
        } catch (e) {
            console.log(e)
            setError("root", {message: e.message})
        }
    }
 
    const handleClose = () => {
        reset()
        setEditingProduct(null)
        onClose?.()
    }
 
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"text-left space-y-1"}>
            <section>
                <label htmlFor="name" className={styles.label}>Nombre <span className={"text-red-500"}>*</span></label>
                <input
                    {...register("name", {
                        required: "Nombre es requerido",
                        minLength: {
                            value: 3,
                            message: "Mínimo 3 carácteres",
                        },
                        maxLength: {
                            value: 50,
                            message: "Máximo 50 carácteres"
                        }
                    })}
                    id={"name"}
                    type="text"
                    autoComplete={"product"}
                    placeholder={"Producto"}
                    className={`${styles.inputBase} ${errors.name && styles.inputError}`}
                />
                {errors.name && (
                    <span className={styles.errorText}>{errors.name.message}</span>
                )}
            </section>
 
            <section>
                <label htmlFor="description" className={styles.label}>Descripción <span className={"text-red-500"}>*</span></label>
                <textarea
                    {...register("description", {
                        required: "Descripción es requerida",
                        minLength: {
                            value: 5,
                            message: "Minimo 5 carácteres",
                        },
                        maxLength: {
                            value: 500,
                            message: "Máximo 500 carácteres"
                        }
                    })}
                    className={`${styles.inputBase} ${errors.description && styles.inputError}`}
                ></textarea>
                {errors.description && (
                    <span className={styles.errorText}>{errors.description.message}</span>
                )}
            </section>
 
            <section className={"grid md:grid-cols-2 gap-3"}>
                <section>
                    <label htmlFor="price" className={styles.label}>Precio <span className={"text-red-500"}>*</span></label>
                    <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: "Precio es requerido",
                            min: {
                                value: 1,
                                message: "El precio debe ser mayor a 0"
                            }
                        }}
                        render={({field}) => (
                            <CurrencyInput
                                value={field.value}
                                id="price"
                                placeholder="Ingrese el precio"
                                decimalsLimit={2}
                                prefix="$"
                                className={`${styles.inputBase} ${errors.price && styles.inputError}`}
                                onValueChange={(value) => {
                                    field.onChange(value ? Number(value) : 0)
                                }}
                            />
                        )}
                    />
                    {errors.price && (
                        <span className={styles.errorText}>{errors.price.message}</span>
                    )}
                </section>
 
                {/*Stock*/}
                <section>
                    <label htmlFor="stock" className={styles.label}>Stock <span className={"text-red-500"}>*</span></label>
                    <input
                        {...register("stock", {
                            required: "Stock es requerido",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "El stock debe ser mayor a 0"
                            },
                            max: {
                                value: 100000,
                                message: "Stock inválido"
                            }
                        })}
                        type="number"
                        min={1}
                        max={10000}
                        className={`${styles.inputBase} ${errors.stock && styles.inputError}`}/>
                    {errors.stock && (
                        <span className={styles.errorText}>{errors.stock.message}</span>
                    )}
                </section>
            </section>
 
            {/*Descuento*/}
            <section>
                <label htmlFor="discount" className={styles.label}>Descuento</label>
                {isLoadingDiscounts ? (
                    <span className={"text-sm text-gray-500"}>Cargando descuentos...</span>
                ) : (
                    <select
                        {...register("id_discount")}
                        className={styles.inputBase}
                    >
                        <option value="">Sin descuento</option>
                        {discounts.map((discount) => (
                            <option key={discount.id} value={discount.id}>
                                {discount.code}
                            </option>
                        ))}
                    </select>
                )}
 
            </section>
 
            {/* Categorías */}
            <section>
                <label htmlFor="categories" className={styles.label}>Categoría</label>
                {isLoadingCategories ? (
                    <span className={"text-sm text-gray-500"}>Cargando categorías...</span>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {categories.map((cat) => (
                            <label
                                key={cat.id}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition
               hover:bg-gray-100 dark:hover:bg-gray-800
               has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400"
                            >
                                <input
                                    type="checkbox"
                                    value={cat.id}
                                    {...register("category_ids")}
                                    className="w-4 h-4"
                                />
                                {cat.name}
                            </label>
                        ))}
                    </div>
                )}
 
                {errors.category_ids && (
                    <span className={styles.errorText}>{errors.category_ids.message}</span>
                )}
            </section>
 
            <section className={"flex flex-wrap border-t mt-3 pt-3 gap-2"}>
                <Button
                    variant={"create"}
                    type={"submit"}
                    isLoading={isSubmitting}
                >
                    {editingProduct?.id ?(
                        "Editar"
                    ):(
                        "Guardar"
                    )}
                </Button>
                <Button
                    variant={"cancel"}
                    onClick={handleClose}
                    title={"Cancelar"}
                >
                    Cancelar
                </Button>
            </section>
        </form>
    );
};
 
export default ProductForm;