import SidebarContent from "./SidebarContent.jsx";
import {useSidebar} from "../../context/SidebarContextCreate.js";

const MobileSidebar = () => {
    const {isSidebarOpen, closeSidebar} = useSidebar()

    if (!isSidebarOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={closeSidebar}
                className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Sidebar */}
            <aside
                className="fixed inset-y-0 z-50 w-64 mt-16 bg-white dark:bg-gray-800 transform transition-transform duration-300">
                <SidebarContent/>
            </aside>
        </>
    )
}

export default MobileSidebar;