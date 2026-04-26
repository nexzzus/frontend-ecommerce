import {useTheme} from '../../context/useTheme.js';
import {PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useThemeStyles} from "../../context/useThemeStyles.js";
import Button from "../Button.jsx";

function UserTable({users, onEdit, onDelete}) {
    const {theme} = useTheme();
    const styles = useThemeStyles()

    const getRoleColor = (role) => {
        return styles.roleColors[role] || styles.roleColors.DEFAULT
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg border"
             style={{borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'}}>
            <table className="w-full text-left">
                <thead>
                <tr className={styles.tableHeaderClass}>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Nombre</th>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Apellido</th>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Email</th>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Teléfono</th>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap`}>Rol</th>
                    <th className={`${styles.cellClass} font-semibold whitespace-nowrap text-center`}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 ? (users.map((user, i) => (<tr key={i} className={styles.tableHeaderClass}>
                    <td className={styles.cellColor}>
                        <p className="font-semibold truncate pl-6">{user.first_name}</p>
                    </td>
                    <td className={styles.cellColor}>
                        <p className="truncate">{user.last_name}</p>
                    </td>
                    <td className={styles.cellColor}>
                        <p className="truncate text-xs sm:text-sm">{user.email}</p>
                    </td>
                    <td className={styles.cellColor}>
                        <p className="truncate text-xs sm:text-sm">{user.phone || '-'}</p>
                    </td>
                    <td className={styles.cellColor}>
                        {user.roles && user.roles.length > 0 ? user.roles.map((r) => (<span
                            key={r.id}
                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(r.name)}`}
                        >
                                                {r.name}
                                            </span>)) : <span className="text-xs text-gray-500">Sin rol</span>}
                    </td>
                    <td className={`${styles.cellClass} text-center`}>
                        <div className="flex gap-2 justify-center flex-wrap">
                            <Button
                                onClick={() => onEdit(user)}
                                variant={"edit"}
                                title="Editar usuario"
                                icono={PencilIcon}
                            >
                            </Button>
                            <Button
                                onClick={() => onDelete && onDelete(user.id)}
                                variant={"delete"}
                                title="Eliminar usuario"
                                icono={TrashIcon}
                            >
                            </Button>
                        </div>
                    </td>
                </tr>))) : (<tr>
                    <td colSpan="6" className={`${styles.cellClass} text-center py-8`}>
                        <p className={styles.textSecondary}>
                            No hay usuarios registrados
                        </p>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>)
}

export default UserTable