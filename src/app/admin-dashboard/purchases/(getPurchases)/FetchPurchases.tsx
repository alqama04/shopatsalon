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
  let apiResponse;
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/purchases/admin`, {
      headers: headers(),
    });
    apiResponse = await res.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
  if (apiResponse.error || !apiResponse) {
    return (
      <div>
        <h1 className="text-center text-4xl font-bold mt-20">
          {apiResponse?.error || "unknown error Occured"}{" "}
        </h1>
      </div>
    );
  }
  return (
    <div>
      <Purchases purchase={apiResponse} />
    </div>
  );
};

export default FetchPurchases;
