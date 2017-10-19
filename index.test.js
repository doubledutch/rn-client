import { colors } from './index'

test('colors.shiftHue is exported', () => {
  const actual = colors.shiftHue('#009acd', 1/3)
  const expected = 'rgb(205,0,154)'
  expect(actual).toEqual(expected)
})