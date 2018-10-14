import React from 'react'
import { number, func, bool, arrayOf, string } from 'prop-types'
import dayjs from 'dayjs'

// Components
import DateDetails from './DateDetails'

function Details ({ startDate, endDate, dayLabels, monthLabels, displayTime, onStartTimeChange, onEndTimeChange }) {
  return (
    <div className='rlc-details'>
      {startDate &&
        <DateDetails
          dayLabels={dayLabels}
          monthLabels={monthLabels}
          date={dayjs(startDate).valueOf()}
          displayTime={displayTime}
          onTimeChange={onStartTimeChange}
        />
      }
      {endDate &&
        <DateDetails
          dayLabels={dayLabels}
          monthLabels={monthLabels}
          date={dayjs(endDate).valueOf()}
          displayTime={displayTime}
          onTimeChange={onEndTimeChange}
        />
      }
    </div>
  )
}

Details.propTypes = {
  startDate: number,
  endDate: number,
  dayLabels: arrayOf(string),
  monthLabels: arrayOf(string),
  displayTime: bool,
  onStartTimeChange: func,
  onEndTimeChange: func
}

export default Details
