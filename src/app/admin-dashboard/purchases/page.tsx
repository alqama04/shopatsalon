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
    <div className="min-h-screen h-full">
      <Link className="btn btn-sm m-2" href="/admin-dashboard/purchases/add-purchase-record">
        create Record
      </Link>
      <FetchPurchases />
    </div>
  );
};

export default page;
