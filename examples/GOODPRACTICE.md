# Good practice example :

> The best way to avoid massive code and code duplication is to create a `Calendar` composant based on `@lls/react-light-calendar` and use it where you want.

First : define the main `Calendar` component base on `@lls/react-light-calendar`.
This avoids to redefine constant props like `dayLabels` and `monthLabels`.

```javascript
// common/Calendar.js

import React, { Component } from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css';

const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const MONTH_LABELS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

class Calendar extends Component {
  constructor(props) {
    super(props)
    // Get initial startDate and endDate
    this.state = {
      startDate: props.startDate,
      endDate: props.endDate
    }
  }

  onChange = (startDate, endDate) =>
    this.setState({ startDate, endDate })

  render = () => {
    const { startDate, endDate } = this.state

    return (
      <ReactLightCalendar
        dayLabels={DAY_LABELS}
        monthLabels={MONTH_LABELS}
        onChange={this.onChange}
        {...this.props} // Add parent's additionnal props
        startDate={startDate}
        endDate={endDate}
      />
    )
  }
}

export default Calendar
```
Now you can easily use your `Calendar` component :

```javascript
// ComponentUsingCalendar.js

import React, { Component } from 'react'
import Calendar from './Calendar'

class ComponentUsingCalendar extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const startDate = date.getTime()
    this.DEFAULT_START_DATE = startDate, // Today
    this.DEFAULT_END_DATE = new Date(startDate).setDate(date.getDate() + 6) // Today + 6 days
  }

  render = () => (
    <Calendar
      startDate={this.DEFAULT_START_DATE}
      endDate={this.DEFAULT_END_DATE}
      range
    />
  )
}

export default ComponentUsingCalendar
```
