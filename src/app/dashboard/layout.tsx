import React from "react";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import BusinessProfile from "./BusinessProfiles";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (session && !session?.user?.business_customer) return <BusinessProfile />;

  return (
    <div className="flex h-full flex-col md:flex-row items-start overflow-x-hidden">
      <div className="md:fixed ">
        <UserSidebar
          name={session?.user.name || ""}
          image={session?.user.image || "Shop At salon"}
        />
      </div>
      <div className="w-full md:ml-64 md:border-l-2 border-gray-600 bg-gray-900 text-white">{children}</div>
    </div>
  );
}
