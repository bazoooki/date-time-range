'use client';
import {Popover, Tab} from "@headlessui/react";
import {CalendarIcon} from "@heroicons/react/20/solid";
import {Button, buttonVariants} from "@/components/ui/button";
import {Calendar} from "@/components/calender";
import {DateRange} from "react-day-picker"
import React, {useState} from "react";
import {format} from "date-fns";
import {getResponsiveDateTimeRange} from "@/lib/utils";
import DateTimeRangeResponsive from "@/components/date-time-range-responsive";
import type {ResponsiveTimeRange} from "@/types/types";
import {MINUTES} from "@/lib/time.constants";

interface DateTimeRangeSelectorProps {
  onChange: (value: DateRange | undefined) => void;
  value: DateRange | undefined;
}


const defaultResponsiveRange: ResponsiveTimeRange = {
  duration: 5,
  unit: MINUTES,
  value: '5_minutes'
}
const DateTimeRangeSelector: React.FC<DateTimeRangeSelectorProps> = ({onChange, value}) => {
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: value?.from,
    to: value?.to,
  })
  const [responsiveRange, setResponsiveRange] = useState<ResponsiveTimeRange>(defaultResponsiveRange)
  const [selectedTab, setSelectedTab] = useState(0)


  const responsiveLabel = `${responsiveRange.duration} ${responsiveRange.unit}`
  const absoluteLabel = value?.from ?
    (value.to ? (<>
          {format(value.from, "LLL dd, y")} -{" "} {format(value.to, "LLL dd, y")}
        </>
      ) : format(value.from, "LLL dd, y")
    ) : <span>Pick a date</span>

  const dateLabel = value?.from && selectedTab === 0 ? responsiveLabel : absoluteLabel


  const apply = () => {
    if (selectedTab === 1) {
      onChange(dateRange)
    } else {
      if (!responsiveRange || !responsiveRange.duration || !responsiveRange.unit) {
        return
      }
      const {duration, unit} = responsiveRange
      const isPast = true
      const newDateRange = getResponsiveDateTimeRange({duration, unit, isPast})
      onChange(newDateRange)

    }
  }

  const clear = () => {
    setDateRange({from: undefined, to: undefined})
    setResponsiveRange(defaultResponsiveRange)
    onChange({from: undefined, to: undefined})
  }
  return (
    <Popover>
      {({open, close}) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button
            className="flex items-center border border-slate-600 shadow py-1.5 px-2.5 max-w-[250px] bg-white text-slate-900 w-full rounded">
            <CalendarIcon className="w-5 h-5"/>
            <div className="ml-1 text-sm">
              {dateLabel}
            </div>
          </Popover.Button>
          <Popover.Panel className=" border max-w-[520px] bg-white shadow-lg   text-slate-900 flex flex-col">
            <div className="tabs p-4">
              <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                <Tab.List
                  className="flex space-x-1 rounded-lg border border-slate-300 p-0  overflow-hidden inline-flex">
                  <Tab
                    className={
                      ({selected}) => (buttonVariants({variant: selected ? 'default' : 'ghost', size: 'xs'}))}
                  >
                    Relative range
                  </Tab>
                  <Tab
                    className={
                      ({selected}) => (buttonVariants({variant: selected ? 'default' : 'ghost', size: 'xs'}))}
                  >
                    Absolute range
                  </Tab>
                </Tab.List>
                <Tab.Panels className="min-h-[240px]">
                  <Tab.Panel>
                    <DateTimeRangeResponsive onChange={setResponsiveRange} value={responsiveRange}/>
                  </Tab.Panel>
                  <Tab.Panel>
                    <Calendar
                      initialFocus
                      disabled={{after: today}}
                      mode="range"
                      defaultMonth={dateRange?.from || today}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="panel-actions flex justify-between p-3 bg-slate-50 border-t ">
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    clear()
                    close()
                  }}
                >
                  Clear and dismiss
                </Button>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    apply();
                    close();
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}

export default DateTimeRangeSelector