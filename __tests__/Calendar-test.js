import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

// Components
import Calendar from '../src'

// Utils
import { getDateWithoutTime } from '../src/utils'

test('Default - Current day element has currect classname', () => {
  const calendar = shallow(<Calendar />)
  const classname = `.rlc-day-${getDateWithoutTime(new Date().getTime())}`
  const currentDay = calendar.find(classname)

  expect(currentDay.hasClass('rlc-day-today')).to.equal(true)
})

test('Default - Set startDate prop', () => {
  // Set startDate to Jeudi 27 Octobre 1994
  const calendar = mount(<Calendar startDate={783212400000} />)
  const startDay = calendar.find('.rlc-day-783212400000')

  expect(startDay.hasClass('rlc-day-selected')).to.equal(true)

  const day = calendar.find('.rlc-detail-day')
  const number = calendar.find('.rlc-date-number')
  const month = calendar.find('.rlc-detail-month-year')

  expect(day.text()).to.equal('Thursday')
  expect(number.text()).to.equal('27')
  expect(month.text()).to.equal('October 1994')
})

test('Default - Set startDate and endDate props', () => {
  // Set startDate to Vendredi 09 Octobre 1992 and endDate to Dimanche 11 Octobre 1992
  const calendar = mount(<Calendar startDate={718585200000} endDate={718758000000} range />)
  const startDay = calendar.find('.rlc-day-718585200000')
  const endDay = calendar.find('.rlc-day-718758000000')
  expect(startDay.hasClass('rlc-day-start-selection')).to.equal(true)
  expect(endDay.hasClass('rlc-day-end-selection')).to.equal(true)

  const startDetail = calendar.find('.rlc-date-details-wrapper').at(0)
  const endDetail = calendar.find('.rlc-date-details-wrapper').at(1)

  const startDetailDay = startDetail.find('.rlc-detail-day')
  const startDetailNumber = startDetail.find('.rlc-date-number')
  const startDetailMonth = startDetail.find('.rlc-detail-month-year')

  const endDetailDay = endDetail.find('.rlc-detail-day')
  const endDetailNumber = endDetail.find('.rlc-date-number')
  const endDetailMonth = endDetail.find('.rlc-detail-month-year')

  expect(startDetailDay.text()).to.equal('Friday')
  expect(startDetailNumber.text()).to.equal('9')
  expect(startDetailMonth.text()).to.equal('October 1992')

  expect(endDetailDay.text()).to.equal('Sunday')
  expect(endDetailNumber.text()).to.equal('11')
  expect(endDetailMonth.text()).to.equal('October 1992')
})

test('Default - Set startDetail and displayTime props', () => {
  // Set startDate to Vendredi 08 Juillet 2016 at 18:00
  const calendar = mount(<Calendar startDate={1467993600000} displayTime />)
  const startDay = calendar.find('.rlc-day-1467928800000')

  expect(startDay.hasClass('rlc-day-selected')).to.equal(true)

  const day = calendar.find('.rlc-detail-day')
  const number = calendar.find('.rlc-date-number')
  const month = calendar.find('.rlc-detail-month-year')
  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  expect(day.text()).to.equal('Friday')
  expect(number.text()).to.equal('8')
  expect(month.text()).to.equal('July 2016')
  expect(hours.props().value).to.equal(18)
  expect(minutes.props().value).to.equal(0)
})

test('Default - Set disableDates prop', () => {
  // Disable all passed days
  const today = new Date()
  const yesterday = today.setDate(today.getDate() - 1)
  const calendar = mount(<Calendar disableDates={date => date < new Date().getTime()} />)
  const yesterdayDay = calendar.find(`.rlc-day-${getDateWithoutTime(yesterday)}`)

  expect(yesterdayDay.hasClass('rlc-day-disabled')).to.equal(true)
})


test('Default - Set custom props', () => {
  const calendar = mount(<Calendar id='random-id' />)
  const calendarElement = calendar.find('.rlc-calendar')

  expect(calendarElement.prop('id')).to.equal('random-id')
})
