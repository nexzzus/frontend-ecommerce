import React, {useEffect} from 'react';
import {useThemeStyles} from "../../../context/useThemeStyles.js";
import PermissionsTable from "../../../components/permissions/PermissionsTable.jsx";
import {deletePermissionService, getPermissionsService} from "../../../services/permissionService.js";
import Modal from "../../../components/Modal.jsx";
import PermissionsForm from "../../../components/permissions/PermissionsForm.jsx";
import Swal from "sweetalert2";

import {toast} from "sonner";

const PermissionsPage = () => {
    const styles = useThemeStyles();
    const [permissions, setPermissions] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [editingPermission, setEditingPermission] = React.useState(null);

    const fetchPermission = async () => {
        const res = await getPermissionsService()
        setPermissions(res.data)
    }

    useEffect(() => {
        const loadPermissions = async () => {
            await fetchPermission()
        }
        loadPermissions()
    }, []);

    const handleCloseModal = () => {
        setOpen(false)
        setEditingPermission(false)
    }


    const handleOpenModal = () => {
        setOpen(true)
        setEditingPermission(null)
    }

    const handleDelete = async (id) => {
        try {

            const result = await Swal.fire({
                title: "¿Eliminar?",
                text: "No podrás revertir esto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
            });

            if (result.isConfirmed) {
                await deletePermissionService(id)
                toast.success("Permiso eliminado correctamente")
                await fetchPermission()
            }

        } catch (e) {
            console.log(e)
        }
    }

    const handleEdit = (permission) => {
        setEditingPermission(permission)
        setOpen(true)
    }

    const modalTitle = editingPermission?.id ? `Editar Permiso: ${editingPermission.name}` : "Nuevo Permiso"

    return (
        <>
            <Modal
                open={open}
                onClose={handleCloseModal}
                title={modalTitle}
            >
                <PermissionsForm
                    fetchPermission={fetchPermission}
                    onClose={handleCloseModal}
                    setEditingPermission={setEditingPermission}
                    editingPermission={editingPermission}
                />
            </Modal>
            <div className={"w-full"}>
                <div className={"flex items-center justify-between mb-6"}>
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary}`}>
                        Gestión de Permisos
                    </h1>
                    <button
                        onClick={handleOpenModal}
                        className={"w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-1 py-2.5 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg text-white"}
                    >
                        + Nuevo Permiso
                    </button>
                </div>
                <PermissionsTable
                    permissions={permissions}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>
        </>
    );
};

export default PermissionsPage;