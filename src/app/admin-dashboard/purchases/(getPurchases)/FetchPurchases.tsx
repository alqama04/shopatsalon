import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { Skeleton } from "@/components/Skeleton";

const Purchases = dynamic(() => import("./Purchases"), {
  loading() {
    return (
      <div>
        <Skeleton />
      </div>
    );
  },
});

const FetchPurchases = async () => {
  let purchases:any = [];
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/purchases/admin`, {
      headers: headers(),
    });
    if (res.ok) {
      purchases = await res.json();
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {purchases.length ? (
        <Purchases purchase={purchases} />
      ) : (
        <h2 className="text-center">0 Records found</h2>
      )}
    </div>
  );
};

export default FetchPurchases;
