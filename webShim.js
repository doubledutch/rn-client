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

const bearerPrefix = 'Bearer '
export function install(onReady) {
  global.DD.Events.onReady(() => {
    global.DD.Events.getCurrentUserAsync((userJSON) => {
      global.DD.Events.getCurrentEventAsync((eventJSON) => {
        onReady(
          {
            primaryColor : '#000',
            currentUser  : userJSON,
            currentEvent : eventJSON,
            configuration: eventJSON,
            apiRootURL   : 'https://',
            bundleURL    : null,
            setTitle() {
              console.warn('setTitle not implemented on web')
            },
            requestAccessToken(callback) {
              global.DD.Events.getSignedAPIAsync('', '', (url, auth) => {
                callback(null, auth.substring(bearerPrefix.length, auth.length))
              })
            },
            refreshAccessToken(token, callback) {
              global.DD.Events.getSignedAPIAsync('', '', (url, auth) => {
                callback(null, auth.substring(bearerPrefix.length, auth.length))
              })
            },
            canOpenURL(url, callback) {
              callback(null, true)
            },
            openURL(url) {
              document.location = url
            },
            showMenu(url) {
              return
            },
            setNavigationBarHidden(hidden, animated) {
              return
            }
          }
        )
      })
    })
  })
}