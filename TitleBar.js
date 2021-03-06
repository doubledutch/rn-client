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
import { Platform, StyleSheet, Text, View } from 'react-native'
import Color from './Color'

const topSpaceHeight = 21
const barHeight = 43

let isEmulated
export function setEmulated() { isEmulated = true }

export class TitleBar extends Component {
  constructor(props) {
    super(props)    
    this.state = {
      isSignedIn: false,
      didSigninFail: false,
      showStatus: !!props.signin,
      title: ''
    }
  }

  setTitle(title) {
    if (this.props.client) { // This only works if `client` is specified.
      const fullTitle = title + this.statusLightText()
      this.props.client.setTitle(fullTitle) // Pass to native title
      this.setState({title: fullTitle})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) this.setTitle(this.props.title)
  }

  componentDidMount() {
    const { signin, title } = this.props

    this.setTitle(title)

    if (signin) {
      signin
      .then(() => {
        this.setState({ isSignedIn: true })
        this.setTitle(this.props.title)
        this.hideStatusTimer = setTimeout(() => {
          this.setState( {showStatus: false })
          this.setTitle(this.props.title)
        }, 5000)
      })
      .catch(() => {
        this.setState({ didSigninFail: true })
        this.setTitle(this.props.title)
      })
    }
  }

  componentWillUnmount() {
    if (this.hideStatusTimer) clearInterval(this.hideStatusTimer)
  }

  render() {
    const { title } = this.state
    const { client } = this.props
    
    // This adjustment can be removed entirely when 8.2 has been out for one year (approx January 2020)
    const adjustForNavBar = isEmulated || Platform.select({
      ios: !client || !(client.clientVersion.major > 8 || (client.clientVersion.major === 8 && client.clientVersion.minor >= 2)),
      android: false,
    }) 

    return (
      <View style={isEmulated ? [s.wholeBarEmulator, this.props.style] : s.wholeBar}>
        { adjustForNavBar && <View style={s.topSpace} /> }
        <View style={[s.titleContainer, adjustForNavBar ? s.titleSpace : null]}>
          { isEmulated && <Text style={s.emulatorTitle}>{title}</Text> }
        </View>
      </View>
    )
  }

  statusLightText () {
    const { showStatus, isSignedIn, didSigninFail } = this.state
    if (showStatus) {
      if (isSignedIn) return '  🔵'
      if (didSigninFail) return '  🔴'
      return '  ⚫'
    } 
    
    return ''
  }
}

const s = StyleSheet.create({
  wholeBarEmulator: {
    backgroundColor: new Color().rgbString(),
    opacity: 0.9,
    top: 0,
    width: '100%',
    zIndex: 1000000
  },
  wholeBar: {
  },
  topSpace: {
    height: Platform.select({ios: topSpaceHeight, android: 0}),
  },
  titleSpace: {
    height: barHeight,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emulatorTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17
  }
})
