import dynamic from "next/dynamic";
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
  user: { username: string };
  addedBy: { username: string };
}

interface GetPurchasesProps {
  purchase: Purchase[];
}

const Purchases: React.FC<GetPurchasesProps> = ({ purchase }) => {
  return (
    <div className="w-full min-h-screen h-full ">
  
      <div className="overflow-x-auto">
        <table className="table">
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
              <tr key={item._id}>
                <td>
                  <DownloadFile
                    url={item.billFile}
                    fileName={`bill of ${item.amount}`}
                  />
                </td>
                <td>{item?.amount}</td>
                <td>{item?.createdAt}</td>
                <td>{item?.user?.username}</td>
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
