import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Help = dynamic(()=>import('@/components/Help'))
const UserSidebar = dynamic(()=>import('@/components/sidebar/UserSidebar'))
const BusinessProfile = dynamic(()=>import('./BusinessProfiles'))

export const metadata: Metadata = {
  title: 'Dashboard',
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (session && !session?.user?.business_customer) return <BusinessProfile />;

  return (
    <div className="flex h-full flex-col md:flex-row items-start overflow-x-hidden">

      <div className="md:fixed fixed z-10 w-[100svw] md:w-auto overflow-hidden">
        <UserSidebar
          name={session?.user.name || ""}
          image={session?.user.image || "Shop At salon"}
          role={session?.user.role}
        />
      </div>

      <div className="mt-10 md:mt-0 w-full md:ml-64 md:border-l-2 border-gray-600 bg-gray-900 text-white">
        {children}
      </div>

        <div className="absolute z-10 right-6 bottom-1">
        <Help/>
      </div>
    </div>
  );
}
