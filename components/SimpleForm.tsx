'use client';
import DateTimeRangeSelector from "@/components/DateTimeRangeSelector";
import {useState} from "react";

const SimpleForm = () => {
  const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]) // [startDate, endDate
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