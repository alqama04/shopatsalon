import Link from "next/link";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
import { headers } from "next/headers";

const Purchases = dynamic(() => import("./(getPurchases)/Purchases"), {
  loading() {
    return <Skeleton />;
  },
});

const Search = dynamic(() => import("@/components/Search"), {
  loading() {
    return <p>loading...</p>;
  },
});

const Pagination = dynamic(() => import("@/components/Pagination"), {
  loading() {
    return <p>loading...</p>;
  },
});

const page = async ({ searchParams }: any) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;
  const phone = searchParams.phone;
  const email = searchParams.email;

  let queryStr = `page=${page}&limit=${limit}${phone ? `&phone=${phone}` : ""}${
    email ? `&email=${email}` : ""
  }`;

  let purchases = [];
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/purchases/admin?${queryStr}`,
      {
        headers: new Headers(headers()),
      }
    );
    if (res.ok) {
      purchases = await res.json();
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen h-full flex flex-col">
      <div className="flex-1">
        <Link
          className="btn btn-sm m-1"
          href="/admin-dashboard/purchases/add-purchase-record"
        >
          create Record
        </Link>

        <div className="m-1 text-black flex gap-2 w-full">
          <Search placeholder="search Customer purchase" />
        </div>

        {purchases.length ? (
          <Purchases purchase={purchases} />
        ) : (
          <h2 className="text-center">0 Records found</h2>
        )}
      </div>

      <div className="my-auto">
        <Pagination
          page={page}
          limit={limit}
          email={email}
          phone={phone}
          datatLen={purchases.length || 0}
        />
      </div>
    </div>
  );
};

export default page;
