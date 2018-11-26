/* eslint-disable no-undef */
import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import t from 'timestamp-utils'

// Components
import Calendar from '../src'

// Utils
import { getDateWithoutTime } from '../src/utils'

const DAY_LABELS = Object.freeze(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'])
const MONTH_LABELS = Object.freeze(['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre'])

test('Actions - Click on tommorow day', () => {
  const onChange = spy()
  const calendar = mount(<Calendar onChange={onChange} />)
  const today = calendar.find('.rlc-day-today')
  const [, todayTimestamp] = today.props().className.match(/rlc-day-(\d{13})/)
  const tommorowTimestamp = t.addDays(parseInt(todayTimestamp, 10), 1)
  const tommorow = calendar.find(`.rlc-day-${tommorowTimestamp}`)

  tommorow.simulate('click')

  expect(onChange.calledOnce).to.be.equal(true)
  expect(onChange.calledWith(tommorowTimestamp, null)).to.be.equal(true)
})

test('Actions - Select "yesterday to tommorow" and "today to before yesterday"', () => {
  const onChange = spy()
  const calendar = mount(<Calendar onChange={onChange} />)

  const today = calendar.find('.rlc-day-today')
  const [, timestamp] = today.props().className.match(/rlc-day-(\d{13})/)
  const todayTimestamp = parseInt(timestamp, 10)

  // Yesterday to tommorow
  const yesterdayTimestamp = t.addDays(todayTimestamp, -1)
  const yesterday = calendar.find(`.rlc-day-${yesterdayTimestamp}`)

  const tommorowTimestamp = t.addDays(todayTimestamp, 1)
  const tommorow = calendar.find(`.rlc-day-${tommorowTimestamp}`)

  yesterday.simulate('click')
  calendar.setProps({ startDate: yesterdayTimestamp })
  tommorow.simulate('click')
  calendar.setProps({ endDate: tommorowTimestamp })

  expect(onChange.calledTwice).to.be.equal(true)
  expect(onChange.firstCall.calledWith(yesterdayTimestamp, null)).to.be.equal(true)
  expect(onChange.secondCall.calledWith(yesterdayTimestamp, tommorowTimestamp)).to.be.equal(true)

  // Today to before yesterday
  const beforeYesterdayTimestamp = t.addDays(parseInt(yesterdayTimestamp, 10), -1)
  const beforeYesterday = calendar.find(`.rlc-day-${beforeYesterdayTimestamp}`)

  today.simulate('click')
  calendar.setProps({ startDate: todayTimestamp, endDate: null })
  beforeYesterday.simulate('click')
  calendar.setProps({ endDate: beforeYesterdayTimestamp })

  expect(onChange.callCount).to.be.equal(4)
  expect(onChange.thirdCall.calledWith(todayTimestamp, null)).to.be.equal(true)
  expect(onChange.lastCall.calledWith(beforeYesterdayTimestamp, todayTimestamp)).to.be.equal(true)
})

test('Actions - Click on disabled day', () => {
  const onChange = spy()
  const calendar = mount(<Calendar onChange={onChange} disableDates={date => date < new Date().getTime()} />)

  const today = new Date()
  const yesterday = today.setDate(today.getDate() - 1)
  const yesterdayWithoutTime = getDateWithoutTime(yesterday)
  const yesterdayDay = calendar.find(`.rlc-day-${yesterdayWithoutTime}`)

  yesterdayDay.simulate('click')
  expect(onChange.callCount).to.be.equal(0)
})

test('Actions - Change time', () => {
  const onChange = spy()
  // Set startDate to Jeudi 27 Octobre 1994 at 00:00
  const calendar = mount(<Calendar onChange={onChange} startDate={783216000000} displayTime />)
  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  // Set hours to 2 and minutes to 30
  hours.simulate('change', { target: { value: '02' } })
  calendar.setProps({ startDate: 783223200000 })
  minutes.simulate('change', { target: { value: '30' } })
  calendar.setProps({ startDate: 783225000000 })

  expect(onChange.calledTwice).to.be.equal(true)
  expect(onChange.firstCall.calledWith(783223200000, null)).to.be.equal(true) // 27 Octobre 1994 at 02:00
  expect(onChange.secondCall.calledWith(783225000000, null)).to.be.equal(true) // 27 Octobre 1994 at 02:30
})

test('Actions - Click next month', () => {
  const calendar = mount(<Calendar dayLabels={DAY_LABELS} monthLabels={MONTH_LABELS} />)
  const nextMonthButton = calendar.find('.rlc-next-month')

  nextMonthButton.simulate('click')

  const monthElement = calendar.find('.rlc-month-and-year')
  const nextMonthIndex = new Date().getMonth() + 1
  const nextMonth = MONTH_LABELS[nextMonthIndex]
  // If nextMonth is in next year add 1 to current year
  const year = new Date().getFullYear() + (nextMonthIndex === 0 ? 1 : 0)
  expect(monthElement.text()).to.be.equal(`${nextMonth} ${year}`)
})

test('Actions - Click prev month', () => {
  const calendar = mount(<Calendar dayLabels={DAY_LABELS} monthLabels={MONTH_LABELS} />)
  const prevMonthButton = calendar.find('.rlc-prev-month')

  prevMonthButton.simulate('click')

  const monthElement = calendar.find('.rlc-month-and-year')
  const prevMonthIndex = new Date().getMonth() - 1
  const prevMonth = MONTH_LABELS[prevMonthIndex]
  // If prevMonth is in previous year substract 1 to current year
  const year = new Date().getFullYear() - (prevMonthIndex === MONTH_LABELS.length - 1 ? 1 : 0)
  expect(monthElement.text()).to.be.equal(`${prevMonth} ${year}`)
})

test('Actions - Click next year', () => {
  const calendar = mount(<Calendar dayLabels={DAY_LABELS} monthLabels={MONTH_LABELS} />)
  const nextYearButton = calendar.find('.rlc-next-year')

  nextYearButton.simulate('click')

  const yearElement = calendar.find('.rlc-month-and-year')
  const month = MONTH_LABELS[new Date().getMonth()]
  const nextYear = new Date().getFullYear() + 1
  expect(yearElement.text()).to.be.equal(`${month} ${nextYear}`)
})

test('Actions - Click prev year', () => {
  const calendar = mount(<Calendar dayLabels={DAY_LABELS} monthLabels={MONTH_LABELS} />)
  const prevYearButton = calendar.find('.rlc-prev-year')

  prevYearButton.simulate('click')

  const yearElement = calendar.find('.rlc-month-and-year')
  const month = MONTH_LABELS[new Date().getMonth()]
  const prevYear = new Date().getFullYear() - 1
  expect(yearElement.text()).to.be.equal(`${month} ${prevYear}`)
})
