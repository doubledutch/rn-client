import { shiftHue } from './colors'

test('shiftHue shifts #009acd by 1/3', () => {
  const actual = shiftHue('#009acd', 1/3)
  const expected = 'rgb(205,0,154)'
  expect(actual).toEqual(expected)
})

test('shiftHue shifts #abc by 1/3', () => {
  const actual = shiftHue('#abc', 1/3)
  const expected = 'rgb(204,170,187)'
  expect(actual).toEqual(expected)
})

test('shiftHue shifts rgb(0, 154, 205) by 1/3', () => {
  const actual = shiftHue('rgb(0, 154, 205)', 1/3)
  const expected = 'rgb(205,0,154)'
  expect(actual).toEqual(expected)
})

test('shiftHue shifts garbage to black', () => {
  const actual = shiftHue('garbage', 1/3)
  const expected = 'rgb(0,0,0)'
  expect(actual).toEqual(expected)
})

test('shiftHue shifts #009acd by -1/3', () => {
  const actual = shiftHue('#009acd', -1/3)
  const expected = 'rgb(154,205,0)'
  expect(actual).toEqual(expected)
})

test('shiftHue shifts #009acd by 0 (unchanged)', () => {
  const actual = shiftHue('#009acd', 0)
  const expected = 'rgb(0,154,205)'
  expect(actual).toEqual(expected)
})

test('shiftHue shifts #009acd by 1 (unchanged)', () => {
  const actual = shiftHue('#009acd', 1)
  const expected = 'rgb(0,154,205)'
  expect(actual).toEqual(expected)
})

test('shiftHue shifts #009acd by 1/2', () => {
  const actual = shiftHue('#009acd', 1/2)
  const expected = 'rgb(205,51,0)'
  expect(actual).toEqual(expected)
})