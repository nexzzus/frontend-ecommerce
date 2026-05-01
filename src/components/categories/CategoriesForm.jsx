import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import {createCategoryService, updateCategoryService} from "../../services/categoryService.js";
import {toast} from "sonner";
 
const CateogoriesForm = ({editingCategory, setEditingCategory, onClose, fetchCategories}) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        setValue,
        setError
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: ""
        }
    })
 
    const styles = useThemeStyles()
 
    useEffect(() => {
        if (editingCategory?.id) {
            Object.entries(editingCategory).forEach(([key, value]) => {
                setValue(key, value);
            })
        } else {
            reset()
        }
    }, [reset, editingCategory, setValue])
 
    const onSubmit = async (data) => {
        try {
            if (editingCategory?.id) {
                await updateCategoryService(editingCategory.id, data)
            } else {
                await createCategoryService(data)
                toast.success("Categoría creada exitosamente")
            }
            fetchCategories()
            handleClose()
        } catch (error) {
            console.log(error)
            setError("root", {message: error.message})
        }
    }
 
    const handleClose = () => {
        reset()
        setEditingCategory(null)
        onClose?.()
    }
 
    return (
        <div className={"w-full"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>
                <label htmlFor="name" className={styles.label}>Categoría <span
                    className={"text-red-500"}>*</span></label>
                <input
                    {...register("name", {
                        required: "Categoría requerida",
                        minLength: {
                            value: 5,
                            message: "Mínimo 5 caracteres"
                        },
                        maxLength: {
                            value: 50,
                            message: "Máximo 50 caracteres"
                        }
                    })}
                    id="name"
                    type="text"
                    placeholder={"Tecnología"}
                    className={`${styles.inputBase} ${errors.name && styles.inputError}`}
                />
                {errors.name && (
                    <div className={`${styles.errorText}`}>{errors.name.message}</div>
                )}
 
                {/*Botones*/}
                <section className={"flex justify-center border-t pt-4 gap-3"}>
                    <Button
                        title={"Enviar"}
                        type={"submit"}
                        isLoading={isSubmitting}
                        variant={"create"}
                    >
                        {editingCategory?.id ? (
                            "Editar"
                        ) : (
                            "Guardar"
                        )}
                    </Button>
 
                    <Button
                        title={"Cancelar"}
                        variant={"cancel"}
                        onClick={handleClose}
                    >Cancelar</Button>
                </section>
 
                {/*Errores generales*/}
                {errors.root && (
                    <div
                        className={"bg-red-500 text-gray-700 border border-red-500 outline-red-500"}>{errors.root.message}</div>
                )}
            </form>
        </div>
    );
};
 
export default CateogoriesForm;