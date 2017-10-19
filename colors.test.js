import { shiftHue } from './colors'

test('shiftHue shifts #009acd by 1/3', () => {
  const actual = shiftHue('#009acd', 1/3)
  const expected = 'rgb(205,0,154)'
  expect(actual).toEqual(expected)
})