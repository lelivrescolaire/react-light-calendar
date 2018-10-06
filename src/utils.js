import times from 'lodash.times'
import dayjs from 'dayjs'

// Always display 42 days, for mouth with 6 months who covered 6 differents weeks
const DAY_COUNT_DSPLAYED_PR_MONTH = 42

export const initMonth = timestamp => {
  timestamp = timestamp || dayjs().valueOf() // Force a default value if prop `value` is null
  const date = dayjs(timestamp)
  const month = date.month()
  const year = date.year()

  const firstMonthDay = date.startOf('month')
  const lastMonthDay = date.endOf('month')

  const firstDayToDisplay = dayjs(firstMonthDay).subtract(firstMonthDay.day() - 1, 'day')
  const lastDayToDisplay = dayjs(firstDayToDisplay).add(DAY_COUNT_DSPLAYED_PR_MONTH, 'day')

  return {
    firstMonthDay: firstMonthDay.valueOf(),
    lastMonthDay: lastMonthDay.valueOf(),
    firstDayToDisplay: firstDayToDisplay.valueOf(),
    lastDayToDisplay: lastDayToDisplay.valueOf(),
    month,
    year
  }
}

export const parseRange = (startDate, endDate, range) => ({
  startDate: endDate && range ? Math.min(startDate, endDate) : startDate,
  endDate: endDate && range && !dayAreSame(endDate, startDate) ? Math.max(startDate, endDate) : null
})

export const getDays = (first, last) => {
  const firstDay = dayjs(first)
  return times(DAY_COUNT_DSPLAYED_PR_MONTH, i => firstDay.add(i, 'day'))
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

export const getDateWithoutTime = d => dayjs(d).startOf('day').valueOf()

export const dayAreSame = (a, b) => getDateWithoutTime(a) === getDateWithoutTime(b)

export const formartTime = value => (`0${value}`).slice(-2)
