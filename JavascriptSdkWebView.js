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

import React, { Component } from 'react'
import ReactNative, { View, WebView } from 'react-native'

export class JavascriptSdkWebView extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const { client } = this.props
    if (client) {
      client.getToken().then(token => this.setState({ inject: injectCode(client, token) }))
    }
  }

  render() {
    const { token, inject } = this.state

    return inject
      ? <WebView injectedJavaScript={inject} source={this.props.source} style={this.props.style} />
      : <View style={this.props.style} />
  }
}

function injectCode(client, token) {
  const bindings = client._b || {}
  const toInject = `
window.DD.Events.getCurrentUserImplementation = function() {
  this.getCurrentUserCallback(${JSON.stringify(bindings.currentUser)});
};
window.DD.Events.getCurrentEventImplementation = function() {
  this.getCurrentEventCallback(${JSON.stringify(bindings.currentEvent)});
};
window.DD.Events.getSignedAPIImplementation = function(apiFragment, postBody) {
  var joinOperator = apiFragment.indexOf("?") > 0 ? "&" : "?";
  var signedUrl = ${JSON.stringify(bindings.apiRootURL)} ${bindings.apiRootURL[bindings.apiRootURL.length-1] == '/' ? '' : '+ "/"'} + (apiFragment[0] == '/' ? apiFragment.substring(1) : apiFragment) + joinOperator + 'sdk=true&applicationid=' + ${JSON.stringify(client.currentEvent.id)};
  var authHeader = 'Bearer ' + ${JSON.stringify(token)}
  this.getSignedAPICallback(signedUrl, authHeader);
};
`
  return toInject
}
