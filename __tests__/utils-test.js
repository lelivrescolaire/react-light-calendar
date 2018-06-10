import { initMonth, parseRange, getDays, dateIsBetween, dateIsOut,
 getDateWithoutTime, dayAreSame, extendTime } from '../src/utils'
import { expect } from 'chai'

test('Utils - initMonth', () => {
  // Init month for 09 Octobre 1992
  const state = initMonth(718585200000)

  expect(Object.keys(state).length).to.be.equal(6)
  expect(state).to.have.property('firstMonthDay', 717894000000)
  expect(state).to.have.property('lastMonthDay', 720486000000)
  expect(state).to.have.property('firstDayToDisplay', 717634800000)
  expect(state).to.have.property('lastDayToDisplay', 721177200000)
  expect(state).to.have.property('month', 9)
  expect(state).to.have.property('year', 1992)
})

test('Utils - parseRange', () => {
  // parse 09 Octobre 1992 and 08 Juillet 2016
  const state = parseRange(718585200000, 1467993600000, true)

  expect(state).to.have.property('startDate', 718585200000)
  expect(state).to.have.property('endDate', 1467993600000)
})

test('Utils - parseRange with inverted dates', () => {
  // parse 08 Juillet 2016 and 09 Octobre 1992
  const state = parseRange(1467993600000, 718585200000, true)

  expect(state).to.have.property('startDate', 718585200000)
  expect(state).to.have.property('endDate', 1467993600000)
})

test('Utils - parseRange with range = false', () => {
  // parse 09 Octobre 1992 and 08 Juillet 2016
  const state = parseRange(718585200000, 1467993600000, false)

  expect(state).to.have.property('startDate', 718585200000)
  expect(state).to.have.property('endDate', null)
})

test('Utils - getDays', () => {
  // Get all days from 09 Octobre 1992 to 12 Octobre 1992
  const days = getDays(718585200000, 718844400000)

  expect(days).to.have.lengthOf(4)
  expect(days).to.be.eql([718585200000, 718671600000, 718758000000, 718844400000])
})

test('Utils - dateIsBetween => true', () => {
  // 10 Octobre 1992 is between 09 Octobre 1992 and 12 Octobre 1992 ?
  const isBetween = dateIsBetween(718671600000, 718585200000, 718844400000)
  expect(isBetween).to.be.equal(true)
})

test('Utils - dateIsBetween => false', () => {
  // 12 Octobre 1992 is between 09 Octobre 1992 and 11 Octobre 1992 ?
  const isBetween = dateIsBetween(718844400000, 718585200000, 718758000000)
  expect(isBetween).to.be.equal(false)
})

test('Utils - dateIsOut => true', () => {
  // 12 Octobre 1992 is not between of 09 Octobre 1992 and 11 Octobre 1992 ?
  const isBetween = dateIsOut(718844400000, 718585200000, 718758000000)
  expect(isBetween).to.be.equal(true)
})

test('Utils - dateIsOut => false', () => {
  // 10 Octobre 1992 is not between 09 Octobre 1992 and 12 Octobre 1992 ?
  const isBetween = dateIsOut(718671600000, 718585200000, 718844400000)
  expect(isBetween).to.be.equal(false)
})

test('Utils - getDateWithoutTime', () => {
  // 08 Juillet 2016 at 18:00 to 08 Juillet 2016 at 00:00
  const dateWithoutTime = getDateWithoutTime(1467993600000)
  expect(dateWithoutTime).to.be.equal(1467928800000)
})

test('Utils - dayAreSame => true', () => {
  // 09 Octobre 1992 at 2:30 is 09 Octobre 1992 at 0:0 ?
  const areSame = dayAreSame(718594200000, 718585200000)
  expect(areSame).to.be.equal(true)
})

test('Utils - dayAreSame => false', () => {
  // 09 Octobre 1992 at 2:30 is 27 Octobre 1994 at 2:30 ?
  const areSame = dayAreSame(718585200000, 783221400000)
  expect(areSame).to.be.equal(false)
})

test('Utils - extendTime', () => {
  // Extends time of 09 Octobre 1992 at 2:30 to is 27 Octobre 1994 at 00:00?
  const date = extendTime(718594200000, 783212400000)
  expect(date).to.be.equal(783221400000) // 27 Octobre 1994 at 2:30
})

