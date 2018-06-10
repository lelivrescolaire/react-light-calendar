import React from 'react'
import { number, func, arrayOf, string } from 'prop-types'

const MonthWrapper = ({ monthLabels, month, year, prevYear, prevMonth, nextYear, nextMonth }) =>
  <div className="rlc-month-and-year-wrapper">
    <div className="rlc-navigation-button-wrapper rlc-prevs">
      <div className="rlc-navigation-button rlc-prev-year" onClick={prevYear}>{'<<'}</div>
      <div className="rlc-navigation-button rlc-prev-month" onClick={prevMonth}>{'<'}</div>
    </div>
    <div className="rlc-month-and-year">{monthLabels[month]} <span>{year}</span></div>
    <div className="rlc-navigation-button-wrapper rlc-nexts">
      <div className="rlc-navigation-button rlc-next-month" onClick={nextMonth}>{'>'}</div>
      <div className="rlc-navigation-button rlc-next-year" onClick={nextYear}>{'>>'}</div>
    </div>
  </div>

MonthWrapper.propTypes = {
  monthLabels: arrayOf(string),
  month: number,
  year: number,
  prevYear: func,
  prevMonth: func,
  nextYear: func,
  nextMonth: func
}

export default MonthWrapper
