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

import baseClient from '@doubledutch/base-client'
export { TitleBar } from './TitleBar'
export { Avatar } from './Avatar'
export { JavascriptSdkWebView } from './JavascriptSdkWebView'
import _Color from './Color'
export const Color = _Color

import { setEmulated } from './TitleBar'
import bindings from './bindings'
import emulatorShim from './emulatorShim'

const DD = bindings || emulatorShim
if (DD.isEmulated) setEmulated()

const client = baseClient(DD)
setAdditionalColors(client)
export default client

// Enables switching options in the emulator in order to access a real event.
// A valid access token for the event is needed, which can be grabbed from
// the network traffic in the HTML5 app for the desired event.
//
// Options:
// - accessToken  |
// - apiRootURL   | These 3 options are all required to access a real event.
// - eventId      |
//
// - currentUser    Modifications that should be applied to the currentUser.
// - primaryColor   Set a new primary color in the emulator.
//
export function setOptions({ accessToken, apiRootURL, eventId, currentUser, primaryColor }) {
  const newDD = Object.assign({}, DD)

  if (accessToken && apiRootURL && eventId) {
    newDD.isEmulated = false // We are shimming enough to make API requests work
    newDD.apiRootURL = apiRootURL
    newDD.currentEvent.id = eventId
    newDD.requestAccessToken = function (callback) {
      callback(null, accessToken)
    }
  }
  
  const newClient = baseClient(newDD)
  if (currentUser) newClient.currentUser = { ...newClient.currentUser, ...currentUser }
  
  if (primaryColor) {
    newClient.primaryColor = primaryColor
    setAdditionalColors(newClient)
  }
  
  // Keep the client reference the same, but merge in updated properties based on options.
  Object.assign(client, newClient)
}

function setAdditionalColors(client) {
  client.secondaryColor = new _Color(client.primaryColor).shiftHue(-1/3).limitLightness(0.8).rgbString()
  client.tertiaryColor = new _Color(client.primaryColor).shiftHue(1/3).limitLightness(0.8).rgbString()  
}
