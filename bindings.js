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

import { NativeModules, Platform } from 'react-native'

export default Platform.select({ ios, android })()

export function ios() {
  return NativeModules.DDBindings || null
}

export function android() {
  if (!NativeModules.DDBindings) return null

  const needsParse = (typeof NativeModules.DDBindings.currentUser === 'string')
  return Object.assign({}, NativeModules.DDBindings, {
    currentEvent: needsParse ? JSON.parse(NativeModules.DDBindings.currentEvent) : NativeModules.DDBindings.currentEvent,
    currentUser: needsParse ? JSON.parse(NativeModules.DDBindings.currentUser) : NativeModules.DDBindings.currentUser
  })
}
