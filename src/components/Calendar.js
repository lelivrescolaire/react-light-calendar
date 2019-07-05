import React, { PureComponent } from 'react'
import { number, func, bool, arrayOf, string } from 'prop-types'
import { initMonth, parseRange, dateIsBetween, dateIsOut, getDateWithoutTime } from '../utils'
import t from 'timestamp-utils'

// Components
import Header from './Header'
import DaysLabels from './DaysLabels'
import Days from './Days'
import Navigation from './Navigation'

// Styles
import './index.css'

class Calendar extends PureComponent {
  state = {}

  static getDerivedStateFromProps ({ timezone, startDate, endDate }) {
    t.setTimezone(timezone)
    return ({
      ...initMonth(startDate),
      ...parseRange(startDate, endDate)
    })
  }

  onClickDay = day => {
    const { startDate, endDate } = this.state
    if (!startDate) this.update({ startDate: day })
    else if (startDate && !endDate) this.update(parseRange(startDate, day))
    else this.update({ startDate: day, endDate: null })
  }

  changeMonth = ({ yearOffset = 0, monthOffset = 0 }) => {
    const { firstMonthDay } = this.state
    const timestamp = t.add(firstMonthDay, { months: monthOffset, years: yearOffset })
    this.setState(initMonth(timestamp))
  }

  update = ({ startDate, endDate }) => {
    const sDate = startDate === undefined ? this.props.startDate : startDate
    const eDate = endDate === undefined ? this.props.endDate : endDate
    this.props.onChange(sDate, eDate)
  }

  getClassNames = day => {
    const { firstMonthDay, lastMonthDay, startDate, endDate } = this.state
    const { disableDates } = this.props
    const sDate = getDateWithoutTime(startDate)
    const eDate = getDateWithoutTime(endDate)

    const conditions = {
      'rlc-day-disabled': disableDates(day),
      'rlc-day-today': day === getDateWithoutTime(new Date().getTime()),
      'rlc-day-inside-selection': dateIsBetween(day, sDate, eDate),
      'rlc-day-out-of-month': dateIsOut(day, firstMonthDay, lastMonthDay),
      'rlc-day-selected': !endDate && (sDate === day),
      'rlc-day-start-selection': endDate && (sDate === day),
      'rlc-day-end-selection': endDate && (eDate === day),
      [`rlc-day-${day}`]: true
    }

    const classnames = Object.entries(conditions)
      .reduce((prev, [className, valid]) => valid ? `${prev} ${className}` : prev, '')

    return classnames || 'Day_default'
  }

  render = () => {
    const { firstDayToDisplay, startDate: sDate, endDate: eDate, month, year } = this.state
    const { startDate, endDate, onChange, disableDates, displayTime, dayLabels, monthLabels, timezone, ...props } = this.props

    return (
      <div className="rlc-calendar" {...props}>
        <Header
          startDate={sDate}
          endDate={eDate}
          dayLabels={dayLabels}
          monthLabels={monthLabels}
          displayTime={displayTime}
          update={this.update}
        />
        <Navigation
          monthLabels={monthLabels}
          month={month}
          year={year}
          onChange={this.changeMonth}
        />
        <DaysLabels dayLabels={dayLabels} />
        <Days
          firstDayToDisplay={firstDayToDisplay}
          onClick={this.onClickDay}
          disableDates={disableDates}
        />
      </div>
    )
  }
}

Calendar.defaultProps = {
  startDate: null,
  endDate: null,
  onChange: () => {},
  disableDates: () => false,
  displayTime: false,
  dayLabels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  timezone: 'UTC'
}

Calendar.propTypes = {
  startDate: number,
  endDate: number,
  onChange: func,
  disableDates: func,
  displayTime: bool,
  dayLabels: arrayOf(string),
  monthLabels: arrayOf(string),
  timezone: string
}

export default Calendar
