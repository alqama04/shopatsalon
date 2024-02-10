import React from "react"; 
import dynamic from "next/dynamic";

const AdminSdiebar = dynamic(()=>import('@/components/sidebar/AdminSidebar'))
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="relative flex flex-col md:flex-row items-start overflow-x-hidden">
      <div className="md:fixed fixed z-10 w-[100svw] md:w-auto overflow-hidden">
      <AdminSdiebar />
      </div>
      <div className="mt-11 md:mt-0 w-full md:ml-64 bg-gray-900 text-white md:border-l-[0.5px]">
        {children}
        </div>
    </div>
  );
}
