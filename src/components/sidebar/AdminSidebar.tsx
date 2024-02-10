"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { adminSidebarMenu } from "@/constant/adminSidebarMenu";
import { usePathname } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Logout = dynamic(() => import("@/app/authenticate/Logout"), {
  loading: () => {
    return <span>loading...</span>;
  },
});

const AdminSdiebar = () => {
  const { data: session } = useSession();
  const currentRoute = usePathname();

  const [DrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="h-full bg-gray-900">
      <div
        className={`md:hidden flex justify-between w-[100svw] px-2 py-0.5  ${
          DrawerOpen ? "hidden" : "block"
        }`}
      >
        <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="text-3xl font-bold text-white"
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
              {session?.user.name.charAt(0)}
            </h1>
          )}
        </div>
      </div>
      <div
        className={`drawer md:drawer-open ${DrawerOpen ? "drawer-open" : ""}`}
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <div className="w-screen md:w-64 pt-5 px-1 menu min-h-full h-full text-gray-100">
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
                {session?.user?.role}
              </p>

              <div className="w-full mt-2.5 p-1.5">
                {adminSidebarMenu.map((item) => (
                  <div
                    key={item.name}
                    className={` 
                    flex gap-1 items-center mt-3 capitalize tracking-wider text-[1rem] py-[0.7rem] px-1 rounded-md
                      transition-all ease-in duration-150 delay-0 
                    ${
                      currentRoute == item.href ||
                      (currentRoute === item.create?.href &&
                        "shadow-gray-700 shadow-md border-l-[6px] border-gray-300")
                    }`}
                  >
                    <Link
                      onClick={() => setDrawerOpen((prev) => !prev)}
                      key={item.name}
                      href={item.href}
                      className="flex-1 flex gap-2 items-center capitalize tracking-wider text-[1rem]"
                    >
                      <item.icon
                        size="25"
                        style={{
                          color: `${item.iconColor}`,
                        }}
                      />
                      {item.name}
                    </Link>

                    {item.create ? (
                      <Link
                        onClick={() => setDrawerOpen((prev) => !prev)}
                        href={item.create.href}
                        className="rounded-full shadow-lg"
                      >
                        <item.create.icon
                          size="25"
                          style={{
                            color: `${item.iconColor}`,
                          }}
                        />
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
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
