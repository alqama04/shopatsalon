import React from 'react'
import BrandImage from './BrandImage'

const Brand = () => {
  return (
    <div className='my-5 mt-7 shadow-md'>
       <div className="select-none border-b-2 border-gray-200 w-full md:w-max m-auto  mb-4 px-4 pt-1 rounded-full shadow-sm ">
          <h1 className="text-center font-bold text-[1.8rem]">
            Our Brand Partners
          </h1>
         
        </div>

      <BrandImage/>
    </div>
  )
}

export default Brand