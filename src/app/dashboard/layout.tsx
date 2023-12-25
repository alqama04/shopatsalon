import React from "react";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import BusinessProfile from "./BusinessProfiles";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  
  if (session && !session?.user?.business_customer) return <BusinessProfile />;

  return (
    <div className="flex flex-col md:flex-row items-start overflow-x-hidden">
      <div className="md:fixed">

      <UserSidebar />
      </div>
      <div className="w-full min-h-screen h-full md:ml-64">
        {children}
        </div>
    </div>
  );
}
