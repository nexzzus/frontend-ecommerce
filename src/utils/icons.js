import {
    FiHome,
    FiLock,
} from 'react-icons/fi'
import {UsersIcon, ShieldCheckIcon, KeyIcon} from "@heroicons/react/24/outline";

const iconMap = {
    UsersIcon: UsersIcon,
    RolesIcon: ShieldCheckIcon,
    PermissionsIcon: KeyIcon,
    NotFoundIcon: FiLock,
}

export const getIcon = (iconName) => {
    return iconMap[iconName] || FiHome
}