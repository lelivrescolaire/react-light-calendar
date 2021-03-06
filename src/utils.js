import times from 'lodash.times'
import t from 'timestamp-utils'

const MONTHS_LENGHT = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

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

export const getDays = (firstDay, lastDay) => {
  const lastDayNumber = t.getWeekDay(lastDay)
  const nextMonthDaysCount = lastDayNumber === 6 ? 0 : (6 - lastDayNumber)
  const daysCount = ((lastDay - firstDay) / DAY_IN_MILLISECONDS) + nextMonthDaysCount + 1
  return times(daysCount, i => t.addDays(firstDay, i))
}

export const getDateWithoutTime = timestamp => {
  const [, , , hours, minutes, seconds, milliseconds] = t.decompose(timestamp)
  return t.add(timestamp, { hours: -hours, minutes: -minutes, seconds: -seconds, milliseconds: -milliseconds })
}

export const dateIsBetween = (date, start, end) => date > start && date < end

export const dateIsOut = (date, start, end) => date < start || date > end

export const formartTime = value => (`0${value}`).slice(-2)
