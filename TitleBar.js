import React, { Component } from 'react'
import ReactNative, { Text, View } from 'react-native'

const topSpaceHeight = 21
const barHeight = 44

let isEmulated
export function setEmulated() { isEmulated = true }

export class TitleBar extends Component {
  constructor() {
    super()
  }

  setTitle(title) {
    if (this.props.client) { // This only works if `client` is specified.
      const fullTitle = title + this.statusLightText()
      this.props.client.setTitle(fullTitle) // Pass to native title
      this.setState({title: fullTitle})
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.title !== this.props.title) setTitle(newProps.title)
  }

  componentWillMount() {
    const { signin, client, title } = this.props

    this.state = {
      isSignedIn: false,
      didSigninFail: false,
      showStatus: !!signin,
      title: ''
    }

    this.setTitle(title)

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

  componentWillUnmount() {
    if (this.hideStatusTimer) clearInterval(this.hideStatusTimer)
  }

  render() {
    const { title } = this.state

    return (
      <View style={isEmulated ? s.wholeBarEmulator : s.wholeBar}>
        <View style={s.topSpace} />
        <View style={s.spacer}>
          { isEmulated && <Text style={s.emulatorTitle}>{this.state.title}</Text> }
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
