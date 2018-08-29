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

import {locale, parseLocale} from './locale'

let s = {}
export function useStrings(localeToStrings) {
  s = localeToStrings
}

let loc = locale
export function setLocale(locale) {
  if (!locale) return
  loc = locale.length
    ? parseLocale(locale)
    : {language: locale.language || '', region: locale.region || ''}
}

export default function translate(key, params) {
  const template = templateFrom(s[`${loc.language}-${loc.region}`], key) || templateFrom(s[loc.language], key) || templateFrom(s[''], key)
  if (!template) {
    console.warn(`Missing i18n string '${key}'`)
    return ''
  }
  return replace(template, params)
}

function templateFrom(strings, key) {
  if (!strings) return null
  return strings[key]
}

const replaceRegex = /\$\{([a-zA-Z0-9_]+)\}/g
function replace(template, params = {}) {
  if (!template) return ''
  return template.replace(replaceRegex, (match, key, offset, string) => {
    const val = params[key]
    if (val === undefined) console.warn(`Param '${key}' not supplied for i18n for string: ${string}`)
    return val == null ? '' : val
  })
}
