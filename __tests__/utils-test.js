import { initMonth, parseRange, getDays, dateIsBetween, dateIsOut,
  getDateWithoutTime, dayAreSame } from '../src/utils'
import { expect } from 'chai'

test('Utils - initMonth', () => {
  // Init month for 09 Octobre 1992
  const state = initMonth(718585200000)

  expect(Object.keys(state).length).to.be.equal(5)
  expect(state).to.have.property('firstMonthDay', 717894000000)
  expect(state).to.have.property('lastMonthDay', 720486000000)
  expect(state).to.have.property('firstDayToDisplay', 717634800000)
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
  const days = getDays(718585200000)

  expect(days).to.have.lengthOf(42)
  expect(days).to.be.eql([
    718585200000,
    718671600000,
    718758000000,
    718844400000,
    718930800000,
    719017200000,
    719103600000,
    719190000000,
    719276400000,
    719362800000,
    719449200000,
    719535600000,
    719622000000,
    719708400000,
    719794800000,
    719881200000,
    719967600000,
    720054000000,
    720140400000,
    720226800000,
    720313200000,
    720399600000,
    720486000000,
    720572400000,
    720658800000,
    720745200000,
    720831600000,
    720918000000,
    721004400000,
    721090800000,
    721177200000,
    721263600000,
    721350000000,
    721436400000,
    721522800000,
    721609200000,
    721695600000,
    721782000000,
    721868400000,
    721954800000,
    722041200000,
    722127600000
  ])
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
