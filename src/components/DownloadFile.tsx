import { getDownloadUrl } from "@edgestore/react/utils";
import { IoMdCloudDownload } from "react-icons/io";

interface DownloadProps {
  url: string;
  fileName?: string;
}

const DownloadFile = async({ url, fileName }: DownloadProps) => {
  let downloadUrl
    try {
      const getUrl = await getDownloadUrl(url, `bill-of ${fileName}.pdf`);
      downloadUrl = getUrl
    } catch (error) {
      console.log("Error downloading file", error)
    }
 

  return (
    <div>
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
