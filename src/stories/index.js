import React, { Component } from 'react'

import { storiesOf } from '@storybook/react'
import ReactLightCalendar from '../index'

export const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
export const MONTH_LABELS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const Calendar = props => <ReactLightCalendar dayLabels={DAY_LABELS} monthLabels={MONTH_LABELS} {...props} />

const DefaultValueRange = () => {
  const date = new Date()
  const startDate = date.getTime()
  const endDate = new Date(startDate).setDate(date.getDate() + 6)
  return <Calendar startDate={startDate} endDate={endDate} range />
}

class OnChange extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const startDate = date.getTime()
    this.state = {
      startDate,
      endDate: new Date(startDate).setDate(date.getDate() + 6)
    }
  }

  onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render = () => {
    const { startDate, endDate } = this.state

    return (
      <div>
        <Calendar startDate={startDate} endDate={endDate} onChange={this.onChange} range displayTime key='calendar' />
        <div key='start-date'>START DATE : {startDate && new Date(startDate).toString()}</div>
        <div key='end-date'>END DATE : {endDate && new Date(endDate).toString()}</div>
      </div>
    )
  }
}

const InputCSS = () =>
  <div>
    <style dangerouslySetInnerHTML={{ __html: `
      .input-example { display: inline-block }
      .rlc-calendar { display: none }
      .input-text:focus+.rlc-calendar, .rlc-calendar:active, .rlc-calendar:focus { display: block }
    `}}/>
    <div className='input-example' tabIndex={0}>
      <input type='text' className='input-text'/>
      <Calendar custom={{ tabIndex: 1 }} />
    </div>
  </div>

class InputJS extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  open = () => this.setState({ isOpen: true })
  close = e => {
    !e.currentTarget.contains(window.document.activeElement) && this.setState({ isOpen: false })
  }

  render = () =>
    <div style={{ display: 'inline-block' }} tabIndex={0} onFocus={this.open} onBlur={this.close}>
      <input type='text' />
      {this.state.isOpen && <Calendar />}
    </div>
}

storiesOf('Calendar', module)
  .add('default', () => <Calendar />)
  .add('onChange', () => <OnChange />)
  .add('default value', () => <Calendar startDate={new Date().getTime()} />)
  .add('default values (range)', () => <DefaultValueRange />)
  .add('with time', () => <Calendar startDate={new Date().getTime()} displayTime />)
  .add('disable dates', () => <Calendar disableDates={date => date < new Date().getTime()} />)
  .add('input (css)', () => <InputCSS />)
  .add('input (js)', () => <InputJS />)
