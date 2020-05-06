import React, { Component } from 'react'
import t from 'timestamp-utils'
import { storiesOf } from '@storybook/react'
import Calendar from '../src/index'

const DefaultValues = () => {
  const date = new Date()
  const startDate = date.getTime()
  const endDate = new Date(startDate).setDate(date.getDate() + 6)
  return <Calendar startDate={startDate} endDate={endDate} />
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
    const sDecompose = t.decompose(startDate)
    const eDecompose = t.decompose(endDate)
    const sDate = `${sDecompose[0]}/${sDecompose[1]}/${sDecompose[2]} ${sDecompose[3]}:${sDecompose[4]}`
    const eDate = `${eDecompose[0]}/${eDecompose[1]}/${eDecompose[2]} ${eDecompose[3]}:${eDecompose[4]}`

    return (
      <div>
        <Calendar startDate={startDate} endDate={endDate} onChange={this.onChange} displayTime />
        <div key='start-date'>START DATE : {startDate && sDate}</div>
        <div key='end-date'>END DATE : {endDate && eDate}</div>
      </div>
    )
  }
}

const InputCSS = () =>
  <div>
    <style dangerouslySetInnerHTML={{ __html: `
      .input-example { display: inline-block }
      .calendar-wrapper { display: none }
      .input-text:focus+.calendar-wrapper, .calendar-wrapper:active, .calendar-wrapper:focus { display: block }
    `}}/>
    <div className='input-example' tabIndex={0}>
      <input type='text' className='input-text'/>
      <div tabIndex={0} className='calendar-wrapper'>
        <Calendar />
      </div>
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

class Timezone extends Component{
  state = { tz: 'UTC' }

  changeTimezone = tz => this.setState({ tz })

  render = () => {
    const { tz } = this.state

    return (
      <div>
        <Calendar displayTime timezone={tz} startDate={new Date().getTime()} />
        <p>Current timezone : {tz}</p>
        <hr />
        <p>Choose a timezone :</p>
        <button onClick={() => this.changeTimezone('UTC')}>UTC</button>
        <button onClick={() => this.changeTimezone('Pacific/Guadalcanal')}>Pacific/Guadalcanal (UTC +11)</button>
        <button onClick={() => this.changeTimezone('Pacific/Niue')}>Pacific/Niue (UTC -11)</button>
      </div>
    )
  }
}

class MarkedDays extends Component{
  state = {
    oneDay: 24*60*60*1000,
    today: Date.parse(new Date())
  }

  getDates = () => {
    const { today, oneDay } = this.state;
    return [
      today - (oneDay * 7),
      today - (oneDay * 4),
      today - (oneDay * 2),
      today - (oneDay * 1),
      today,
      today + (oneDay * 1),
      today + (oneDay * 2),
      today + (oneDay * 5),
      today + (oneDay * 6),
    ]
  }

  render = () => <Calendar markedDays={this.getDates()} />
}

storiesOf('Calendar', module)
  .add('default', () => <Calendar />)
  .add('onChange', () => <OnChange />)
  .add('default value', () => <Calendar startDate={new Date().getTime()} />)
  .add('default values', () => <DefaultValues />)
  .add('with time', () => <Calendar startDate={new Date().getTime()} displayTime />)
  .add('disable dates', () => <Calendar disableDates={date => date < new Date().getTime()} />)
  .add('input (css)', () => <InputCSS />)
  .add('input (js)', () => <InputJS />)
  .add('timezone', () => <Timezone />)
  .add('marked days', () => <MarkedDays />)
  .add('marked days (func)', () => <Calendar markedDays={date => date < new Date().getTime()} />)
