import Image from "next/image";
import Link from "next/link";
import React from "react";

const ViewImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className=" ">
      <Link href={imageUrl} target="_blank">
        <Image
          src={imageUrl}
          width={600}
          height={500}
          alt="Order Image"
          className=""
        />
      </Link>
    </div>
  );
};

export default ViewImage;
