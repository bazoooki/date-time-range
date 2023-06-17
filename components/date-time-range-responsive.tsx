import React, {useState} from "react";
import {RadioGroup} from "@headlessui/react";
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {DAYS, HOURS, MINUTES, MONTHS, WEEKS, YEARS} from "@/lib/time.constants";
import type {ResponsiveTimeRange} from "@/types/types";

interface DateTimeRangeResponsiveProps {
  onChange: (value: ResponsiveTimeRange) => void;
  value: ResponsiveTimeRange;
}

const timeRanges: ResponsiveTimeRange[] = [
  {value: '5_minutes', duration: 5, unit: MINUTES},
  {value: '1_hour', duration: 1, unit: HOURS},
  {value: '24_hours', duration: 24, unit: HOURS},
  {value: '3_days', duration: 3, unit: DAYS},
  {value: '1_week', duration: 1, unit: WEEKS},
  {value: '1_month', duration: 1, unit: MONTHS},
  {value: '2_years', duration: 2, unit: YEARS},
]
const DateTimeRangeResponsive: React.FC<DateTimeRangeResponsiveProps> = ({onChange, value}) => {

  const [responsiveRange, setResponsiveRange] = useState(value.value)

  const handleRangeSelected = (value: string) => {
    if (value === 'custom') {
      setResponsiveRange(value)
      onChange({duration: 1, unit: HOURS, value: 'custom'})
    } else {
      setResponsiveRange(value)
      const newRange = timeRanges.find(range => range.value === value)!
      onChange(newRange)
    }
  }

  return (
    <RadioGroup value={responsiveRange} onChange={handleRangeSelected} className="space-y-0.5 mt-1 px-1.5">
      <RadioGroup.Label className="text-xs font-medium">Choose a range</RadioGroup.Label>
      {timeRanges.map(range =>
        <RadioGroup.Option value={range.value} key={range.value}>
          {({checked}) => (
            <div
              className="flex items-center space-x-2.5 text-sm hover:text-teal-800 cursor-pointer inline-flex">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 border border-slate-300 ">
                {checked && <CheckCircleIcon className="w-4 h-4 text-teal-600"/>}
              </div>
              <div>{`Last ${range.duration} ${range.unit}`}</div>
            </div>
          )}
        </RadioGroup.Option>
      )}
      <RadioGroup.Option value="custom" key="custom">
        {({checked}) => (
          <div
            className="flex items-start space-x-1 text-sm hover:text-teal-800 cursor-pointer inline-flex">
            <div
              className="w-4 h-4 mt-1.5 rounded-full flex items-center justify-center bg-slate-100 border border-slate-300 ">
              {checked && <CheckCircleIcon className="w-4 h-4 text-teal-600"/>}
            </div>
            <div className="flex flex-col">
              <div>Custom range</div>
              <div className="text-slate-400 text-[0.7rem]">Range can be only within 2 years</div>
              {checked && <div className="text-slate-900 flex items-center">
                <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5">
                  <label htmlFor="duration" className="text-xs text-slate-600 pl-1">Duration </label>
                  <Input
                    type="text"
                    pattern="[0-9]*"
                    id="duration"
                    placeholder="Duration"
                    value={value.duration}
                    onChange={(e) => {
                      onChange({
                        ...value,
                        duration: e.target.validity.valid ? Number(e.target.value) : value.duration
                      })
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5 ml-2">
                  <label htmlFor="duration" className="text-xs text-slate-600 pl-1">Unit of time</label>
                  <select
                    className={cn(
                      buttonVariants({variant: 'outline', size: 'xs'}),
                      'focus:outline-none outline-none focus:ring-0 pr-2'
                    )}
                    value={value.unit}
                    onChange={(event) => onChange({
                      ...value,
                      unit: event.target.value
                    })}
                  >
                    <option value={MINUTES}>Minutes</option>
                    <option value={HOURS}>Hours</option>
                    <option value={DAYS}>Days</option>
                    <option value={WEEKS}>Weeks</option>
                    <option value={MONTHS}>Months</option>
                    <option value={YEARS}>Years</option>
                  </select>
                </div>
              </div>}
            </div>
          </div>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  )
}

export default DateTimeRangeResponsive