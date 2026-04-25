import React from 'react';
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {useTheme} from "../context/useTheme.js";
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({children, open, onClose, title}) => {
    const {theme} = useTheme();
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
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
                                {title}
                            </DialogTitle>
                            <button
                                onClick={onClose}
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
                            {children}
                            {/*<UserForm*/}
                            {/*    fetchUsers={fetchUsers}*/}
                            {/*    editingUser={editingUser}*/}
                            {/*    setEditingUser={setEditingUser}*/}
                            {/*    onClose={handleCloseModal}*/}
                            {/*/>*/}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;