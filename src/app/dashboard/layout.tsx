import React from "react";
import UserSidebar from "@/components/sidebar/UserSidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import BusinessCustomer from "./BusinessCustomer";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if(!session) redirect('/authenticate')
  
  if (!session?.user?.business_customer) return <BusinessCustomer />;

  return (
    <div className="flex flex-col md:flex-row items-start overflow-x-hidden">
      <UserSidebar />
      <div className="bg-white w-full h-full">{children}</div>
    </div>
  );
}
