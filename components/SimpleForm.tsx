'use client';
import DateTimeRangeSelector from "@/components/DateTimeRangeSelector";
import React from "react";
import {DateRange} from "react-day-picker";
import {Button} from "@/components/ui/button";

const SimpleForm = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const onSubmit = () => {
    console.log('date value: ', dateRange)
  }
  return (
    <div className="flex flex-col h-screen w-full p-12 max-w-4xl">
      <div className="space-y-4 bg-slate-800 p-6 flex-col flex-wrap relative">
        <div className="text-lg font-medium">Simple date form</div>
        <form onSubmit={onSubmit} className="space-y-8">
          <DateTimeRangeSelector onChange={setDateRange} value={dateRange}/>
        </form>
        <Button onClick={onSubmit}>Update details</Button>
        <div className="bg-slate-900 text-xs font-mono rounded border absolute -top-10 right-4 p-3">
          Date value: {JSON.stringify(dateRange)}
        </div>
      </div>
    </div>
  )
}

export default SimpleForm