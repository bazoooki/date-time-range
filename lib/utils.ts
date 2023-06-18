import {ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {DAYS, HOURS, MINUTES, MONTHS, WEEKS, YEARS} from "@/lib/time.constants";

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


  let minutesAmount = 0
  let date = new Date()
  switch (unit) {
    case MINUTES:
      minutesAmount = duration
      break
    case HOURS:
      minutesAmount = duration * 60
      break
    case DAYS:
      minutesAmount = duration * 24 * 60
      break
    case WEEKS:
      minutesAmount = duration * 7 * 24 * 60
      break
    case MONTHS:
      date.setMonth(date.getMonth() - duration);
      break
    case YEARS:
      date.setFullYear(date.getFullYear() - duration);
      break
    default:
      break
  }

  if (minutesAmount !== 0) {
    date.setMinutes(date.getMinutes() + (isPast ? -minutesAmount : minutesAmount))
  }

  return {
    from: isPast ? date : new Date(),
    to: isPast ? new Date() : date
  }
}