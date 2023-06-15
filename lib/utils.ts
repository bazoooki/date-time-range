import {ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {DAYS, HOURS, MINUTES, MONTH, WEEKS, YEARS} from "@/lib/time.constants";
import {addMinutes} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getResponsiveDateTimeRange = (
  {
    duration,
    unit,
    isPast
  }: {
    duration: number,
    unit: string,
    isPast: boolean
  }) => {

  let amount = 0
  switch (unit) {
    case MINUTES:
      amount = duration
      break
    case HOURS:
      amount = duration * 60
      break
    case DAYS:
      amount = duration * 24 * 60
      break
    case WEEKS:
      amount = duration * 7 * 24 * 60
      break
    case MONTH:
      amount = duration * 30 * 24 * 60
      break
    case YEARS:
      amount = duration * 365 * 24 * 60
      break
    default:
      break
  }
  return isPast ? {
    from: addMinutes(new Date(), -amount),
    to: new Date()
  } : {
    from: new Date(),
    to: addMinutes(new Date(), amount)
  }
}