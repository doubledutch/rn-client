import React, { Component } from 'react'
import ReactNative, {
  Text, View, Image
} from 'react-native'

export class Avatar extends Component {
  constructor() {
    super()
  }

  s = null
  componentWillMount() {
    this.s = createStyles(this.props)
  }
  componentWillReceiveProps(newProps) {
    this.s = createStyles(newProps)
  }

  render() {
    const { user, style } = this.props
    const s = this.s

    return (
      <View style={style || s.defaultOuterStyle}>
      { user.ImageUrl
        ? <Image source={{uri: user.ImageUrl}} style={this.s.image}></Image>
        : (<View style={s.noface}>
            <Text style={this.s.nofaceText}>{user.FirstName ? user.FirstName.substring(0,1) : ''}{user.LastName ? user.LastName.substring(0,1) : ''}</Text>
          </View>)
        }
      </View>
    )
  }
}

function createStyles({size}) {
  const diameter = size || 25

  return ReactNative.StyleSheet.create({
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
