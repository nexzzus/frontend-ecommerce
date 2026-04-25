import React, {startTransition, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useThemeStyles} from "../../context/useThemeStyles.js";
import {createRoleService, updateRoleService} from "../../services/rolesService.js";

const RolesForm = ({fetchRoles, editingRole, setEditingRole, onClose}) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
        reset,
        setValue,
        control
    } = useForm({
            mode: "onChange",
            defaultValues: {
                name: ""
            }
        }
    )

    const styles = useThemeStyles()

    useEffect(() => {
        if (editingRole?.id) {
            Object.entries(editingRole).forEach(([key, value]) => {
                setValue(key, value || "");
            })
        } else {
            reset()
        }
    }, [editingRole, reset, setValue])

    const onSubmit = async (data) => {
        try {
            if (editingRole?.id) {
                await updateRoleService(editingRole?.id, data)
            } else {
                await createRoleService(data)
            }
            fetchRoles()
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        reset()
        onClose?.()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>
            <label htmlFor="name">Rol <span className={"text-red-500"}>*</span></label>
            <input
                {...register("name", {
                    required: "El nombre del rol es obligatorio",
                    minLength: {
                        value: 3,
                        message: "Mínimo 3 caracteres"
                    },
                    maxLength: {
                        value: 20,
                        message: "Máximo 20 caracteres"
                    }
                })}
                id={"name"}
                type="text"
                placeholder={"USER"}
                autoComplete="off"
                className={`${styles.inputBase} ${errors.name ? styles.inputError : ""}`}
            />
            {errors.name && (
                <span className={styles.errorText}>{errors.name.message}</span>
            )}

            {/* Botones */}
            <div className="flex gap-3 pt-4 border-t">
                <button disabled={isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
                >
                    {isSubmitting ?
                        "Guardando..."
                        : editingRole?.id
                            ? "Editar"
                            : "Crear"
                    }
                </button>
                <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 py-2.5 rounded-lg"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default RolesForm;