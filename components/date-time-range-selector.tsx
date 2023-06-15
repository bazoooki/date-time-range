'use client';
import {Popover, Tab} from "@headlessui/react";
import {CalendarIcon, CheckCircleIcon} from "@heroicons/react/20/solid";
import {Button, buttonVariants} from "@/components/ui/button";
import {Calendar} from "@/components/calender";
import {DateRange} from "react-day-picker"
import React, {useState} from "react";
import {format} from "date-fns";
import {RadioGroup} from '@headlessui/react'
import {DAYS, HOURS, MINUTES, MONTH, WEEKS, YEARS} from "@/lib/time.constants";
import {cn, getResponsiveDateTimeRange} from "@/lib/utils";
import InputNumber from 'rc-input-number';
import {Input} from "@/components/ui/input";

interface DateTimeRangeSelectorProps {
  onChange: (value: DateRange | undefined) => void;
  value: DateRange | undefined;
}

interface CustomResponsiveRange {
  duration: number;
  unit: string;
}

const timeRanges = [
  {label: 'Last 5 minutes', value: '5_minutes', duration: 5, unit: MINUTES},
  {label: 'Last 1 hour', value: '1_hour', duration: 1, unit: HOURS},
  {label: 'Last 24 hours', value: '24_hours', duration: 24, unit: HOURS},
  {label: 'Last 3 days', value: '3_days', duration: 3, unit: DAYS},
  {label: 'Last 1 week', value: '1_week', duration: 1, unit: WEEKS},
  {label: 'Last 1 month', value: '1_month', duration: 1, unit: MONTH},
  {label: 'Last 2 years', value: '2_years', duration: 2, unit: YEARS},
]

const DateTimeRangeSelector: React.FC<DateTimeRangeSelectorProps> = ({onChange, value}) => {

  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: value?.from,
    to: value?.to,
  })
  const [responsiveRange, setResponsiveRange] = useState(timeRanges[0])
  const [customResponsiveRange, setCustomResponsiveRange] = useState<CustomResponsiveRange>({
    duration: 0,
    unit: MINUTES
  })
  const [selectedTab, setSelectedTab] = useState(0)

  const dateLabel = (value?.from && selectedTab === 0 ?
    `${responsiveRange.duration} ${responsiveRange.unit}` :
    value?.from ? (value.to ? (
        <>
          {format(value.from, "LLL dd, y")} -{" "}
          {format(value.to, "LLL dd, y")}
        </>
      ) : (
        format(value.from, "LLL dd, y")
      )
    ) : (
      <span>Pick a date</span>
    ))


  const handleApply = () => {
    if (selectedTab === 1) {
      onChange(dateRange)
    } else {
      if (!responsiveRange) {
        return
      }
      if (typeof responsiveRange === 'string' && responsiveRange === 'custom') {
        console.log('handle custom range')
      } else {
        const {duration, unit} = responsiveRange
        const isPast = true
        const newDateRange = getResponsiveDateTimeRange({duration, unit, isPast})
        onChange(newDateRange)
      }
    }
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
          <Popover.Panel className=" border max-w-[580px] bg-white shadow-lg   text-slate-900 flex flex-col">
            <div className="tabs p-4">
              <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
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
                  <Tab.Panel>
                    <RadioGroup value={responsiveRange} onChange={setResponsiveRange} className="space-y-1">
                      <RadioGroup.Label className="text-sm">Choose a range</RadioGroup.Label>
                      {timeRanges.map(range =>
                        <RadioGroup.Option value={range} key={range.value}>
                          {({checked}) => (
                            <div
                              className="flex items-center space-x-1 text-sm hover:text-teal-800 cursor-pointer inline-flex">
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 border border-slate-300 ">
                                {checked && <CheckCircleIcon className="w-4 h-4 text-teal-600"/>}
                              </div>
                              <div>{range.label}</div>
                            </div>
                          )}
                        </RadioGroup.Option>
                      )}
                      <RadioGroup.Option value='custom' key='custom'>
                        {({checked}) => (
                          <div
                            className="flex items-start space-x-1 text-sm hover:text-teal-800 cursor-pointer inline-flex">
                            <div
                              className="w-4 h-4 mt-1.5 rounded-full flex items-center justify-center bg-slate-100 border border-slate-300 ">
                              {checked && <CheckCircleIcon className="w-4 h-4 text-teal-600"/>}
                            </div>
                            <div className="flex flex-col">
                              <div>Custom range</div>
                              <div className="text-slate-400 text-xs">Range can be only within 2 years</div>
                              {checked && <div className="text-slate-900 flex items-center">
                                <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5">
                                  <label htmlFor="duration" className="text-xs text-slate-600">Duration </label>
                                  <Input
                                    type="text"
                                    pattern="[0-9]*"
                                    id="duration"
                                    placeholder="Duration"
                                    value={customResponsiveRange.duration}
                                    onChange={(e) => setCustomResponsiveRange((prev) => ({
                                      ...prev,
                                      duration: e.target.validity.valid ? Number(e.target.value) :prev.duration
                                    }))}
                                  />
                                </div>
                                <div className="flex flex-col space-y-1.5  w-full max-w-sm items-start mt-1.5 ml-2">
                                  <label htmlFor="duration" className="text-xs text-slate-600">Unit </label>
                                  <select
                                    className={cn(
                                      buttonVariants({variant: 'outline', size: 'xs'}),
                                      'focus:outline-none outline-none focus:ring-0 pr-2'
                                    )}
                                    value={customResponsiveRange.unit}
                                    onChange={(event) => setCustomResponsiveRange((prev) => ({
                                      ...prev,
                                      unit: event.target.value
                                    }))}
                                  >
                                    <option value="minutes">Minutes</option>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                  </select>
                                </div>
                              </div>}
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                    </RadioGroup>
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
            <div className="panel-actions flex justify-between p-4 bg-slate-50 border-t ">
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800"
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
                    handleApply();
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