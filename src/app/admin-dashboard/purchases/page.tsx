import Link from "next/link";
import React from "react";
import FetchPurchases from "./(getPurchases)/FetchPurchases";

const page = () => {
  return (
    <div>
      <Link href="/admin-dashboard/purchases/add-purchase-record">
        create Record
      </Link>
      <FetchPurchases />
    </div>
  );
};

export default page;
