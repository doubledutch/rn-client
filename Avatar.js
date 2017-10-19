import React, { Component } from 'react'
import {
  Image, StyleSheet, Text, View
} from 'react-native'

export class Avatar extends Component {
  constructor() {
    super()
    this.state = {}
  }

  getUser() {
    if ((!this.props.user || !this.props.user.image) && this.props.client) {
      this.props.client.api.getUser(this.props.userId)
      .then(user => this.setState({user}))
      .catch(err => console.error(err))
    }
  }

  s = null
  componentWillMount() {
    this.s = createStyles(this.props)
    this.getUser()
  }
  componentWillReceiveProps(newProps) {
    this.s = createStyles(newProps)
    if (this.props.userId !== newProps.userId || this.props.client !== newProps.client) {
      this.getUser()
    }
  }

  render() {
    const { style } = this.props
    const user = this.state.user || this.props.user
    const s = this.s

    if (!user) return null

    return (
      <View style={style || s.defaultOuterStyle}>
      { user.image
        ? <Image source={{uri: user.image}} style={this.s.image}></Image>
        : (<View style={s.noface}>
            <Text style={this.s.nofaceText}>{user.firstName ? user.firstName.substring(0,1) : ''}{user.lastName ? user.lastName.substring(0,1) : ''}</Text>
          </View>)
        }
      </View>
    )
  }
}

function createStyles({size}) {
  const diameter = size || 25

  return StyleSheet.create({
    defaultOuterStyle: {
    },
    noface: {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,      
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center'
    },
    nofaceText: {
      color: 'white',
      textAlign: 'center',
      backgroundColor: 'transparent',
      fontSize: diameter * 0.55
    },
    image: {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2
    }
  })
}
