import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { Skeleton } from "@/components/Skeleton";

const Search = dynamic(()=>import('@/components/Search'))
const Pagination = dynamic(()=>import('@/components/Pagination'))

const Purchases = dynamic(() => import("./Purchases"), {
  loading() {
    return (
      <div>
        <Skeleton />
      </div>
    );
  },
});


const FetchPurchases = async ({searchParams}:any) => {
 

  let purchases = [];
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/purchases/admin?`, {
      headers: new Headers(headers()),
    });
    if (res.ok) {
      purchases = await res.json();
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="min-h-[100svh] h-full flex flex-col  p-2">
      <div className="flex-1 h-full">
        <div className="my-1 text-black">
          <Search placeholder="search Customer purchase" />
        </div>
        {purchases.length ? (
          <Purchases purchase={purchases} />
        ) : (
          <h2 className="text-center">0 Records found</h2>
        )}
      </div>

      <div className="my-auto">
        <Pagination />
      </div>
    </div>
  );
};

export default FetchPurchases;
