import dynamic from "next/dynamic";
import Link from "next/link";

const DeletePurchases = dynamic(
  () => import("../(deletePurchases)/DeletePurchases"),
  {
    ssr: false,
    loading() {
      return <span className="loading loading-spinner" />;
    },
  }
);

const DownloadFile = dynamic(() => import("@/components/DownloadFile"), {
  ssr: false,
  loading() {
    return <span className="loading loading-dots" />;
  },
});

interface Purchase {
  _id: string;
  billFile: string;
  amount: string;
  createdAt: string;
  user: { username: string; _id: string };
  addedBy: { username: string };
}

interface GetPurchasesProps {
  purchase: Purchase[];
}

const Purchases: React.FC<GetPurchasesProps> = ({ purchase }) => {
 
  return (
    <div className="h-full">
      <div className="overflow-x-auto">
        <table className="table align-middle rounded-md bg-gray-800 p-1">
          <thead>
            <tr className="text-white text-[0.9rem]">
              <th>Bill</th>
              <th>Amount</th>
              <th>Purchase Date</th>
              <th>Buyer</th>
              <th>Record Added by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchase.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-900 transition-all duration-200  border-none"
              >
                <td>
                  <DownloadFile
                    url={item.billFile}
                    fileName={`bill of ${item.amount}`}
                  />
                </td>

                <td>
                  <Link href={`/admin-dashboard/customers/${item?.user?._id}`}>
                    {item?.amount}
                  </Link>
                </td>

                <td>
                  <Link href={`/admin-dashboard/customers/${item?.user?._id}`}>
                    {new Date(item?.createdAt).toDateString()}
                  </Link>
                </td>
                <td>
                <Link href={`/admin-dashboard/customers/${item?.user?._id}`}>

                  {item?.user?.username}
                </Link>
                  </td>
                <td className="font-bold">{item?.addedBy?.username}</td>
                <td>
                  <DeletePurchases id={item._id} url={item.billFile} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchases;
