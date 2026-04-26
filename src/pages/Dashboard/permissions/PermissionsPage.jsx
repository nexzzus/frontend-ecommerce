import React, {useEffect} from 'react';
import {useThemeStyles} from "../../../context/useThemeStyles.js";
import PermissionsTable from "../../../components/permissions/PermissionsTable.jsx";
import {getPermissionsService} from "../../../services/permissionService.js";

const PermissionsPage = () => {
    const styles = useThemeStyles();
    const [permissions, setPermissions] = React.useState([])

    const fetchRoles = async () => {
        const res = await getPermissionsService()
        setPermissions(res.data)
    }

    useEffect(() => {
        const loadPermissions = async () => {
            await fetchRoles()
        }
        loadPermissions()
    }, []);

    return (
        <>
            <div className={"w-full"}>
                <div className={"flex items-center justify-between mb-6"}>
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary}`}>
                        Gestión de Permisos
                    </h1>
                    <button
                        className={"w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-1 py-2.5 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg text-white"}
                    >
                        + Nuevo Permiso
                    </button>
                </div>
                <PermissionsTable
                    permissions={permissions}
                />
            </div>
        </>
    );
};

export default PermissionsPage;