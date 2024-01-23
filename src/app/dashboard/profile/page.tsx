import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "@/app/api/auth/[...nextauth]/options";

const UpdateProfile = dynamic(()=>import('./(update-profile)/UpdateProfile'))

const fetchProfile = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/business-customer`, {
    headers : new Headers(headers()),
  });
  const apiResponse = await res.json();
  return apiResponse;
};

const page = async () => {
  const apiResponse = await fetchProfile();
  const session = await getServerSession(options);
 
  return (
    <div className="h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="flex justify-between flex-col-reverse md:flex-row bg-white rounded-b-md md:rounded-md sm:[95%] md:[w-90%] lg:w-[80%] h-full md:h-auto shadow-md: md:shadow-lg shadow-gray-200 overflow-hidden">
        
          <UpdateProfile profileData={apiResponse.profile}/>

          <div className="md:flex-1 bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center flex-col p-2 gap-2 text-gray-100 h-[20rem] md:h-[26rem] rounded-b-[5rem] md:rounded-l-[6.5rem] md:rounded-br-[0]">
            <div className="w-28 overflow-hidden rounded-full ">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  width={300}
                  height={300}
                  alt={session?.user.name || "update Your Profile"}
                  className="w-full object-fill "
                />
              )}
            </div>
            <h1 className="text-[1.3rem] font-medium tracking-wider">
              Hello, {session?.user?.name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
