import {Popover, Tab} from "@headlessui/react";
import {CalendarIcon} from "@heroicons/react/20/solid";
import {cn} from '@/lib/utils';
import {Button, buttonVariants} from "@/components/ui/button";

interface DateTimeRangeSelectorProps {
  onChange: (value: Date[]) => void;
  value: Date[];
}

const DateTimeRangeSelector = (props: DateTimeRangeSelectorProps) => {
  return (
    <Popover>
      {({open}) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button
            className="flex items-center border border-slate-600 shadow py-1.5 px-2.5 max-w-[200px] bg-white text-slate-900 w-full rounded">

            <CalendarIcon className="w-5 h-5"/>
            <div className="ml-1">Select date range</div>

          </Popover.Button>
          <Popover.Panel className=" border max-w-[500px] bg-white shadow-lg   text-slate-900 flex flex-col">

            <div className="tabs p-4">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-lg border border-slate-300 p-0  overflow-hidden inline-flex">
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
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="panel-actions flex justify-between p-4 bg-slate-50 border-t ">

              <div>
                <Button variant="ghost" size="sm"  className="text-red-600 hover:text-red-800">Clear and dismiss</Button>
              </div>
              <div>
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button variant="default" size="sm">Apply</Button>
              </div>
            </div>

          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}


export default DateTimeRangeSelector