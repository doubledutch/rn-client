import React, { Component } from 'react'
import {
  Image, StyleSheet, Text, View
} from 'react-native'

export class Avatar extends Component {
  constructor() {
    super()
    this.state = {}
    this.s = null
  }

  getUser(props) {
    if (props.user && props.user.id && !props.user.image && props.client) {
      props.client.getUser(props.user.id)
        .then(user => this.setState({user}))
        .catch(err => console.error(err))
    }
  }

  componentWillMount() {
    this.s = createStyles(this.props)    
  }

  componentDidMount() {
    this.getUser(this.props)
  }
  componentWillReceiveProps(newProps) {
    this.s = createStyles(newProps)
    if (this.props.user !== newProps.user || this.props.client !== newProps.client) {
      this.getUser(newProps)
    }
  }

  render() {
    const { style } = this.props
    const user = this.state.user || this.props.user
    const s = this.s

    if (!user) return null

    return (
      <View style={style || s.defaultOuterStyle}>
        <View style={s.noface}>
          <Text style={this.s.nofaceText}>{user.firstName ? user.firstName.substring(0,1) : ''}{user.lastName ? user.lastName.substring(0,1) : ''}</Text>
          { user.image ? <Image source={{uri: user.image}} style={this.s.image}></Image> : null }
        </View>
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
      position: 'absolute',
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2
    }
  })
}
