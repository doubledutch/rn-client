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

import {translate as t, setLocale, useStrings} from '.'

const strings = {
  "": {
    "greet": "Hello, ${name}"
  },
  "de": {
    "greet": "Hallo, ${name}"
  },
  "de-DE": {
    "greet": "Guten Tag, ${name}"
  }
}

test('translation uses specific language-region, if available', () => {
  setLocale({language: 'de', region: 'DE'})
  useStrings(strings)
  expect(t('greet', {name: 'Adam'})).toEqual('Guten Tag, Adam')
})

test('translation uses language, if specific region unavailable', () => {
  setLocale("de-CH")
  useStrings(strings)
  expect(t('greet', {name: 'Adam'})).toEqual('Hallo, Adam')
})

test('translation falls back to default, if specific language and language-region unavailable', () => {
  setLocale("es-ES")
  useStrings(strings)
  expect(t('greet', {name: 'Adam'})).toEqual('Hello, Adam')
})

test('translation returns empty string for nonexistent keys', () => {
  setLocale("de-DE")
  useStrings(strings)
  expect(t('not_found', {name: 'Adam'})).toEqual('')
})

test('setLocale accepts "de-DE" string', () => {
  setLocale('de-DE')
  useStrings(strings)
  expect(t('greet', {name: 'Adam'})).toEqual('Guten Tag, Adam')
})

test('setLocale accepts "de_DE" string', () => {
  setLocale('de_DE')
  useStrings(strings)
  expect(t('greet', {name: 'Adam'})).toEqual('Guten Tag, Adam')
})
