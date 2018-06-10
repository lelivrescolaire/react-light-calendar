import React, { Component } from 'react'
import { formartTime } from '../utils'
import times from 'lodash.times'
import { bool, arrayOf, string, instanceOf, func } from 'prop-types'

class DateDetails extends Component {
  constructor (props) {
    super(props)
    this.state = this.extractTime(props)
  }

  componentWillReceiveProps = nextProps => this.setState(this.extractTime(nextProps))

  extractTime = props => {
    const d = new Date(props.date)
    return { hours: d.getHours(), minutes: d.getMinutes() }
  }

  onHoursChange = e => {
    const { date, onTimeChange } = this.props
    onTimeChange(new Date(date).setHours(e.target.value))
  }

  onMinutesChange = e => {
    const { date, onTimeChange } = this.props
    onTimeChange(new Date(date).setMinutes(e.target.value))
  }

  render = () => {
    const { date, displayTime, dayLabels, monthLabels } = this.props
    const { hours, minutes } = this.state

    return (
      <div className="rlc-date-details-wrapper">
        <div className="rlc-date-details">
          <div className="rlc-date-number">{date.getDate()}</div>
          <div className="rlc-date-day-month-year">
            <div className="rlc-detail-day">{dayLabels[(date.getDay() || 7) - 1]}</div>
            <div className="rlc-detail-month-year">{monthLabels[date.getMonth()]} <span className="rlc-detail-year">{date.getFullYear()}</span></div>
          </div>
        </div>
        {displayTime &&
          <div className="rlc-date-time-selects">
            <select onChange={this.onHoursChange} value={hours}>{times(24).map(hour => <option value={hour} key={hour}>{formartTime(hour)}</option>)}</select>
            <span className="rlc-time-separator">:</span>
            <select onChange={this.onMinutesChange} value={minutes}>{times(60).map(minute => <option value={minute} key={minute}>{formartTime(minute)}</option>)}</select>
          </div>
        }
      </div>
    )
  }
}

DateDetails.propTypes = {
  date: instanceOf(Date),
  displayTime: bool,
  dayLabels: arrayOf(string),
  monthLabels: arrayOf(string),
  onTimeChange: func
}

export default DateDetails
