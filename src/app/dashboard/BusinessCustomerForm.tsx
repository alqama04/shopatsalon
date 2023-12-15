import React, { Dispatch, SetStateAction } from "react";

interface BusinessProfileFormProps {
  businessProfile: {
    display_name: string;
    gstIn: string;
    phone: string;
    address: string;
  };
  loading: boolean;
  setProfileData: Dispatch<
    SetStateAction<{
      display_name: string;
      gstIn: string;
      phone: string;
      address: string;
    }>
  >;
  handleBusinessProfile: () => void;
}

const BusinessCustomerForm: React.FC<BusinessProfileFormProps> = ({
  businessProfile,
  setProfileData,
  handleBusinessProfile,
  loading,
}) => (
  <>
    <div className="flex-1 flex md:justify-center items-center flex-col">
      <h1 className="mt-3 font-bold text-[1.4rem] text-center text-heading tracking-wider">
        Complete Your Profile
      </h1>

      <div className="px-2.5 md:px-10 md:mt-4">
        {Object.keys(businessProfile).map((item) => (
          <input
            type="text"
            key={item}
            value={businessProfile[item as keyof typeof businessProfile]}
            onChange={(e) =>
              setProfileData({ ...businessProfile, [item]: e.target.value })
            }
            placeholder={item.replace("_", " ")}
            className="w-full bg-[#F1F1F1] my-1.5 py-2.5 px-1 rounded-md shadow-md placeholder:capitalize outline-none focus:shadow-md transition-all duration-75 focus:border-l-4"
          />
        ))}

        <div className="text-center mt-4">
          {!loading ? (
            <button
              onClick={() => handleBusinessProfile()}
              className="btn bg-gray-800 font-normal text-gray-100 text-[1.4rem] tracking-wider w-1/2 hover:bg-gray-900 "
            >
              Save
            </button>
          ) : (
            <button className="btn bg-gray-800 font-normal text-gray-100 text-[1.4rem] tracking-wider w-1/2 hover:bg-gray-900 ">
              <span className="loading loading-dots loading-md"></span>
            </button>
          )}
        </div>
      </div>
    </div>
  </>
);

export default BusinessCustomerForm;
