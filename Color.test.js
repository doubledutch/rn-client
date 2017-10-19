import Color from './Color'

test('constructor parses #009acd', () => {
  expect(new Color('#009acd').rgbString()).toEqual('rgb(0,154,205)')
})

test('shiftHue shifts #009acd by 1/3', () => {
  expect(new Color('#009acd').shiftHue(1/3).rgbString()).toEqual('rgb(205,0,154)')
})

test('shiftHue shifts #abc by 1/3', () => {
  expect(new Color('#abc').shiftHue(1/3).rgbString()).toEqual('rgb(204,170,187)')
})

test('constructor parses rgb(0, 154, 205)', () => {
  expect(new Color('rgb(0, 154, 205)').rgbString()).toEqual('rgb(0,154,205)')
})

test('constructor parses garbage as black', () => {
  expect(new Color('garbage').rgbString()).toEqual('rgb(0,0,0)')
})

test('shiftHue shifts rgb(0,154,205) by -1/3', () => {
  expect(new Color('rgb(0,154,205)').shiftHue(-1/3).rgbString()).toEqual('rgb(154,205,0)')
})

test('shiftHue shifts rgb(0,154,205) by 0 (unchanged)', () => {
  expect(new Color('rgb(0,154,205)').shiftHue(0).rgbString()).toEqual('rgb(0,154,205)')
})

test('shiftHue shifts rgb(0,154,205) by 1 (unchanged)', () => {
  expect(new Color('rgb(0,154,205)').shiftHue(0).rgbString()).toEqual('rgb(0,154,205)')
})

test('shiftHue shifts rgb(0,154,205) by 1/2', () => {
  expect(new Color('rgb(0,154,205)').shiftHue(1/2).rgbString()).toEqual('rgb(205,51,0)')
})

test('limitLightness darkens rgb(0,255,102)', () => {
  expect(new Color('rgb(0,255,102)').limitLightness(0.75).rgbString()).toEqual('rgb(0,191,77)')
})
