import React from 'react'

const DaysLabels = ({ dayLabels }) =>
  <div className="rlc-days-label">
    {dayLabels.map(label =>
      <div className="rlc-day-label" key={label.toLowerCase()}>
        {label.slice(0, 2)}
      </div>
    )}
  </div>

export default DaysLabels
