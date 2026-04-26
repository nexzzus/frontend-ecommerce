import {useForm} from "react-hook-form";
import {useThemeStyles} from "../../context/useThemeStyles.js";
import {createRoleService, updateRoleService} from "../../services/rolesService.js";
import {useEffect} from "react";
import Button from "../Button.jsx";

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
                <div className="mt-4 p-3 bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-800">
                    {errors.root.message}
                </div>
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
                <Button
                    title={editingRole?.id ? "Editar" : "Crear"}
                    variant={"create"}
                    type={"submit"}
                    isLoading={isSubmitting}
                >
                    {editingRole?.id ? "Editar" : "Crear"}
                </Button>
                <Button
                    onClick={handleClose}
                    title={"Cancelar"}
                    variant={"cancel"}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
};

export default RolesForm;