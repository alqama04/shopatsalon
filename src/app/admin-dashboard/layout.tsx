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
  if(session?.user?.role !== 'admin'){
    redirect('/')
  }
  return (
    <div className="flex flex-col md:flex-row items-start overflow-x-hidden">
      <div className="md:fixed">

      <AdminSdiebar />
      </div>
      <div className="w-full md:ml-64">
        {children}
        </div>
    </div>
  );
}
