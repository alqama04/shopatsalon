 
import CustomDatePicker from "@/components/CustomDatePicker";
import DownloadFile from "@/components/DownloadFile";
import { CiFilter } from "react-icons/ci";
import DeletePurchases from "../(deletePurchases)/DeletePurchases";

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
      <div className="flex justify-between p-2">
        <CustomDatePicker />

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <CiFilter />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
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
