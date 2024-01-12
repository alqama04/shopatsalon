import { TbLayoutDashboard } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiMemoPad } from "react-icons/ci";
import { GiNotebook } from "react-icons/gi";
import { SiLevelsdotfyi } from "react-icons/si";
import { PiMedalMilitaryFill } from "react-icons/pi";


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
        iconColor: "##800080",
        href: "/admin-dashboard/orders"
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