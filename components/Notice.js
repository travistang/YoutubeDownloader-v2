import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  Text,
  View
} from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Notice extends React.Component {
  render() {
    return (
      <View style={{...style.container,...this.props.style}}>
        <Icon
          name={this.props.icon}
          color={this.props.iconColor || 'white'}
          size={this.props.iconSize || 16}
        />
        <Text
          style={{...style.text,...this.props.textStyle}}
        >
          {this.props.text}
        </Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
})
