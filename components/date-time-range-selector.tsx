'use client';
import {Popover, Tab} from "@headlessui/react";
import {CalendarIcon} from "@heroicons/react/20/solid";
import {Button, buttonVariants} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calender";
import {DateRange} from "react-day-picker"
import React from "react";
import {format} from "date-fns";

interface DateTimeRangeSelectorProps {
  onChange: (value: DateRange | undefined) => void;
  value: DateRange | undefined;
}

const DateTimeRangeSelector: React.FC<DateTimeRangeSelectorProps> = ({onChange, value}) => {
  const today = new Date();

  const dateLabel = value?.from ? (
    value.to ? (
      <>
        {format(value.from, "LLL dd, y")} -{" "}
        {format(value.to, "LLL dd, y")}
      </>
    ) : (
      format(value.from, "LLL dd, y")
    )
  ) : (
    <span>Pick a date</span>
  )

  return (
    <Popover>
      {({open}) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button
            className="flex items-center border border-slate-600 shadow py-1.5 px-2.5 max-w-[250px] bg-white text-slate-900 w-full rounded">
            <CalendarIcon className="w-5 h-5"/>
            <div className="ml-1 text-sm">
              {dateLabel}
            </div>
          </Popover.Button>
          <Popover.Panel className=" border max-w-[580px] bg-white shadow-lg   text-slate-900 flex flex-col">
            <div className="tabs p-4">
              <Tab.Group>
                <Tab.List
                  className="flex space-x-1 rounded-lg border border-slate-300 p-0  overflow-hidden inline-flex">
                  <Tab
                    className={
                      ({selected}) => (buttonVariants({variant: selected ? 'default' : 'ghost', size: 'sm'}))}
                  >
                    Relative range
                  </Tab>
                  <Tab
                    className={
                      ({selected}) => (buttonVariants({variant: selected ? 'default' : 'ghost', size: 'sm'}))}
                  >
                    Absolute range
                  </Tab>
                </Tab.List>
                <Tab.Panels className="min-h-[200px]">
                  <Tab.Panel>Relative content</Tab.Panel>
                  <Tab.Panel>
                    <Calendar
                      initialFocus
                      disabled={{after: today}}
                      mode="range"
                      defaultMonth={value?.from}
                      selected={value}
                      onSelect={onChange}
                      numberOfMonths={2}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="panel-actions flex justify-between p-4 bg-slate-50 border-t ">
              <div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                  Clear and dismiss
                </Button>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button variant="default" size="sm">
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