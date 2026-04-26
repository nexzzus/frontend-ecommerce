import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";
import {createPermissionService, editPermissionService} from "../../services/permissionService.js";

const PermissionsForm = ({fetchPermission, editingPermission, setEditingPermission, onClose}) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
        reset,
        setValue
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: "",
            description: "",
        }
    });

    const styles = useThemeStyles()

    useEffect(() => {
        if (editingPermission?.id) {
            Object.entries(editingPermission).forEach(([key, value]) => {
                setValue(key, value || "");
            })
        }else{
            reset()
        }
    }, [reset, editingPermission, setValue])

    const onSubmit = async (data) => {
        try {
            if (editingPermission?.id) {
                await editPermissionService(editingPermission.id, data)
            } else {
                await createPermissionService(data)
            }
            fetchPermission()
            handleCloseModal()
        } catch (error) {
            console.log(error)
            setError("root", {message: error.message})
        }
    }

    const handleCloseModal = () => {
        reset()
        setEditingPermission(null)
        onClose?.()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={"text-left space-y-5"}>
                <div>

                    <label htmlFor="name">Nombre <span className={"text-red-500"}>*</span></label>
                    <input
                        {...register("name", {
                            required: "El nombre es requerido",
                            minLength: {
                                value: 5,
                                message: "Mínimo 5 caracteres",
                            },
                            maxLength: {
                                value: 50,
                                message: "Máximo 50 caracteres",
                            },
                            setValueAs: (value) => value.toUpperCase()
                        })}
                        id={"name"}
                        type="text"
                        placeholder="Nombre del permiso"
                        className={`${styles.inputBase} ${errors.name ? styles.inputError : ""}`}
                    />
                    {errors.name && (
                        <span className={styles.errorText}>{errors.name.message}</span>
                    )}
                </div>


                <div>
                    <label htmlFor="description">Descripción <span className={"text-red-500"}>*</span></label>
                    <textarea
                        {...register("description", {
                                required: "La descripción es requerida",
                                minLength: {
                                    value: 5,
                                    message: "Mínimo 5 caracteres",
                                },
                                maxLength: {
                                    value: 200,
                                    message: "Máximo 200 caracteres",
                                },
                            }
                        )}
                        id={"description"}
                        className={`${styles.inputBase} ${errors.description ? styles.inputError : ""}`}
                    ></textarea>
                    {errors.description && (
                        <span className={styles.errorText}>{errors.description.message}</span>
                    )}
                </div>


                {/*Botones*/}
                <div className={"flex justify-center gap-3 border-t pt-4"}>
                    <Button
                        title={"Crear"}
                        variant={"create"}
                        type={"submit"}
                        isLoading={isSubmitting}
                    >
                        {editingPermission?.id ? "Editar" : "Crear"}
                    </Button>
                    <Button
                        title={"Cancelar"}
                        variant={"cancel"}
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </Button>
                </div>
                {/*Errores generales*/}
                {errors.root && (
                    <div
                        className="mt-4 p-3 bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-800">
                        {errors.root.message}
                    </div>
                )}
            </form>
        </div>
    )
        ;
};

export default PermissionsForm;