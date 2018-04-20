/*
 * Copyright 2018 DoubleDutch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Color from './Color'

test('constructor parses #009acd', () => {
  expect(new Color('#009acd').rgbString()).toEqual('rgb(0,154,205)')
})

test('constructor parses #aaaaaa', () => {
  expect(new Color('#aaaaaa').rgbString()).toEqual('rgb(170,170,170)')
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

test('minLightness brightens rgb(0,191,77)', () => {
  expect(new Color('rgb(0,191,77)').minLightness(0.9).rgbString()).toEqual('rgb(0,230,93)')
})

test('limitLightness leaves already-dark-enough #aaaaaa unchanged', () => {
  expect(new Color('#aaaaaa').limitLightness(0.75).rgbString()).toEqual('rgb(170,170,170)')
})

test('limitSaturation dulls rgb(0,255,102)', () => {
  expect(new Color('rgb(0,255,102)').limitSaturation(0.75).rgbString()).toEqual('rgb(64,255,140)')
})

test('minSaturation brightens rgb(64,255,140)', () => {
  expect(new Color('rgb(64,255,140)').minSaturation(0.9).rgbString()).toEqual('rgb(25,255,117)')
})
