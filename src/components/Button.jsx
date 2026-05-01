import React from 'react';
import {useThemeStyles} from "../context/useThemeStyles.js";

const Button = ({
                    title,
                    icono: Icon,
                    children,
                    variant = "default",
                    type = "button",
                    onClick,
                    isLoading = false,
                }) => {
    const styles = useThemeStyles();

    const buttonVariants = {
        cancel: styles.buttonCancel,
        edit: styles.buttonActionEdit,
        create: styles.buttonCreate,
        delete: styles.buttonActionDelete,
        new: styles.buttonNew,
        default: styles.buttonPrimary
    }

    const buttonStyle = buttonVariants[variant] || styles.buttonPrimary

    return (
        <>
            <button
                type={type}
                className={`hover:scale-105 flex justify-center ${buttonStyle} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                title={title}
                aria-label={title}
                onClick={onClick}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        {Icon && <Icon className="h-4 w-4" />}
                        {children}
                    </>
                )}
            </button>
        </>
    );
};

export default Button;