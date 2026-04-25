import {useForm} from "react-hook-form";
import {useThemeStyles} from "../../context/useThemeStyles.js";
import {createRoleService, updateRoleService} from "../../services/rolesService.js";
import {useEffect} from "react";

const RolesForm = ({fetchRoles, editingRole, setEditingRole, onClose}) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
        reset,
        setValue,
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
            const message = error?.message || "Error al guardar"
            if (error?.status === 400) {
                setError("name", {message})
            } else {
                setError("root", {message: "Error desconocido"})
            }

        }
    }

    const handleClose = () => {
        reset()
        setEditingRole(null)
        onClose?.()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>

            {/*Errores generales*/}
            {errors.root && (
                <div className="mt-4 p-3 bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-800">{errors.root.message}</div>
            )}
            <div>
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
                        },
                        setValueAs: (value) => value.toUpperCase()
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
            </div>

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