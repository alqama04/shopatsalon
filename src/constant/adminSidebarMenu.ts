import { TbLayoutDashboard } from "react-icons/tb";
import { CiMemoPad } from "react-icons/ci";
import { GiNotebook } from "react-icons/gi";
import { SiLevelsdotfyi } from "react-icons/si";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";

export const adminSidebarMenu = [
    {
        name: "Dashboard",
        icon: TbLayoutDashboard,
        iconColor: "#98FB98",
        href: "/admin-dashboard"
    },
    
    {
        name: "orders",
        icon: GiNotebook,
        iconColor: "#800080",
        href: "/admin-dashboard/orders"
    },
    {
        name: "customers",
        icon: FaUsers,
        iconColor: "#FF004D",
        href: "/admin-dashboard/customers"
    },

   
    {
        name: "Reward",
        icon: PiMedalMilitaryFill,
        iconColor: "#FFB534",
        href: "/admin-dashboard/reward"
    },
    {
        name: "Levels",
        icon: SiLevelsdotfyi,
        iconColor: "#800080",
        href: "/admin-dashboard/levels"
    },
    {
        name: "Purchase Records",
        icon: CiMemoPad,
        iconColor: "#D3D3D3",
        href: "/admin-dashboard/purchases"
    },
]