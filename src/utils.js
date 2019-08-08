import times from 'lodash.times'
import t from 'timestamp-utils'

const DAYS_TO_DISPLAY_PER_MONTH = 42

const MONTHS_LENGHT = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const initMonth = timestamp => {
  timestamp = timestamp || new Date().getTime()
  const [year, month, dayNumber] = t.decompose(timestamp)
  const firstMonthDay = getDateWithoutTime(t.addDays(timestamp, -dayNumber + 1))
  const monthLenght = MONTHS_LENGHT[month - 1] || (isLeapYear(year) ? 29 : 28)
  const lastMonthDay = t.addDays(firstMonthDay, monthLenght - 1)
  const firstMonthDayNumber = t.getWeekDay(firstMonthDay)
  const firstDayToDisplay = t.addDays(firstMonthDay, -firstMonthDayNumber)

  return {
    firstMonthDay,
    lastMonthDay,
    firstDayToDisplay,
    month,
    year
  }
}

export const parseRange = (startDate, endDate) => ({
  startDate: endDate ? startDate ? Math.min(startDate, endDate) : null : startDate,
  endDate: endDate && (endDate !== startDate) ? Math.max(startDate, endDate) : null
})

export const getDays = firstDay => times(DAYS_TO_DISPLAY_PER_MONTH, i => t.addDays(firstDay, i))

export const getDateWithoutTime = timestamp => {
  const [, , , hours, minutes, seconds, milliseconds] = t.decompose(timestamp)
  return t.add(timestamp, { hours: -hours, minutes: -minutes, seconds: -seconds, milliseconds: -milliseconds })
}

export const dateIsBetween = (date, start, end) => date > start && date < end

export const dateIsOut = (date, start, end) => date < start || date > end

export const formartTime = value => (`0${value}`).slice(-2)
