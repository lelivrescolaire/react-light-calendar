import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { advanceTo } from 'jest-date-mock';

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

test('Default - Inital states (09 October 1992)', () => {
  const calendar = shallow(<Calendar />)

  expect(calendar.state('startDate')).to.equal(null)
  expect(calendar.state('endDate')).to.equal(null)
  expect(calendar.state('firstDayToDisplay')).to.equal(TWENTY_EIGHT_SEPTEMBER_1992)
  expect(calendar.state('firstMonthDay')).to.equal(FIRST_OCTOBER_1992)
  expect(calendar.state('lastMonthDay')).to.equal(LAST_OCTOBER_1992)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1992")
})

test('Default - Set startDate prop (27 October 1994)', () => {
  const calendar = shallow(<Calendar startDate={TWENTY_SEVEN_OCTOBER_1994} />)

  expect(calendar.state('startDate')).to.equal(TWENTY_SEVEN_OCTOBER_1994)
  expect(calendar.state('endDate')).to.equal(null)
  expect(calendar.state('firstDayToDisplay')).to.equal(TWENTY_SIX_SEPTEMBER_1994)
  expect(calendar.state('firstMonthDay')).to.equal(FIRST_OCTOBER_1994)
  expect(calendar.state('lastMonthDay')).to.equal(LAST_OCTOBER_1994)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1994")
})

test('Default - Set startDate (09 October 1992) and endDate props (27 Octobre 1994)', () => {
  const calendar = shallow(<Calendar startDate={NINE_OCTOBER_1992} endDate={TWENTY_SEVEN_OCTOBER_1994} />)

  expect(calendar.state('startDate')).to.equal(NINE_OCTOBER_1992)
  expect(calendar.state('endDate')).to.equal(TWENTY_SEVEN_OCTOBER_1994)
  expect(calendar.state('firstDayToDisplay')).to.equal(TWENTY_EIGHT_SEPTEMBER_1992)
  expect(calendar.state('firstMonthDay')).to.equal(FIRST_OCTOBER_1992)
  expect(calendar.state('lastMonthDay')).to.equal(LAST_OCTOBER_1992)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1992")
})

test('Default - Set startDate (09 October 1992), endDate props (27 Octobre 1994) and timezone (Pacific/Guadalcanal)', () => {
  const calendar = shallow(<Calendar startDate={NINE_OCTOBER_1992} endDate={TWENTY_SEVEN_OCTOBER_1994} timezone='Pacific/Guadalcanal' />)

  expect(calendar.state('startDate')).to.equal(NINE_OCTOBER_1992)
  expect(calendar.state('endDate')).to.equal(TWENTY_SEVEN_OCTOBER_1994)
  expect(calendar.state('firstDayToDisplay')).to.equal(717598800000)
  expect(calendar.state('firstMonthDay')).to.equal(717858000000)
  expect(calendar.state('lastMonthDay')).to.equal(720450000000)
  expect(calendar.state('month')).to.equal("10")
  expect(calendar.state('year')).to.equal("1992")
})
