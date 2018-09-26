import React from 'react'
import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native'
import {
  View,
  Text,
  Colors
} from 'react-native-ui-lib'
import Spinner from 'react-native-spinkit'
export default class SpinnerOverlay extends React.Component {
  render() {
    if(!this.props.visible) return null
    return (
      <View style={{...style.container,...this.props.style}}>
        <Spinner
          isVisible={true}
          size={22}
          type="Circle"
          color="white"
        />
        <Text style={style.text}> { this.props.textContent} </Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  text: {
    marginTop: 16,
    color: 'white',
    fontSize: 20
  },
  container: {
    position: 'absolute',
    // compensate for the padding
    top: Platform.OS === 'ios'?-20:0,
    left: -8,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 10000000,
    backgroundColor: 'rgba(100,100,100,0.7)',

    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }

})
