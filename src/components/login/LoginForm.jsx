import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {loginService} from "../../services/authService.js";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/authStore.js";

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        watch,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            username: "",
            password: "",
        }
    })

    // const {login} = useAuth()
    const login = useAuthStore(state => state.login)
    const [viewPassword, setViewPassword] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')

    const username = watch('username')
    const password = watch('password')

    useEffect(() => {
        setErrorMessage('')
    }, [username, password])

    const togglePassword = () => {
        setViewPassword((prev) => !prev)
    }

    const onSubmit = async (data) => {
        try {
            const res = await loginService(data)
            login(res.access_token)
            // Redirigir a usuarios después del login exitoso
            navigate('/app/users')
        } catch (error) {
            console.error('Error en login:', error);
            console.log('Setting error message:', error?.message);
            setErrorMessage(error?.message || 'Error al iniciar sesión')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="sm:w-[350px] w-full text-center border border-gray-300/60 dark:border-gray-700 rounded-2xl px-8 py-10 bg-white dark:bg-gray-800 shadow-lg">
            <h1 className="text-gray-900 dark:text-white text-3xl font-medium">Login</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Please sign in to continue</p>

            {/* Mostrar error general si existe */}
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-800">
                    {errorMessage}
                </div>
            )}

            <div
                className="flex items-center w-full mt-4 bg-white dark:bg-gray-700 border border-gray-300/80 dark:border-gray-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="text-gray-500 dark:text-gray-400">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                </svg>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('username', {
                        required: "Email es requerido",
                    })}
                    className="flex-1 bg-transparent border-none outline-none ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
            </div>
            {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}

            <div
                className="flex items-center mt-4 w-full bg-white dark:bg-gray-700 border border-gray-300/80 dark:border-gray-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="text-gray-500 dark:text-gray-400">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                    type={viewPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register('password', {
                        required: "La contraseña es requerida",
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }
                    })}
                    className="flex-1 bg-transparent border-none outline-none ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                    className={"pr-3"}
                    type={"button"}
                    onClick={togglePassword}>
                    {viewPassword ?(
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    ):(
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    )}




                </button>
            </div>
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            <div className="mt-4 text-left">
                <button
                    className="text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
                    type="button"
                    disabled={true}
                >Forget password?
                </button>
            </div>
            <button type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Iniciando sesión...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;

