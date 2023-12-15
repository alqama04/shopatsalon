import React from "react";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import { redirect } from "next/navigation";
import AdminSdiebar from "@/components/sidebar/AdminSidebar";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
 
  return (
    <div className="flex flex-col md:flex-row items-start overflow-x-hidden">
      <AdminSdiebar />
      <div className="bg-white w-full h-full">
        {children}
        </div>
    </div>
  );
}
