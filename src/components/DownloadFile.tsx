import { getDownloadUrl } from "@edgestore/react/utils";
import { IoMdCloudDownload } from "react-icons/io";
import ToastMsg from "./ToastMsg";

interface DownloadProps {
  url: string;
  fileName?: string;
}

const DownloadFile = async({ url, fileName }: DownloadProps) => {
  let downloadUrl
  let message=''
    try {
      const getUrl = await getDownloadUrl(url, `bill-of ${fileName}.pdf`);
      downloadUrl = getUrl
    } catch (error) {
      message = "Error retrieving download URL"
    }
 

  return (
    <div>
      <ToastMsg message={message} toastType="alert-error"/>
      {downloadUrl &&
        <a href={downloadUrl} download={fileName}  className="flex flex-col">
        <IoMdCloudDownload  size={25}/>
        <span className="text-[0.8rem] capitalize">{fileName}</span>
      </a>
      }
    </div>
  );
};

export default DownloadFile;
