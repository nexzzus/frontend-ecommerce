import {useTheme} from '../../context/useTheme.js';
import {PencilIcon, TrashIcon} from '@heroicons/react/24/outline';

function UserTable({users, onEdit, onDelete}) {
    const {theme} = useTheme();

    const getRoleColor = (role) => {
        switch (role) {
            case "ADMIN":
                return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            case "USER":
                return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            default:
                return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        }
    }

    const tableHeaderClass = theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900';

    const tableRowClass = theme === 'dark' ? 'border-b border-gray-600 hover:bg-gray-700' : 'border-b border-gray-200 hover:bg-gray-50';

    const cellClass = `px-4 sm:px-6 py-3 sm:py-4 text-sm`;

    const cellColor = `${cellClass} ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
    }`;

    return (<div className="w-full overflow-x-auto rounded-lg border"
                 style={{borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'}}>
        <table className="w-full text-left">
            <thead>
            <tr className={tableHeaderClass}>
                <th className={`${cellClass} font-semibold whitespace-nowrap`}>Nombre</th>
                <th className={`${cellClass} font-semibold whitespace-nowrap`}>Apellido</th>
                <th className={`${cellClass} font-semibold whitespace-nowrap`}>Email</th>
                <th className={`${cellClass} font-semibold whitespace-nowrap`}>Teléfono</th>
                <th className={`${cellClass} font-semibold whitespace-nowrap`}>Rol</th>
                <th className={`${cellClass} font-semibold whitespace-nowrap text-center`}>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {users && users.length > 0 ? (users.map((user, i) => (<tr key={i} className={tableRowClass}>
                <td className={cellColor}>
                    <p className="font-semibold truncate">{user.first_name}</p>
                </td>
                <td className={cellColor}>
                    <p className="truncate">{user.last_name}</p>
                </td>
                <td className={cellColor}>
                    <p className="truncate text-xs sm:text-sm">{user.email}</p>
                </td>
                <td className={cellColor}>
                    <p className="truncate text-xs sm:text-sm">{user.phone || '-'}</p>
                </td>
                <td className={cellColor}>
                    {user.roles && user.roles.length > 0 ? user.roles.map((r) => (<span
                        key={r.id}
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(r.name)}`}
                    >
                                                {r.name}
                                            </span>)) : <span className="text-xs text-gray-500">Sin rol</span>}
                </td>
                <td className={`${cellClass} text-center`}>
                    <div className="flex gap-2 justify-center flex-wrap">
                        <button
                            onClick={() => onEdit(user)}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                            title="Editar usuario"
                        >
                            <PencilIcon className="h-4 w-4"/>
                        </button>
                        <button
                            onClick={() => onDelete && onDelete(user.id)}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                            title="Eliminar usuario"
                        >
                            <TrashIcon className="w-4 h-4"/>
                        </button>
                    </div>
                </td>
            </tr>))) : (<tr>
                <td colSpan="6" className={`${cellClass} text-center py-8`}>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        No hay usuarios registrados
                    </p>
                </td>
            </tr>)}
            </tbody>
        </table>
    </div>)
}

export default UserTable