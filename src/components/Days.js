import React from 'react'
import t from 'timestamp-utils'
import { getDays } from '../utils'

const Days = ({ firstDayToDisplay, onClick, disableDates }) =>
  <div className="rlc-days">
    {getDays(firstDayToDisplay).map(day =>
      <div
        className={`rlc-day`}//${getClassNames(day)}
        key={day}
        onClick={() => !disableDates(day) && onClick(day)}
      >
        {parseInt(t.getDay(day), 10)}
      </div>
    )}
  </div>

export default Days
