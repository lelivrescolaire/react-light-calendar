import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'

// Components
import Calendar from '../src'

// Utils
import { getDateWithoutTime } from '../src/utils'

export const DAY_LABELS = Object.freeze(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'])
export const MONTH_LABELS = Object.freeze(['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre'])

test('Actions - Click on tommorow day', () => {
  const onChange = spy()
  const calendar = mount(<Calendar onChange={onChange} />)
  const today = new Date()
  const tommorow = today.setDate(today.getDate() + 1)
  const tommorowDay = calendar.find(`.rlc-day-${getDateWithoutTime(tommorow)}`)

  tommorowDay.simulate('click')

  expect(onChange.calledOnce).to.be.equal(true)
  expect(onChange.calledWith(getDateWithoutTime(tommorow), null)).to.be.equal(true)
})

test('Actions - Select range yesterday to tommorow and before today to yesterday', () => {
  const onChange = spy()
  const calendar = mount(<Calendar onChange={onChange} range />)

  // Yesterday to tommorow
  const yesterday = new Date().setDate(new Date().getDate() - 1)
  const yesterdayWithoutTime = getDateWithoutTime(yesterday)
  const yesterdayDay = calendar.find(`.rlc-day-${yesterdayWithoutTime}`)

  const tommorow = new Date().setDate(new Date().getDate() + 1)
  const tommorowWithoutTime = getDateWithoutTime(tommorow)
  const tommorowDay = calendar.find(`.rlc-day-${tommorowWithoutTime}`)

  yesterdayDay.simulate('click')
  calendar.setProps({ startDate: yesterdayWithoutTime })
  tommorowDay.simulate('click')
  calendar.setProps({ endDate: tommorowWithoutTime })

  expect(onChange.calledTwice).to.be.equal(true)
  expect(onChange.firstCall.calledWith(yesterdayWithoutTime, null)).to.be.equal(true)
  expect(onChange.secondCall.calledWith(yesterdayWithoutTime, tommorowWithoutTime)).to.be.equal(true)

  // Today to before yesterday
  const today = new Date()
  const todayWithoutTime = getDateWithoutTime(today)
  const todayDay = calendar.find(`.rlc-day-${todayWithoutTime}`)

  const beforeYesterday = new Date().setDate(new Date().getDate() - 2)
  const beforeYesterdayWithoutTime = getDateWithoutTime(beforeYesterday)
  const beforeYesterdayDay = calendar.find(`.rlc-day-${beforeYesterdayWithoutTime}`)

  todayDay.simulate('click')
  calendar.setProps({ startDate: todayWithoutTime, endDate: null })

  beforeYesterdayDay.simulate('click')
  calendar.setProps({ endDate: beforeYesterdayWithoutTime })

  expect(onChange.callCount).to.be.equal(4)
  expect(onChange.thirdCall.calledWith(todayWithoutTime, null)).to.be.equal(true)
  expect(onChange.lastCall.calledWith(beforeYesterdayWithoutTime, todayWithoutTime)).to.be.equal(true)
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
  const calendar = mount(<Calendar onChange={onChange} startDate={783212400000} displayTime />)
  const hours = calendar.find('.rlc-date-time-selects').childAt(0)
  const minutes = calendar.find('.rlc-date-time-selects').childAt(2)

  // Set hours to 2 and minutes to 30
  hours.simulate('change', { target: { value: '2' } })
  calendar.setProps({ startDate: 783219600000 })
  minutes.simulate('change', { target: { value: '30' } })
  calendar.setProps({ startDate: 783221400000 })

  expect(onChange.calledTwice).to.be.equal(true)
  expect(onChange.firstCall.calledWith(783219600000, null)).to.be.equal(true) // 27 Octobre 1994 at 02:00
  expect(onChange.secondCall.calledWith(783221400000, null)).to.be.equal(true) // 27 Octobre 1994 at 02:30
})

test('Actions - Click next month', () => {
  const calendar = mount(<Calendar dayLabels={DAY_LABELS} monthLabels={MONTH_LABELS} />)
  const nextMonthButton = calendar.find('.rlc-next-month')

  nextMonthButton.simulate('click')

  const monthElement = calendar.find('.rlc-month-and-year')
  const nextMonthIndex = new Date().getMonth() + 1
  const nextMonth = MONTH_LABELS[nextMonthIndex]
  // If nextMonth is in next year add 1 to current year
  const year = new Date().getFullYear() + (nextMonthIndex === 0 ? 1 : 0 )
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
  const year = new Date().getFullYear() - (prevMonthIndex === MONTH_LABELS.length - 1 ? 1 : 0 )
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
