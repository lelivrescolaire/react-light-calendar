import { initMonth, parseRange, getDays, dateIsBetween, dateIsOut,
  getDateWithoutTime } from '../src/utils'
import { expect } from 'chai'

test('Utils - initMonth', () => {
  // Init month for 09 Octobre 1992
  const state = initMonth(718588800000)

  expect(Object.keys(state).length).to.be.equal(5)
  expect(state).to.have.property('firstMonthDay', 717897600000)
  expect(state).to.have.property('lastMonthDay', 720489600000)
  expect(state).to.have.property('firstDayToDisplay', 717638400000)
  expect(state).to.have.property('month', '10')
  expect(state).to.have.property('year', '1992')
})

test('Utils - parseRange', () => {
  // parse 09 Octobre 1992 and 08 Juillet 2016
  const state = parseRange(718585200000, 1467993600000)

  expect(state).to.have.property('startDate', 718585200000)
  expect(state).to.have.property('endDate', 1467993600000)
})

test('Utils - parseRange with inverted dates', () => {
  // parse 08 Juillet 2016 and 09 Octobre 1992
  const state = parseRange(1467993600000, 718585200000)

  expect(state).to.have.property('startDate', 718585200000)
  expect(state).to.have.property('endDate', 1467993600000)
})

test('Utils - getDays', () => {
  // Get days from September 1992 month
  const days = getDays(717638400000, 720489600000)

  expect(days).to.be.eql([
    717638400000,
    717724800000,
    717811200000,
    717897600000,
    717984000000,
    718070400000,
    718156800000,
    718243200000,
    718329600000,
    718416000000,
    718502400000,
    718588800000,
    718675200000,
    718761600000,
    718848000000,
    718934400000,
    719020800000,
    719107200000,
    719193600000,
    719280000000,
    719366400000,
    719452800000,
    719539200000,
    719625600000,
    719712000000,
    719798400000,
    719884800000,
    719971200000,
    720057600000,
    720144000000,
    720230400000,
    720316800000,
    720403200000,
    720489600000,
    720576000000
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
  const dateWithoutTime = getDateWithoutTime(1468000800000)
  expect(dateWithoutTime).to.be.equal(1467936000000)
})
