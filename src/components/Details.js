import React from 'react'
import { number, func, bool, arrayOf, string } from 'prop-types'

// Components
import DateDetails from './DateDetails'

const Details = ({ startDate, endDate, dayLabels, monthLabels, displayTime, onTimeChange }) =>
  <div className='rlc-details'>
    {startDate &&
      <DateDetails
        dayLabels={dayLabels}
        monthLabels={monthLabels}
        date={startDate}
        displayTime={displayTime}
        onTimeChange={startDate => onTimeChange({ startDate })}
      />
    }
    {endDate &&
      <DateDetails
        dayLabels={dayLabels}
        monthLabels={monthLabels}
        date={endDate}
        displayTime={displayTime}
        onTimeChange={endDate => onTimeChange({ endDate })}
      />
    }
  </div>

Details.propTypes = {
  startDate: number,
  endDate: number,
  dayLabels: arrayOf(string),
  monthLabels: arrayOf(string),
  displayTime: bool,
  onTimeChange: func
}

export default Details
