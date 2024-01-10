import React from "react"; 
import AdminSdiebar from "@/components/sidebar/AdminSidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex flex-col md:flex-row items-start overflow-x-hidden">
      <div className="md:fixed">

      <AdminSdiebar />
      </div>
      <div className="w-full md:ml-64 bg-gray-900 text-white border-l-[0.5px]">
        {children}
        </div>
    </div>
  );
}
