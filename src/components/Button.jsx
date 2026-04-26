import React from 'react';
import {useThemeStyles} from "../context/useThemeStyles.js";

const Button = ({title, icono: Icon, action}) => {
    const styles = useThemeStyles();
    return (
        <>
            <button
                // onClick={() => onEdit(role)}
                className={action === 'edit' ? styles.buttonActionEdit : styles.buttonActionDelete}
                title={title}
            >
                <Icon className="h-4 w-4"/>
            </button>
        </>
    );
};

export default Button;