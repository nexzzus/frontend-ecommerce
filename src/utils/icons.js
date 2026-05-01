import {
    FiHome,
    FiLock,
} from 'react-icons/fi'
import {UsersIcon, ShieldCheckIcon, KeyIcon, Squares2X2Icon, CubeIcon, TagIcon} from "@heroicons/react/24/outline";

const iconMap = {
    UsersIcon: UsersIcon,
    RolesIcon: ShieldCheckIcon,
    PermissionsIcon: KeyIcon,
    CategoriesIcon: Squares2X2Icon,
    ProductsIcon: CubeIcon,
    DiscountsIcon: TagIcon,
    NotFoundIcon: FiLock,
}

export const getIcon = (iconName) => {
    return iconMap[iconName] || FiHome
}