"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { adminSidebarMenu } from "@/constant/adminSidebarMenu";
import { usePathname } from "next/navigation";
import Logout from "@/app/authenticate/Logout";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const AdminSdiebar = () => {
  const { data: session } = useSession();
  const currentRoute = usePathname();

  const [DrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <div className={`md:hidden bg-white flex justify-between w-[100svw] px-2 py-0.5  ${DrawerOpen ? "hidden" : "block"}`}>
        <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="text-3xl font-bold"
        >
          <HiMenuAlt2 />
        </button>
        <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex justify-center items-center">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={40}
              height={40}
              className="object-fill"
            />
          ) : (
            <h1 className="uppercase font-bold text-gray-800 text-2xl">
              {session?.user.name.charAt(0)}a
            </h1>
          )}
        </div>
      </div>
      <div
        className={`drawer md:drawer-open ${DrawerOpen ? "drawer-open" : ""}`}
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <div className="w-screen md:w-64 pt-5 px-1 menu min-h-full h-full bg-gray-900 text-gray-100">
            <div className="flex flex-col items-center h-full">
              <button
                onClick={() => setDrawerOpen((prev) => !prev)}
                className="md:hidden absolute  left-0 top-0 m-2 w-max font-bold text-4xl"
              >
                <IoClose />
              </button>

              {session?.user?.image && (
                <Image
                  src={session?.user?.image!}
                  alt={session?.user?.name!}
                  width={80}
                  height={80}
                  className="rounded-full object-fill"
                />
              )}
              <h2 className="mt-2 text-[1.1rem]">{session?.user?.name}</h2>
              <p className="mt-1 text-gray-100 text-[0.8rem]">
                {session?.user?.name}
              </p>

              <div className="w-full mt-4 p-1.5">
                {adminSidebarMenu.map((item) => (
                  <Link
                    onClick={() => setDrawerOpen((prev) => !prev)}
                    key={item.name}
                    href={item.href}
                    className={`flex gap-2 items-center mt-4 capitalize tracking-wider text-[1rem]   py-[0.7rem] px-1 rounded-md
                    transition-all ease-in duration-150 delay-0  ${
                      currentRoute == item.href &&
                      "shadow-gray-700 shadow-md border-l-[8px] border-gray-300"
                    }`}
                  >
                    <item.icon
                      size="25"
                      style={{
                        color: `${item.iconColor}`,
                      }}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="m-auto w-full p-2">
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSdiebar;
