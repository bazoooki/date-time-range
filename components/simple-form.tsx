'use client';
import DateTimeRangeSelector from "@/components/date-time-range-selector";
import React, {useState} from "react";
import {addDays} from "date-fns";
import {DateRange} from "react-day-picker";

const SimpleForm = () => {
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: addDays(today, -3),
    to: today,
  })
  return (
    <div className="flex flex-col h-screen w-full p-12 max-w-4xl">
      SimpleForm
      <div>
        <DateTimeRangeSelector onChange={setDateRange} value={dateRange}/>
      </div>
    </div>
  )
}

export default SimpleForm