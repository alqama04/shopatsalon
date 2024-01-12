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
      <div className="md:fixed h-full">
      <AdminSdiebar />
      </div>
      <div className="w-full md:ml-64 bg-gray-900 text-white md:border-l-[0.5px]">
        {children}
        </div>
    </div>
  );
}
