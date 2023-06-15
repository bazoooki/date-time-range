'use client';
import DateTimeRangeSelector from "@/components/date-time-range-selector";
import React from "react";
import {DateRange} from "react-day-picker";

const SimpleForm = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  return (
    <div className="flex flex-col h-screen w-full p-12 max-w-4xl">
      {/*SimpleForm - {JSON.stringify(dateRange)}*/}
      <div>
        <DateTimeRangeSelector onChange={setDateRange} value={dateRange}/>
      </div>
    </div>
  )
}

export default SimpleForm