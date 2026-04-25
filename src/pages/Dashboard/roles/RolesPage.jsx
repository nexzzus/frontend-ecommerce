import React, {useEffect} from 'react';
import {deleteRoleService, getRoles} from "../../../services/rolesService.js";
import RolesTable from "../../../components/roles/RolesTable.jsx";
import {useThemeStyles} from "../../../context/useThemeStyles.js";
import Modal from "../../../components/Modal.jsx";
import RolesForm from "../../../components/roles/RolesForm.jsx";

const RolesPage = () => {
    const styles = useThemeStyles()
    const [roles, setRoles] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [editingRole, setEditingRole] = React.useState(null);

    const fetchRoles = async () => {
        const res = await getRoles()
        setRoles(res.data)
    }

    useEffect(() => {
        const loadRoles = async () => {
            await fetchRoles()
        }
        loadRoles()
    }, [])

    const handleEditRole = (role) => {
        setEditingRole(role)
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleDeleteRole = async (id)=>{
        if (window.confirm("Eliminar rol")){
            try {
                await deleteRoleService(id)
                await fetchRoles()
                alert("Rol eliminado correctamente")
            }catch (e) {
                console.log(e)
                alert("Error al eliminar el rol. Por favor intenta de nuevo.")
            }
        }
    }

    const modalTitle = editingRole?.id ? `Editar Rol: ${editingRole.name}` : "Nuevo Rol";

    return (
        <>
            <Modal open={open} onClose={handleCloseModal} title={modalTitle}>
                <RolesForm
                    fetchRoles={fetchRoles}
                    editingRole={editingRole}
                    setEditingRole={setEditingRole}
                    onClose={handleCloseModal}
                />
            </Modal>
            <div className={"w-full"}>
                <div className={"flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"}>
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary}`}>
                        Gestión de Roles
                    </h1>

                    <button
                        onClick={handleOpenModal}
                        className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                        + Nuevo Rol
                    </button>
                </div>

                <RolesTable
                    roles={roles}
                    onEdit={handleEditRole}
                    onDelete={handleDeleteRole}
                />
            </div>
        </>
    );
};

export default RolesPage;