import Link from "next/link";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";

const FetchPurchases = dynamic(()=>import("./(getPurchases)/FetchPurchases"),{
  loading(){
    return <div><Skeleton/></div>;
  }
})


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
