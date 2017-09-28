import React, { Component } from 'react'
import ReactNative, { Text, View } from 'react-native'

const topSpaceHeight = 21
const barHeight = 44

const mounted = []
let _emulatorTitle = ''
export function setEmulatorTitle(emulatorTitle) {
  _emulatorTitle = emulatorTitle
  setTimeout(() => {
    mounted.forEach(tb => tb.setState({emulatorTitle}))    
  }, 1)
}

let isEmulated
export function setEmulated() { isEmulated = true }

export class TitleBar extends Component {
  constructor() {
    super()

    this.state = { isSignedIn: false, didSigninFail: false, showStatus: false, title: _emulatorTitle, emulatorTitle: _emulatorTitle }
  }

  componentWillMount() {
    mounted.push(this)
    const { signin, client } = this.props

    if (signin) this.setState({ showStatus: true })

    // Wrap the setTitle
    if (client) {
      this._setTitle = client.setTitle
      client.setTitle = (title) => {
        this.setState({title})
        this._setTitle(title)
      }
    }

    signin
      .then(() => {
        this.setState({ isSignedIn: true })
        this.hideStatusTimer = setTimeout(() => this.setState( {showStatus: false }), 5000)
      })
      .catch(() => this.setState({ didSigninFail: true }))
  }

  componentWillUnmount() {
    if (this.hideStatusTimer) clearInterval(this.hideStatusTimer)
    mounted = mounted.filter(x => x !== this)
  }

  render() {
    const { title } = this.state
    if (this._setTitle) this._setTitle(`${title}${this.statusLightText()}`)

    return (
      <View style={isEmulated ? s.wholeBarEmulator : s.wholeBar}>
        <View style={s.topSpace} />
        <View style={s.spacer}>
          { isEmulated && <Text style={s.emulatorTitle}>{this.state.emulatorTitle}</Text> }
        </View>
      </View>
    )
  }

  statusLightText = () => {
    const { showStatus, isSignedIn, didSigninFail } = this.state
    if (showStatus) {
      if (isSignedIn) return '  🔵'
      if (didSigninFail) return '  🔴'
      return '  ⚫'
    } else {
      return ''
    }
  }
}

const s = ReactNative.StyleSheet.create({
  wholeBarEmulator: {
    backgroundColor: '#009acd'
  },
  wholeBar: {
  },
  topSpace: {
    height: topSpaceHeight
  },
  spacer: {
    height: barHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emulatorTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17
  },
  pendingLight: {
    backgroundColor: 'yellow',
    height: barHeight - 10,
    width: barHeight - 10,
    borderRadius: (barHeight - 10) / 2
  },
  failedLight: {
    backgroundColor: 'red',
    height: barHeight - 10,
    width: barHeight - 10,
    borderRadius: (barHeight - 10) / 2
  },
  successLight: {
    backgroundColor: 'green',
    height: barHeight - 10,
    width: barHeight - 10,
    borderRadius: (barHeight - 10) / 2
  }
})
