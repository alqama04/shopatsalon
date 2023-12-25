"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { IoIosClose } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
 

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const FilterPurchases = () => {
  const router = useRouter();
  const pathname = usePathname();
 
  const [fromDate, setFromDate] = useState<Value>();
  const [toDate, setToDate] = useState<Value>(new Date());

  useEffect(()=>{
    getRecords()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[toDate,fromDate])

  const getRecords = () => {
    if (fromDate && toDate) {
      const from = Array.isArray(fromDate) ? fromDate[0] : fromDate;
      const to = Array.isArray(toDate) ? toDate[1] : toDate;   
      router.push(`${pathname}?from=${from}&to=${to}`);
    }
  };

  return (
    <div className="flex  p-2 gap-2 mb-2 items-end  ">
      
      <div>
        <p className="pl-2 font-medium">From</p>
        <div>
          <DatePicker
            onChange={(date)=>setFromDate(date)}
            value={fromDate}
            calendarIcon={SlCalender}
            clearIcon={IoIosClose}
            required={true}
            returnValue={"range"}
            yearPlaceholder={"YY"}
            monthPlaceholder={"MM"}
            dayPlaceholder={"DD"} 
            
          />
        </div>
      </div>
      <div>
        <p className="pl-2 font-medium">To</p>
        <DatePicker
          onChange={setToDate}
          value={toDate}
          calendarIcon={SlCalender}
          clearIcon={IoIosClose}
          required={true}
          returnValue={"range"}
          yearPlaceholder={"YY"}
          monthPlaceholder={"MM"}
          dayPlaceholder={"DD"}
        />
      </div>
 
    </div>
  );
};

export default FilterPurchases;
