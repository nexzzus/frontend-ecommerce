import {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {useTheme} from "../../context/useTheme";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {createUser, updateUser} from "../../services/userService.js";

const roles = [
    {id: "5bb3b101-b967-424a-8a0f-c174f7196fd4", name: "ADMIN"},
    {id: "56cbacdf-2fc9-43f0-858d-3a9d852d50eb", name: "USER"},
    {id: 4, name: "OTHER"},
]

function UserForm({fetchUsers, editingUser, setEditingUser, onClose}) {
    const {theme} = useTheme();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
        reset,
        setValue,
        control,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            role_ids: []
        },
    });

    // Llenar formulario en edición
    useEffect(() => {
        if (editingUser?.id) {
            Object.entries(editingUser).forEach(([key, value]) => {
                setValue(key, value || "");
            });

            if (editingUser.roles) {
                setValue(
                    "role_ids",
                    editingUser.roles.map(r => r.id)
                );
            }

        } else {
            reset();
        }
    }, [editingUser, setValue, reset]);

    const onSubmit = async (data) => {
        try {
            if (editingUser?.id){
                await updateUser(editingUser.id, data);
            } else {
                await createUser(data);
            }
            fetchUsers();
            handleClose()
        } catch (e) {
            console.error("Error al guardar:", e.message);
            const message = e?.message || "Error al guardar";

            // Manejo específico
            if (message.toLowerCase().includes("email")) {
                setError("email", {
                    message: "Este correo ya está registrado"
                });
            } else {
                setError("root", { message });
            }
        }
    };

    const handleClose = () => {
        reset();
        setEditingUser(null);
        onClose?.();
    };

    // estilos reutilizables
    const inputBase = `w-full px-4 py-2.5 border rounded-lg font-medium transition
    ${
        theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
    }`;

    const label = `block text-sm font-semibold mb-2 ${
        theme === "dark" ? "text-gray-200" : "text-gray-700"
    }`;

    const errorText = "text-red-500 text-xs mt-1 ml-1";

    const phoneWrapper = `w-full px-3 py-2 border rounded-lg flex items-center gap-2
    ${
        theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white focus-within:ring-2 focus-within:ring-blue-500"
            : "bg-white border-gray-300 text-gray-900 focus-within:ring-2 focus-within:ring-blue-500"
    }
    ${errors.phone ? "border-red-500 focus-within:ring-red-500" : ""}`;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">

            {/* Nombre + Apellido */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={label}>Nombre <span className={"text-red-500"}>*</span></label>
                    <input
                        {...register("first_name", {
                            required: "Requerido",
                            minLength: {value: 3, message: "Mínimo 3 caracteres"},
                            pattern: {
                                value: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
                                message: "Solo letras",
                            },
                        })}
                        className={`${inputBase} ${errors.first_name && "border-red-500"}`}
                        placeholder="Pepito"
                    />
                    {errors.first_name && (
                        <span className={errorText}>{errors.first_name.message}</span>
                    )}
                </div>

                <div>
                    <label className={label}>Apellido <span className={"text-red-500"}>*</span></label>
                    <input
                        {...register("last_name", {
                            required: "Requerido",
                            minLength: {value: 3, message: "Mínimo 3 caracteres"},
                            pattern: {
                                value: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
                                message: "Solo letras",
                            },
                        })}
                        className={`${inputBase} ${errors.last_name && "border-red-500"}`}
                        placeholder="Pérez"
                    />
                    {errors.last_name && (
                        <span className={errorText}>{errors.last_name.message}</span>
                    )}
                </div>
            </div>

            {/* Email */}
            <div>
                <label className={label}>Email <span className={"text-red-500"}>*</span></label>
                <input
                    type="email"
                    {...register("email", {
                        required: editingUser ? false : "Requerido",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido",
                        },
                    })}
                    className={`${inputBase} ${errors.email && "border-red-500"}`}
                    placeholder="correo@email.com"
                />
                {errors.email && (
                    <span className={errorText}>{errors.email.message}</span>
                )}
            </div>

            {/* Contraseña */}
            <div>
                <label htmlFor="password" className={label}>
                    Contraseña <span className={"text-red-500"}>*</span>
                </label>
                <input type="password"
                       id={"password"}
                       {...register("password", {
                           required: "Requerido",
                           minLength: {
                               value: 6,
                               message: "Contraseña demasiado corta"
                           },
                           maxLength: {
                               value: 200,
                               message: "Contraseña demasiado larga"
                           }
                       })}
                       className={`${inputBase} ${errors.password && "border-red-500"}`}
                />
                {errors.password && (
                    <span className={errorText}>{errors.password.message}</span>
                )}
            </div>

            {/* Teléfono + Dirección */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={label}>Teléfono</label>

                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            validate: (value) =>
                                isValidPhoneNumber(value || "") || "Teléfono inválido",
                        }}
                        render={({field}) => (
                            <div className={phoneWrapper}>
                                <PhoneInput
                                    {...field}
                                    defaultCountry="CO"
                                    international
                                    countryCallingCodeEditable={false}
                                    className="PhoneInput w-full"
                                />
                            </div>
                        )}
                    />

                    {errors.phone && (
                        <span className={errorText}>{errors.phone.message}</span>
                    )}
                </div>

                <div>
                    <label className={label}>Dirección</label>
                    <input
                        {...register("address", {
                            minLength: {value: 5, message: "Dirección inválida"},
                        })}
                        className={`${inputBase} ${errors.address && "border-red-500"}`}
                        placeholder="Cra 99 #99-99"
                    />
                    {errors.address && (
                        <span className={errorText}>{errors.address.message}</span>
                    )}
                </div>
            </div>

            {/* Roles */}
            <div>
                <label htmlFor="roles" className={label}>Rol</label>
                {roles.map((role) => (
                    <label key={role.id} className={"flex flex-wrap items-center gap-2"}>
                        <input type="checkbox"
                               value={role.id}
                               {...register("role_ids")}
                               className={"w-4 h-4"}/>
                        {role.name}
                    </label>
                ))}
                {errors.role_ids && (
                    <span className={errorText}>{errors.role_ids.message}</span>
                )}
            </div>

            {/* Error global */}
            {errors.root && (
                <div className="p-3 bg-red-100 rounded text-sm">
                    {errors.root.message}
                </div>
            )}

            {/* Botones */}
            <div className="flex gap-3 pt-4 border-t">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
                >
                    {isSubmitting
                        ? "Guardando..."
                        : editingUser?.id
                            ? "Actualizar"
                            : "Crear"}
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
}

export default UserForm;