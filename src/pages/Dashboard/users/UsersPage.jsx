import React, {useEffect} from 'react';
import {getUsers, deleteUser} from "../../../services/userService.js";
import UserForm from "../../../components/users/UserForm.jsx";
import UserTable from "../../../components/users/UserTable.jsx";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import { useTheme } from '../../../context/useTheme.js';
import { XMarkIcon } from '@heroicons/react/24/outline';

const UsersPage = () => {
    const { theme } = useTheme();
    const [users, setUsers] = React.useState([]);
    const [editingUser, setEditingUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const fetchUsers = async () => {
        const res = await getUsers()
        setUsers(res)
    }

    useEffect(() => {
        fetchUsers()
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
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
            try {
                await deleteUser(id);
                // Actualizar la lista de usuarios
                await fetchUsers();
                alert('Usuario eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                alert('Error al eliminar el usuario. Por favor intenta de nuevo.');
            }
        }
    }
    
    return (
        <>
            <Dialog open={open} onClose={handleCloseModal} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className={`relative transform overflow-hidden rounded-xl shadow-2xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 ${
                                theme === 'dark' 
                                    ? 'bg-gray-800 border border-gray-700' 
                                    : 'bg-white'
                            }`}
                        >
                            {/* Header */}
                            <div className={`px-6 py-4 flex items-center justify-between border-b ${
                                theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                            }`}>
                                <DialogTitle as="h3" className={`text-lg font-bold ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {modalTitle}
                                </DialogTitle>
                                <button
                                    onClick={handleCloseModal}
                                    className={`rounded-lg p-1 transition-colors ${
                                        theme === 'dark'
                                            ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                                            : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-4">
                                <UserForm
                                    fetchUsers={fetchUsers}
                                    editingUser={editingUser}
                                    setEditingUser={setEditingUser}
                                    onClose={handleCloseModal}
                                />
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <div className="w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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
};

export default UsersPage;