import React from 'react'
import {termsCondition} from '@/constant/termsCondition'

const page = () => {
  return (
    <div className=" ">
      <div className="px-1 md:px-10 lg:px-12 xl:px-20">
        <div className="bg-white px-1 md:px-2 rounded-md shadow-md py-4">
          <h1 className="font-medium tracking-wider text-[1.2rem]">
          Terms & Conditions:-
          </h1>
           <ol>
            {termsCondition.map((item,i)=>(
              <li key={i} className='my-2'>
                <h1 className='font-semibold'>{i+1}- {item.heading}</h1>
                {item.content.map((content,i)=>(
                  <p key={i} className='pl-0.5'>{content}</p>
                ))}
              </li>
            ))}
            
           </ol>
           
 
       
        </div>
      </div>
    </div>
  )
}

export default page