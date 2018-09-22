/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
} from 'react-native'
import {
  Dialog,
  Button,
  Text,
} from 'react-native-ui-lib'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import MainAudioLists from './containers/MainAudioLists'
import SearchResultList from './containers/SearchResultList'
import TopBar from './containers/TopBar'
import AudioDetailsDialog from './containers/AudioDetailsDialog'
const store = configureStore()
type Props = {};
export default class App extends Component<Props> {
  getMainContainerStyle() {
    return {
      ...styles.container,
      paddingTop:(Platform.OS === 'ios')?20:0
    }
  }
  /*
    If it is not searching:
    - Show audios available from server (small list)
    - Show audios already on devices (long list)

    Otherwise:
    - Show search results from server (small list)
    - Show audios already on devices MATCHING THE SEARCH STRING
  */

  render() {
    return (
      <Provider store={store}>
        <View style={this.getMainContainerStyle()}>
          <TopBar />
          <MainAudioLists />
          {/* For showing the details of audio*/}
          <AudioDetailsDialog />
        </View>

      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
