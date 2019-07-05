import React from 'react'

import DateDetails from './DateDetails'

const Header = ({ startDate, endDate, dayLabels, monthLabels, displayTime, update }) =>
  <div className="rlc-details">
    {startDate &&
      <DateDetails
        dayLabels={dayLabels}
        monthLabels={monthLabels}
        date={startDate}
        displayTime={displayTime}
        onTimeChange={date => update({ startDate: date })}
      />
    }
    {endDate &&
      <DateDetails
        dayLabels={dayLabels}
        monthLabels={monthLabels}
        date={endDate}
        displayTime={displayTime}
        onTimeChange={date => update({ endDate: date })}
      />
    }
  </div>

export default Header
