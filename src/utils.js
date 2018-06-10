import times from 'lodash.times'

const DAY_IN_MILLISECONDS = 1000 * 3600 * 24

export const initMonth = timestamp => {
  timestamp = timestamp || new Date().getTime() // Force a default value if prop `value` is null
  const date = new Date(timestamp)
  const month = date.getMonth()
  const year = date.getFullYear()

  const firstMonthDay = new Date(year, month, 1)
  const firstMonthDayTime = firstMonthDay.getTime()

  const lastMonthDay = new Date(year, month + 1, 0)
  const lastMonthDayTime = lastMonthDay.getTime()

  // Always display 42 days, for mouth with 6 month who covered 6 differents weeks
  const startOffset = (firstMonthDay.getDay() || 7) - 1

  const firstDayToDisplay = new Date(firstMonthDayTime).setDate(firstMonthDay.getDate() - startOffset)
  const lastDayToDisplay = new Date(firstDayToDisplay).setDate(new Date(firstDayToDisplay).getDate() + 41)

  return {
    firstMonthDay: firstMonthDayTime,
    lastMonthDay: lastMonthDayTime,
    firstDayToDisplay,
    lastDayToDisplay,
    month,
    year
  }
}

export const parseRange = (startDate, endDate, range) => ({
  startDate: endDate && range ? Math.min(startDate, endDate) : startDate,
  endDate: endDate && range && !dayAreSame(endDate, startDate) ? Math.max(startDate, endDate) : null
})

export const getDays = (firstDay, lastDay) => {
  const firstDayDate = new Date(firstDay)
  const daysCount = Math.round((lastDay - firstDay) / DAY_IN_MILLISECONDS) + 1
  return times(daysCount, i => new Date(firstDay).setDate(firstDayDate.getDate() + i))
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

export const getDateWithoutTime = d => {
  const date = new Date(d)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

export const dayAreSame = (a, b) => getDateWithoutTime(a) === getDateWithoutTime(b)

export const formartTime = value => (`0${value}`).slice(-2)

export const extendTime = (frm, to) => {
  if (!frm || !to) return to
  const date = new Date(frm)
  return new Date(new Date(to).setHours(date.getHours())).setMinutes(date.getMinutes())
}
