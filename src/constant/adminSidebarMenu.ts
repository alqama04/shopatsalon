import { TbLayoutDashboard } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiMemoPad } from "react-icons/ci";

export const adminSidebarMenu = [
    {
        name: "Dashboard",
        icon: TbLayoutDashboard,
        iconColor: "#98FB98",
        href: "/admin-dashboard"
    },
    {
        name: "Levels",
        icon: IoHomeOutline,
        iconColor: "#800080",
        href: "/admin-dashboard/levels"
    },
    {
        name: "profile",
        icon: FaRegCircleUser,
        iconColor: "#4169E1",
        href: "/admin-dashboard/profile"
    },
    {
        name: "Purchase Records",
        icon: CiMemoPad,
        iconColor: "#D3D3D3",
        href: "/admin-dashboard/purchases"
    },
]