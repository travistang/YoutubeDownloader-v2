import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const style = StyleSheet.create({
  height: 72,
  width: '100%',
  background: 'yellow'
})
export default class VideoCard extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text> Video </Text>
      </View>
    )
  }
}
