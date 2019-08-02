import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import { advanceTo } from 'jest-date-mock'

import Calendar from '../src'

const NINE_OCTOBER_1992 = 718588800000
const FIRST_OCTOBER_1992 = 717897600000
const LAST_OCTOBER_1992 = 720489600000
const TWENTY_EIGHT_SEPTEMBER_1992 = 717638400000

const TWENTY_SEVEN_OCTOBER_1994 = 783216000000
const FIRST_OCTOBER_1994 = 780969600000
const LAST_OCTOBER_1994 = 783561600000
const TWENTY_SIX_SEPTEMBER_1994 = 780537600000

beforeEach(() => {
  advanceTo(NINE_OCTOBER_1992)
})

test('Action - Set prop startDate (27 October 1994)', () => {
  const calendar = shallow(<Calendar />)

  calendar.setProps({ startDate: TWENTY_SEVEN_OCTOBER_1994 })

  expect(calendar.state('startDate')).to.equal(TWENTY_SEVEN_OCTOBER_1994)
  expect(calendar.state('endDate')).to.equal(null)
  expect(calendar.state('firstDayToDisplay')).to.equal(TWENTY_SIX_SEPTEMBER_1994)
  expect(calendar.state('firstMonthDay')).to.equal(FIRST_OCTOBER_1994)
  expect(calendar.state('lastMonthDay')).to.equal(LAST_OCTOBER_1994)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1994")
})

test('Action - Set prop endDate (27 October 1994)', () => {
  const calendar = shallow(<Calendar />)

  calendar.setProps({ endDate: TWENTY_SEVEN_OCTOBER_1994 })

  expect(calendar.state('startDate')).to.equal(null)
  expect(calendar.state('endDate')).to.equal(TWENTY_SEVEN_OCTOBER_1994)
  expect(calendar.state('firstDayToDisplay')).to.equal(TWENTY_EIGHT_SEPTEMBER_1992)
  expect(calendar.state('firstMonthDay')).to.equal(FIRST_OCTOBER_1992)
  expect(calendar.state('lastMonthDay')).to.equal(LAST_OCTOBER_1992)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1992")
})

test('Action - Click on tommorow day', () => {
  const onChange = spy()
  const calendar = mount(<Calendar onChange={onChange} />)
  const tommorowTimestamp = NINE_OCTOBER_1992 + (1000 * 60 * 60 * 24)
  const tommorow = calendar.find(`.rlc-day-${tommorowTimestamp}`)

  tommorow.simulate('click')

  expect(onChange.calledOnce).to.be.equal(true)
  expect(onChange.calledWith(tommorowTimestamp, null)).to.be.equal(true)
})

test('Action - Click on disabled day', () => {
  const onChange = spy()
  const calendar = mount(<Calendar onChange={onChange} disableDates={date => date < NINE_OCTOBER_1992} />)

  const yesterdayTimestamp = NINE_OCTOBER_1992 - (1000 * 60 * 60 * 24)
  const yesterday = calendar.find(`.rlc-day-${yesterdayTimestamp}`)

  yesterday.simulate('click')
  expect(onChange.callCount).to.be.equal(0)
})

test('Action - Change time', () => {
  const onChange = spy()
  const calendar = mount(<Calendar startDate={NINE_OCTOBER_1992} onChange={onChange} displayTime />)

  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  hours.simulate('change', { target: { value: '02' } })
  minutes.simulate('change', { target: { value: '30' } })

  expect(onChange.calledTwice).to.be.equal(true)
  expect(onChange.firstCall.calledWith(NINE_OCTOBER_1992 + (1000 * 60 * 60 * 2), null)).to.be.equal(true)
  expect(onChange.secondCall.calledWith(NINE_OCTOBER_1992 + (1000 * 60 * 60 * 0.5), null)).to.be.equal(true)
})

test('Action - Click prev month', () => {
  const calendar = mount(<Calendar />)
  const nextMonthButton = calendar.find('.rlc-prev-month')

  nextMonthButton.simulate('click')

  expect(calendar.state('startDate')).to.equal(null)
  expect(calendar.state('endDate')).to.equal(null)
  expect(calendar.state('firstDayToDisplay')).to.equal(715219200000)
  expect(calendar.state('firstMonthDay')).to.equal(715305600000)
  expect(calendar.state('lastMonthDay')).to.equal(717811200000)
  expect(calendar.state('month')).to.equal("09")
  expect(calendar.state('year')).to.equal("1992")
})

test('Action - Click next month', () => {
  const calendar = mount(<Calendar />)
  const nextMonthButton = calendar.find('.rlc-next-month')

  nextMonthButton.simulate('click')

  expect(calendar.state('startDate')).to.equal(null)
  expect(calendar.state('endDate')).to.equal(null)
  expect(calendar.state('firstDayToDisplay')).to.equal(720057600000)
  expect(calendar.state('firstMonthDay')).to.equal(720576000000)
  expect(calendar.state('lastMonthDay')).to.equal(723081600000)
  expect(calendar.state('month')).to.equal("11")
  expect(calendar.state('year')).to.equal("1992")
})

test('Action - Click prev year', () => {
  const calendar = mount(<Calendar />)
  const nextMonthButton = calendar.find('.rlc-prev-year')

  nextMonthButton.simulate('click')

  expect(calendar.state('startDate')).to.equal(null)
  expect(calendar.state('endDate')).to.equal(null)
  expect(calendar.state('firstDayToDisplay')).to.equal(686188800000)
  expect(calendar.state('firstMonthDay')).to.equal(686275200000)
  expect(calendar.state('lastMonthDay')).to.equal(688867200000)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1991")
})

test('Action - Click next year', () => {
  const calendar = mount(<Calendar />)
  const nextMonthButton = calendar.find('.rlc-next-year')

  nextMonthButton.simulate('click')

  expect(calendar.state('startDate')).to.equal(null)
  expect(calendar.state('endDate')).to.equal(null)
  expect(calendar.state('firstDayToDisplay')).to.equal(749088000000)
  expect(calendar.state('firstMonthDay')).to.equal(749433600000)
  expect(calendar.state('lastMonthDay')).to.equal(752025600000)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1993")
})
