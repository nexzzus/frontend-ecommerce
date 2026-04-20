import {
    FiHome,
    FiEdit,
    FiCreditCard,
    FiBarChart2,
    FiSquare,
    FiBox,
    FiTable,
    FiCopy,
    FiLogIn,
    FiUserCheck,
    FiLock,
} from 'react-icons/fi'
import {CiUser} from "react-icons/ci";
import {AiOutlineProduct} from "react-icons/ai";
import {MdOutlineCategory} from "react-icons/md";

const iconMap = {
    UsersIcon: CiUser,
    ProductsIcon: AiOutlineProduct,
    CategoriesIcon: MdOutlineCategory ,
    FormsIcon: FiEdit,
    CardsIcon: FiCreditCard,
    ChartsIcon: FiBarChart2,
    ButtonsIcon: FiSquare,
    ModalsIcon: FiBox,
    TablesIcon: FiTable,
    PagesIcon: FiCopy,
    LoginIcon: FiLogIn,
    CreateAccountIcon: FiUserCheck,
    NotFoundIcon: FiLock,
}

export const getIcon = (iconName) => {
    return iconMap[iconName] || FiHome
}