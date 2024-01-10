import { TbLayoutDashboard } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiMemoPad } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";

export const userSidebarMenu = [
    {
        name: "Dashboard",
        icon: TbLayoutDashboard,
        iconColor: "#98FB98",
        href: "/dashboard"
    },
    {
        name: "Place Order",
        icon: GiNotebook,
        iconColor: "#800080",
        href: "/dashboard/orders/place-orders"
    },
    {
        name: "Recent Orders",
        icon: FaHistory,
        iconColor: "#FCE883",
        href: "/dashboard/orders"
    },
    {
        name: "profile",
        icon: FaRegCircleUser,
        iconColor: "#4169E1",
        href: "/dashboard/profile"
    },
    {
        name: "Purchase Records",
        icon: CiMemoPad,
        iconColor: "#D3D3D3",
        href: "/dashboard/purchases"
    },
]