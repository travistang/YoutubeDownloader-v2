import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import configureStore from './store'
import Home from './pages/Home'
import LoadingScreen from './pages/LoadingScreen'
import { Font } from 'expo'
import {colors} from './styles'
import { createStackNavigator } from 'react-navigation'

const store = configureStore()
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },


})
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ready: false,
    }
  }

  async componentDidMount() {
    // load the font...
    await Font.loadAsync({
      'M-Plus-Rounded': require('./assets/fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Light.ttf'),
    })
    this.setState({ready: true})
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {
            this.state.ready?
              <Home/>:
              <LoadingScreen/>
          }
        </View>
      </Provider>
    )
  }
}
export default createStackNavigator(
  {
    Home: {
      screen: App
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.background
      },
      headerTintColor: colors.background
    }
  }

)
