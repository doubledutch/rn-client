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
