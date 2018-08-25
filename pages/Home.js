import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Label from '../components/Label'
import {colors} from '../styles'
export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Youtube Downloader',
    headerTitleStyle: {
      color: '#fff',
      fontFamily: 'M-Plus-Rounded',
    },
  }
  componentDidMount() {
    console.log('home!')
  }
  render() {
    return (
      <View>
          <Label> A red ha silhouetted the jagged edge of a wing.</Label>
      </View>
    )
  }
}
