import React from "react";
import { services } from "@/constant/services";

const Services = () => {
  const splitIndex = Math.round(services.length / 2);
  const [firstHalf, secondHalf] = [services.slice(0, splitIndex), services.slice(splitIndex)];

 
  return (
    <div className="mt-10 shadow-xl h-full">
      <div>
        <div className="border-b-2 border-gray-200 w-full md:w-max m-auto px-4 pt-1 rounded-full shadow-sm ">
          <h1 className="text-center font-bold text-[1.4rem]">
            KNOW WHY IT IS SMARTER TO CHOOSE US!
          </h1>
          <p className="text-center text-[0.9rem]">THERES NOTHING LIKE US!</p>
        </div>

        <div className="md:w-[95%] lg:w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-1 mt-5 md:mt-8">
          {[firstHalf, secondHalf].map((half, index) => (
            <div className="flex flex-col gap-3" key={index}>
              {half.map((item) => (
                <div key={item.title}>
                  <div className="collapse rounded-sm transition ease-in-out delay-150 bg-white p-1">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title flex justify-between items-center px-2">
                      <h1 className="tracking-wider font-semibold">{item.title}</h1>
                      
                      <span className="rounded-full bg-gray-200 scale-125 p-1.5">
                        
                        <item.icon className="text-[1.2rem] stroke-1"
                        style={{
                          color:item.iconColor
                        }}
                        />
                      </span>

                    </div>
                    <div className="collapse-content peer-checked:bg-gray-100">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
