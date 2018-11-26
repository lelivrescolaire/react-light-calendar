import React, { Component } from 'react'
import { func, arrayOf, string } from 'prop-types'

class Navigation extends Component {
  prevYear = () => this.props.onChange({ yearOffset: -1 })
  prevMonth = () => this.props.onChange({ monthOffset: -1 })

  nextYear = () => this.props.onChange({ yearOffset: 1 })
  nextMonth = () => this.props.onChange({ monthOffset: 1 })

  render = () => {
    const { monthLabels, month, year } = this.props

    return (
      <div className="rlc-month-and-year-wrapper">
        <div className="rlc-navigation-button-wrapper rlc-prevs">
          <div className="rlc-navigation-button rlc-prev-year" onClick={this.prevYear}>{'<<'}</div>
          <div className="rlc-navigation-button rlc-prev-month" onClick={this.prevMonth}>{'<'}</div>
        </div>
        <div className="rlc-month-and-year">{monthLabels[month - 1]} <span>{year}</span></div>
        <div className="rlc-navigation-button-wrapper rlc-nexts">
          <div className="rlc-navigation-button rlc-next-month" onClick={this.nextMonth}>{'>'}</div>
          <div className="rlc-navigation-button rlc-next-year" onClick={this.nextYear}>{'>>'}</div>
        </div>
      </div>
    )
  }
}

Navigation.propTypes = {
  monthLabels: arrayOf(string),
  month: string,
  year: string,
  onChange: func
}

export default Navigation
