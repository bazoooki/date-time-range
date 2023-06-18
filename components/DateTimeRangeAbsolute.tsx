import React from "react";
import {DateRange} from "react-day-picker";
import {Calendar} from "@/components/calender";
import {Input} from "@/components/ui/input";
import {format} from "date-fns";

interface DateTimeRangeAbsoluteProps {
  onChange: (value: DateRange | undefined) => void;
  value: DateRange | undefined;
}

const DateTimeRangeAbsolute: React.FC<DateTimeRangeAbsoluteProps> = ({onChange, value}) => {
  const today = new Date();
  const handleTimeChange = (val: string, isFrom: boolean) => {
    const date = isFrom ? new Date(value?.from || today) : new Date(value?.to || today)
    const [hours, minutes] = val.split(':')
    date.setHours(parseInt(hours))
    date.setMinutes(parseInt(minutes))
    updateDateRange(date, isFrom)
  }
  const updateDateRange = (date: Date, isFrom: boolean) => {
    const val = isFrom ? {from: date, to: value?.to} : {from: value?.from, to: date}
    onChange(val)
  }
  return (
    <div id="date-time-range-absolute" className="flex flex-col space-y-2 justify-center items-center">
      <Calendar
        initialFocus
        disabled={{after: today, before: new Date(today.getFullYear(), today.getMonth() - 24)}}
        mode="range"
        defaultMonth={value?.from || today}
        selected={value}
        onSelect={onChange}
        numberOfMonths={2}
      />
      <div className="flex items-center space-x-1.5 flex-wrap md:flex-nowrap">
        <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5">
          <label htmlFor="start-date" className="text-xs text-slate-600 pl-1">Start date</label>
          <Input
            type="date"
            pattern="[0-9]*"
            id="start-date"
            placeholder="YYYY/MM/DD"
            className="text-xs"
            value={value?.from ? format(value?.from, "yyyy-MM-dd") : ''}
            onChange={(e) => updateDateRange(new Date(e.target.value), true)}
          />
        </div>
        <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5">
          <label htmlFor="start-time" className="text-xs text-slate-600 pl-1">Start time</label>
          <Input
            type="time"
            pattern="[0-9]*"
            id="start-time"
            placeholder="hh:mm"
            className="text-xs"
            value={value?.from ? format(value?.from, "HH:mm") : ''}
            onChange={(e) => handleTimeChange(e.target.value, true)}
          />
        </div>
        <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5">
          <label htmlFor="end-date" className="text-xs text-slate-600 pl-1">End date</label>
          <Input
            type="date"
            pattern="[0-9]*"
            id="end-date"
            placeholder="YYYY/MM/DD"
            className="text-xs"
            value={value?.to ? format(value?.to, "yyyy-MM-dd") : ''}
            onChange={(e) => updateDateRange(new Date(e.target.value), false)}
          />
        </div>
        <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5">
          <label htmlFor="end-time" className="text-xs text-slate-600 pl-1">End time</label>
          <Input
            type="time"
            pattern="[0-9]*"
            id="end-time"
            placeholder="hh:mm"
            className="text-xs"
            value={value?.to ? format(value.to, "HH:mm") : ''}
            onChange={(e) => handleTimeChange(e.target.value, false)}
          />
        </div>
      </div>
    </div>
  )
}

export default DateTimeRangeAbsolute