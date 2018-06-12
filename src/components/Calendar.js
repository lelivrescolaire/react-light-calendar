import React, { Component } from 'react'
import { number, func, bool, arrayOf, string } from 'prop-types'
import { initMonth, parseRange, getDays, dateIsBetween, dateIsOut,
  extendTime, dayAreSame, getDateWithoutTime } from '../utils'

// Components
import Details from './Details'
import MonthWrapper from './MonthWrapper'

// Styles
import './index.css'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...initMonth(props.startDate),
      ...parseRange(props.startDate, props.endDate, props.range)
    }
  }

  componentWillReceiveProps = nextProps =>
    this.setState(parseRange(nextProps.startDate, nextProps.endDate, nextProps.range))

  onClickDay = day => {
    const { range } = this.props
    const { startDate, endDate } = this.state
    if (range) {
      if (!startDate) this.update({ startDate: day })
      else {
        const sDate = day < startDate ? day : startDate
        const eDate = day < startDate ? endDate : day
        this.update({
          startDate: extendTime(startDate, sDate),
          endDate: extendTime(endDate, eDate)
        })
      }
    } else this.update({ startDate: extendTime(startDate, day), endDate: null })
  }

  onStartTimeChange = date => this.update({ startDate: date })
  onEndTimeChange = date => this.update({ endDate: date })

  changeMonth = ({ yearOffset = 0, monthOffset = 0 }) => {
    const { year, month } = this.state
    const date = new Date(year + yearOffset, month + monthOffset, 1).getTime()
    this.setState(initMonth(date))
  }

  prevYear = () => this.changeMonth({ yearOffset: -1 })
  prevMonth = () => this.changeMonth({ monthOffset: -1 })

  nextYear = () => this.changeMonth({ yearOffset: 1 })
  nextMonth = () => this.changeMonth({ monthOffset: 1 })

  update = ({ startDate, endDate }) =>
    this.props.onChange(startDate || this.props.startDate, endDate || this.props.endDate)

  getClassNames = day => {
    const { firstMonthDay, lastMonthDay, startDate, endDate } = this.state
    const { disableDates } = this.props

    const conditions = {
      'rlc-day-disabled': disableDates(day),
      'rlc-day-today': dayAreSame(day, getDateWithoutTime(new Date())),
      'rlc-day-inside-selection': dateIsBetween(day, startDate, endDate),
      'rlc-day-out-of-month': dateIsOut(day, firstMonthDay, lastMonthDay),
      'rlc-day-selected': !endDate && dayAreSame(startDate, day),
      'rlc-day-start-selection': endDate && dayAreSame(startDate, day),
      'rlc-day-end-selection': endDate && dayAreSame(endDate, day),
      [`rlc-day-${day}`]: true
    }

    const classnames = Object.entries(conditions)
      .reduce((prev, [className, valid]) => valid ? `${prev} ${className}` : prev, '')

    return classnames || 'Day_default'
  }

  render = () => {
    const { firstDayToDisplay, lastDayToDisplay,
      startDate: sDate, endDate: eDate, month, year } = this.state
    const { startDate, endDate, onChange, range, disableDates, displayTime, dayLabels, monthLabels, ...props } = this.props

    return (
      <div className="rlc-calendar" {...props}>
        <Details
          startDate={sDate}
          endDate={eDate}
          dayLabels={dayLabels}
          monthLabels={monthLabels}
          displayTime={displayTime}
          onStartTimeChange={this.onStartTimeChange}
          onEndTimeChange={this.onEndTimeChange}
        />
        <MonthWrapper
          monthLabels={monthLabels}
          month={month}
          year={year}
          prevYear={this.prevYear}
          prevMonth={this.prevMonth}
          nextYear={this.nextYear}
          nextMonth={this.nextMonth}
        />
        <div className="rlc-days-label">
          {dayLabels.map(label => <div className="rlc-day-label" key={label.toLowerCase()}>{label.slice(0, 2)}</div>)}
        </div>
        <div className="rlc-days">
          {getDays(firstDayToDisplay, lastDayToDisplay).map(day =>
            <div
              className={`rlc-day ${this.getClassNames(day)}`}
              key={day}
              onClick={() => !disableDates(day) && this.onClickDay(day)}
            >
              {new Date(day).getDate()}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const DEFAULT_PROPS = {
  startDate: null,
  endDate: null,
  onChange: () => {},
  range: false,
  disableDates: () => false,
  displayTime: false,
  dayLabels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

Calendar.defaultProps = DEFAULT_PROPS

Calendar.propTypes = {
  startDate: number,
  endDate: number,
  onChange: func,
  range: bool,
  disableDates: func,
  displayTime: bool,
  dayLabels: arrayOf(string).isRequired,
  monthLabels: arrayOf(string).isRequired
}

export default Calendar
