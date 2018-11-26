/* eslint-disable no-undef */
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
  // Set startDate to Thursday 27 Octobre 1994
  const calendar = mount(<Calendar startDate={783216000000} />)
  const startDay = calendar.find('.rlc-day-783216000000')

  expect(startDay.hasClass('rlc-day-selected')).to.equal(true)

  const day = calendar.find('.rlc-detail-day')
  const number = calendar.find('.rlc-date-number')
  const month = calendar.find('.rlc-detail-month-year')

  expect(day.text()).to.equal('Thursday')
  expect(number.text()).to.equal('27')
  expect(month.text()).to.equal('October 1994')
})

test('Default - Set startDate and endDate props', () => {
  // Set startDate to Friday 09 Octobre 1992 and endDate to Sunday 11 Octobre 1992
  const calendar = mount(<Calendar startDate={718588800000} endDate={718761600000} />)
  const startDay = calendar.find('.rlc-day-718588800000')
  const endDay = calendar.find('.rlc-day-718761600000')
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
  expect(startDetailNumber.text()).to.equal('09')
  expect(startDetailMonth.text()).to.equal('October 1992')

  expect(endDetailDay.text()).to.equal('Sunday')
  expect(endDetailNumber.text()).to.equal('11')
  expect(endDetailMonth.text()).to.equal('October 1992')
})

test('Default - Set startDate and displayTime props', () => {
  // Set startDate to Friday 08 Juillet 2016 at 18:00
  const calendar = mount(<Calendar startDate={1468000800000} displayTime />)
  const startDay = calendar.find(`.rlc-day-${getDateWithoutTime(1468000800000)}`)

  expect(startDay.hasClass('rlc-day-selected')).to.equal(true)

  const day = calendar.find('.rlc-detail-day')
  const number = calendar.find('.rlc-date-number')
  const month = calendar.find('.rlc-detail-month-year')
  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  expect(day.text()).to.equal('Friday')
  expect(number.text()).to.equal('08')
  expect(month.text()).to.equal('July 2016')
  expect(hours.props().value).to.equal('18')
  expect(minutes.props().value).to.equal('00')
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

test('Actions - Default Timezone', () => {
  // UTC : 5 november 2018 08:58
  const now = 1541408286594
  const calendar = mount(<Calendar displayTime startDate={now} />)

  const day = calendar.find('.rlc-detail-day')
  const number = calendar.find('.rlc-date-number')
  const month = calendar.find('.rlc-detail-month-year')
  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  expect(day.text()).to.equal('Monday')
  expect(number.text()).to.equal('05')
  expect(month.text()).to.equal('November 2018')
  expect(hours.props().value).to.equal('08')
  expect(minutes.props().value).to.equal('58')
})

test('Actions - Pacific/Guadalcanal Timezone', () => {
  // Pacific/Guadalcanal : 5 november 2018 19:58
  const now = 1541408286594
  const calendar = mount(<Calendar displayTime startDate={now} timezone='Pacific/Guadalcanal' />)

  const day = calendar.find('.rlc-detail-day')
  const number = calendar.find('.rlc-date-number')
  const month = calendar.find('.rlc-detail-month-year')
  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  expect(day.text()).to.equal('Monday')
  expect(number.text()).to.equal('05')
  expect(month.text()).to.equal('November 2018')
  expect(hours.props().value).to.equal('19')
  expect(minutes.props().value).to.equal('58')
})

test('Actions - Change timezone', () => {
  // Pacific/Niue : 4 november 2018 21:58
  const now = 1541408286594
  const calendar = mount(<Calendar displayTime startDate={now} timezone='Pacific/Niue' />)

  const day = calendar.find('.rlc-detail-day')
  const number = calendar.find('.rlc-date-number')
  const month = calendar.find('.rlc-detail-month-year')
  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  expect(day.text()).to.equal('Sunday')
  expect(number.text()).to.equal('04')
  expect(month.text()).to.equal('November 2018')
  expect(hours.props().value).to.equal('21')
  expect(minutes.props().value).to.equal('58')
})
