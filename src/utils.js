import times from 'lodash.times'
import { getDay, addDays, addMonths, add, getMonth, getYear, decompose, getWeekDay } from 'timestamp-utils'

const DAYS_TO_DISPLAY_PER_MONTH = 42

export const initMonth = timestamp => {
  timestamp = timestamp || new Date().getTime()
  const dayNumber = getDay(timestamp)
  const firstMonthDay = addDays(timestamp, -dayNumber + 1)
  const lastMonthDay = addMonths(addDays(firstMonthDay, -1), 1)
  const firstMonthDayNumber = getWeekDay(firstMonthDay)
  const firstDayToDisplay = addDays(firstMonthDay, -firstMonthDayNumber)

  return {
    firstMonthDay,
    lastMonthDay,
    firstDayToDisplay,
    month: parseInt(getMonth(timestamp), 10),
    year: getYear(timestamp)
  }
}

export const parseRange = (startDate, endDate, range) => ({
  startDate: endDate && range ? Math.min(startDate, endDate) : startDate,
  endDate: endDate && range && !dayAreSame(endDate, startDate) ? Math.max(startDate, endDate) : null
})

export const getDays = firstDay =>
  times(DAYS_TO_DISPLAY_PER_MONTH, i => addDays(firstDay, i))

export const dateIsBetween = (d, s, e) => {
  const date = getDateWithoutTime(d)
  const start = getDateWithoutTime(s)
  const end = getDateWithoutTime(e)
  return date > start && date < end
}

export const dateIsOut = (d, s, e) => {
  const date = getDateWithoutTime(d)
  const start = getDateWithoutTime(s)
  const end = getDateWithoutTime(e)
  return date < start || date > end
}

export const getDateWithoutTime = timestamp => {
  const [, , , hours, minutes, seconds, milliseconds] = decompose(timestamp)
  return add(timestamp, { hours: -hours, minutes: -minutes, seconds: -seconds, milliseconds: -milliseconds })
}

export const dayAreSame = (a, b) => getDateWithoutTime(a) === getDateWithoutTime(b)

export const formartTime = value => (`0${value}`).slice(-2)

export const extendTime = (frm, to) => {
  if (!frm || !to) return to
  const toWithoutTime = getDateWithoutTime(to)
  const [, , , hours, minutes, seconds, milliseconds] = decompose(frm)
  return add(toWithoutTime, {
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
    milliseconds: parseInt(milliseconds, 10)
  })
}
