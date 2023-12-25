import CustomDatePicker from "@/components/CustomDatePicker";
import DownloadFile from "@/components/DownloadFile";
import FilterPurchases from "./FilterPurchases";

interface Purchases {
  _id: string;
  billFile: string;
  amount: string;
  createdAt: string;
  addedBy: { username: string };
}

interface GetPurchasesProps {
  purchases: Purchases[];
  totalPurchasesCount: string;
}

const Purchases: React.FC<GetPurchasesProps> = ({
  purchases,
  totalPurchasesCount,
}) => {
 
  return (
    <div className="w-full min-h-[100svh] h-full">
      <h1
        className="font-semibold text-[1.2rem] pl-2 pt-2.5 pb-1">
        Total Records {totalPurchasesCount}
      </h1>

      <FilterPurchases/>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-[0.9rem] text-gray-700">
            <tr>
              <th>Invoice</th>
              <th>Amount</th>
              <th>Purchase Date</th>
              <th>Record Added by</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-[#f1f1f1] transition-all duration-200 hover:shadow-inner"
              >
                <td>
                  <DownloadFile
                    url={item.billFile}
                    fileName={`invoice of ${item.amount}`}
                  />
                </td>
                <td>Rs.{item?.amount}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>

                <td className="font-bold">{item?.addedBy?.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchases;
