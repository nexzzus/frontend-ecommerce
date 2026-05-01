import {
    FiHome,
    FiLock,
} from 'react-icons/fi'
import {UsersIcon, ShieldCheckIcon, KeyIcon, Squares2X2Icon} from "@heroicons/react/24/outline";

const iconMap = {
    UsersIcon: UsersIcon,
    RolesIcon: ShieldCheckIcon,
    PermissionsIcon: KeyIcon,
    CategoriesIcon: Squares2X2Icon,
    NotFoundIcon: FiLock,
}

export const getIcon = (iconName) => {
    return iconMap[iconName] || FiHome
}