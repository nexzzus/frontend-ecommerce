import React, {useEffect} from 'react';
import {getUsers, deleteUser} from "../../../services/userService.js";
import UserForm from "../../../components/users/UserForm.jsx";
import UserTable from "../../../components/users/UserTable.jsx";
import {useThemeStyles} from "../../../context/useThemeStyles.js";
import Modal from "../../../components/Modal.jsx";
import {toast} from "sonner";
import Swal from "sweetalert2";

const UsersPage = () => {
        const styles = useThemeStyles()
        const [users, setUsers] = React.useState([]);
        const [editingUser, setEditingUser] = React.useState(null);
        const [open, setOpen] = React.useState(false);

        const fetchUsers = async () => {
            const res = await getUsers()
            setUsers(res)
        }

        useEffect(() => {
            const loadUsers = async () => {
                await fetchUsers()
            }
            loadUsers()
        }, [])

        const handleOpenModal = () => {
            setEditingUser(null);
            setOpen(true);
        }

        const handleEditUser = (user) => {
            setEditingUser(user);
            setOpen(true);
        }

        const handleCloseModal = () => {
            setOpen(false);
            setEditingUser(null);
        }

        const modalTitle = editingUser?.id ? `Editar Usuario: ${editingUser.first_name} ${editingUser.last_name}` : "Nuevo Usuario";

        const handleDelete = async (id) => {
            const result = await Swal.fire({
                title: "¿Eliminar?",
                text: "No podrás revertir esto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
            });
            try {
                if (result.isConfirmed) {
                    await deleteUser(id)
                    toast.success("Permiso eliminado correctamente")
                    await fetchUsers()
                }
            } catch
                (error) {
                console.error('Error al eliminar usuario:', error);
                toast.error("Error al eliminar el usuario. Por favor intenta de nuevo.");
            }
        }


        return (
            <>
                <Modal open={open} onClose={handleCloseModal} title={modalTitle}>
                    <UserForm
                        fetchUsers={fetchUsers}
                        editingUser={editingUser}
                        setEditingUser={setEditingUser}
                        onClose={handleCloseModal}
                    />
                </Modal>

                <div className="w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <h1 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary}`}>
                            Gestión de Usuarios
                        </h1>
                        <button
                            onClick={handleOpenModal}
                            className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                        >
                            + Nuevo Usuario
                        </button>
                    </div>

                    <UserTable
                        users={users}
                        onEdit={handleEditUser}
                        onDelete={handleDelete}
                    />
                </div>
            </>
        )
    }
;

export default UsersPage;