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
import {
  Image, StyleSheet, Text, View
} from 'react-native'

export class Avatar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.s = createStyles(this.props)
  }

  getUser() {
    if (this.props.user && this.props.user.id && !this.props.user.image && this.props.client) {
      this.props.client.getUser(props.user.id)
        .then(user => this.setState({user}))
        .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    this.getUser()
  }
  componentDidUpdate(prevProps) {
    this.s = createStyles(this.props)
    if (this.props.user !== prevProps.user || this.props.client !== prevProps.client) {
      this.setState({user: null})
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
