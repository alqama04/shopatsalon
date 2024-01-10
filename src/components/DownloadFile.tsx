import { getDownloadUrl } from "@edgestore/react/utils";
import { IoMdCloudDownload } from "react-icons/io";

interface DownloadProps {
  url: string;
  fileName?: string;
  iconSize?:number
}

const DownloadFile = async({ url, fileName,iconSize=30 }: DownloadProps) => {
  const fileFormate = url.slice(-5).split('.')[1]
  let downloadUrl
    try {
      const getUrl = getDownloadUrl(url, `${fileName}.${fileFormate}`);
      downloadUrl = getUrl
    } catch (error) {
      console.log("Error downloading file", error)
    }

  return (
    <div>
      {downloadUrl &&
        <a href={downloadUrl} download={fileName}  className="flex flex-col" title="download">
        <IoMdCloudDownload  size={iconSize}/>
      </a>
      }
    </div>
  );
};

export default DownloadFile;
