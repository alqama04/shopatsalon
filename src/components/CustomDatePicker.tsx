import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { IoIosClose } from "react-icons/io";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomDatePicker = () => {
  const [date, setDate] = useState<Value>(new Date());

  return (
    <div>
      <div className="absolute z-10">
        <DatePicker
          onChange={setDate}
          value={date}
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

export default CustomDatePicker;
