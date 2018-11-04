import times from 'lodash.times'
import t from 'timestamp-utils'

const DAYS_TO_DISPLAY_PER_MONTH = 42

export const initMonth = timestamp => {
  timestamp = timestamp || new Date().getTime()
  const dayNumber = t.getDay(timestamp)
  const firstMonthDay = t.addDays(timestamp, -dayNumber + 1)
  const lastMonthDay = t.addMonths(t.addDays(firstMonthDay, -1), 1)
  const firstMonthDayNumber = t.getWeekDay(firstMonthDay)
  const firstDayToDisplay = t.addDays(firstMonthDay, -firstMonthDayNumber)

  return {
    firstMonthDay,
    lastMonthDay,
    firstDayToDisplay,
    month: parseInt(t.getMonth(timestamp), 10),
    year: t.getYear(timestamp)
  }
}

export const parseRange = (startDate, endDate, range) => ({
  startDate: endDate && range ? Math.min(startDate, endDate) : startDate,
  endDate: endDate && range && !dayAreSame(endDate, startDate) ? Math.max(startDate, endDate) : null
})

export const getDays = firstDay =>
  times(DAYS_TO_DISPLAY_PER_MONTH, i => t.addDays(firstDay, i))

export const getDateWithoutTime = timestamp => {
  const [, , , hours, minutes, seconds, milliseconds] = t.decompose(timestamp)
  return t.add(timestamp, { hours: -hours, minutes: -minutes, seconds: -seconds, milliseconds: -milliseconds })
}

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

export const dayAreSame = (a, b) => getDateWithoutTime(a) === getDateWithoutTime(b)

export const formartTime = value => (`0${value}`).slice(-2)

export const extendTime = (frm, to) => {
  if (!frm || !to) return to
  const toWithoutTime = getDateWithoutTime(to)
  const [, , , hours, minutes, seconds, milliseconds] = t.decompose(frm)
  return t.add(toWithoutTime, {
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
    milliseconds: parseInt(milliseconds, 10)
  })
}
